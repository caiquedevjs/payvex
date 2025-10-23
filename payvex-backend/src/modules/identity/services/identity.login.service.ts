import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service/prisma.service'; // Ajuste seu caminho se necessário
import { LoginDto } from '../dtos/identity.login.dto';

@Injectable()
export class identityLoginService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    // 1. Encontrar o usuário pelo e-mail
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    // Se não achar o usuário, jogamos um erro genérico (por segurança)
    if (!user) {
      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    // 2. Comparar a senha enviada com o hash salvo no banco
    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);

    // Se a senha for inválida, jogamos o mesmo erro genérico
    if (!isPasswordValid) {
      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    // 3. Gerar o Token JWT (Se tudo deu certo)
    const payload = {
      sub: user.id, // 'sub' (subject) é o ID do usuário
      email: user.email,
      role: user.role,
      companyId: user.companyId,
    };

    // O token é retornado ao usuário
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}