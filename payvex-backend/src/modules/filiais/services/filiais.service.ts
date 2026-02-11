/* eslint-disable prettier/prettier */

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service/prisma.service';
import { encryptWithKey } from 'src/utils/security.util';
import { UpdateGatewayConfigDto } from '../dto/update-gateway-config.dto';

@Injectable()
export class FiliaisService {
  constructor(private prisma: PrismaService) {}

  private readonly MASTER_KEY = process.env.ENCRYPTION_KEY;

  async updateGatewayKeys(
    filialId: string,
    companyId: string,
    dto: UpdateGatewayConfigDto,
  ) {
    if (!this.MASTER_KEY) {
      throw new Error(
        'A variável ENCRYPTION_KEY não foi definida no arquivo .env',
      );
    }
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
        stripeSecretKey: dto.stripeSecretKey
          ? encryptWithKey(dto.stripeSecretKey, this.MASTER_KEY)
          : undefined,

        stripePublicKey: dto.stripePublicKey
          ? encryptWithKey(dto.stripePublicKey, this.MASTER_KEY)
          : undefined,

        stripeWebhookSecret: dto.stripeWebhookSecret
          ? encryptWithKey(dto.stripeWebhookSecret, this.MASTER_KEY)
          : undefined,

        mercadoPagoAccessToken: dto.mercadoPagoAccessToken
          ? encryptWithKey(dto.mercadoPagoAccessToken, this.MASTER_KEY)
          : undefined,
      },
    });
  }
}
