/* eslint-disable prettier/prettier */
 
 
import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service/prisma.service';
import { UpdateGatewayConfigDto } from '../dto/update-gateway-config.dto';

@Injectable()
export class FiliaisService {
  constructor(private prisma: PrismaService) {}

  async updateGatewayKeys(
    filialId: string,
    companyId: string,
    dto: UpdateGatewayConfigDto,
  ) {
    // 1. Verificar se a filial existe e se pertence à empresa do usuário logado
    const filial = await this.prisma.filial.findUnique({
      where: { id: filialId },
    });

    if (!filial) {
      throw new NotFoundException('Filial não encontrada.');
    }

    if (filial.companyId !== companyId) {
      throw new ForbiddenException(
        'Você não tem permissão para alterar as chaves desta filial.',
      );
    }

    // 2. Atualizar apenas os campos de gateway enviados
    return this.prisma.filial.update({
      where: { id: filialId },
      data: {
        stripeSecretKey: dto.stripeSecretKey,
        stripePublicKey: dto.stripePublicKey,
        stripeWebhookSecret: dto.stripeWebhookSecret,
        mercadoPagoAccessToken: dto.mercadoPagoAccessToken,
      },
    });
  }
}
