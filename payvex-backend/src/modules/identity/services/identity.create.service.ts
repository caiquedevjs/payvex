import {
    ConflictException,
    ForbiddenException,
    Injectable,
    UnprocessableEntityException, // Para o erro de quota
} from '@nestjs/common';
import { Role } from '@prisma/client'; // Importe Role e User
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service/prisma.service';
import { CreateUserDto } from '../dtos/identity.create.dtos';

/**
 * Este 'type' define o formato do usuário logado
 * que receberemos do nosso sistema de autenticação (JWT) no futuro.
 */
export type AuthenticatedUser = {
  id: string;
  companyId: string;
  role: Role;
  email: string;
};

@Injectable()
export class IdentityCreateService {
  // Injeta o PrismaService para podermos acessar o banco
  constructor(private prisma: PrismaService) {}

  /**
   * Criar Colaborador
   * Para um ADMIN logado adicionar um novo User à sua Company.
   */
  async createCollaborator(
    dto: CreateUserDto,
    adminUser: AuthenticatedUser, // O usuário logado que está fazendo a ação
  ) {
    // 1. VERIFICAR AUTORIZAÇÃO (Só Admins podem criar)
    if (adminUser.role !== 'ADMIN') {
      throw new ForbiddenException('Apenas administradores podem adicionar usuários.');
    }

    // 2. VERIFICAR SE O E-MAIL JÁ EXISTE
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existingUser) {
      throw new ConflictException('Este e-mail já está em uso.');
    }

    const companyId = adminUser.companyId;

    // 3. VERIFICAR QUOTA DE USUÁRIOS (A lógica do SaaS)
    const [subscription, userCount] = await Promise.all([
      this.prisma.subscription.findUnique({
        where: { companyId: companyId },
        select: { usersLimit: true }, // Só precisamos do limite
      }),
      this.prisma.user.count({
        where: { companyId: companyId },
      }),
    ]);

    if (!subscription) {
      throw new Error(`Assinatura não encontrada para a empresa ${companyId}.`);
    }

    if (userCount >= subscription.usersLimit) {
      throw new UnprocessableEntityException(
        `Limite de ${subscription.usersLimit} usuários atingido. Por favor, atualize seu plano para adicionar mais usuários.`,
      );
    }

    // 4. CRIAR O NOVO USUÁRIO
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(dto.password, saltRounds);

    const newUser = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        passwordHash: passwordHash,
        role: dto.role,
        companyId: companyId,
      },
    });

    // 5. RETORNAR O USUÁRIO (Forma Correta)
    // Usamos destructuring para "puxar" o passwordHash para uma variável
    // (que nomeamos como '_' para indicar que não vamos usá-la)
    // e colocamos o 'resto' (...result) em um novo objeto.
    const { passwordHash: _, ...result } = newUser;

    // 'result' é agora um novo objeto User sem o passwordHash.
    return result;
  }
}