/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service/prisma.service';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { GatewayFactory } from '../gateways/gateway.factory';

@Injectable()
export class TransactionsService {
  constructor(
    private prisma: PrismaService,
    private gatewayFactory: GatewayFactory,
  ) {}

  async create(dto: CreateTransactionDto, companyId: string) {
    // 1. Buscar a filial e trazer as chaves de integração
    const filial = await this.prisma.filial.findFirst({
      where: {
        id: dto.filialId,
        companyId: companyId, // Segurança: garante que a filial é da empresa do usuário
      },
    });

    if (!filial) {
      throw new NotFoundException(
        'Filial não encontrada ou você não tem permissão.',
      );
    }

    // 2. Identificar qual chave usar baseada no Gateway escolhido
    const credentials = this.getGatewayCredentials(filial, dto.gateway);

    try {
      // 3. Obter o adaptador via Factory
      const adapter = this.gatewayFactory.getGateway(dto.gateway);

      // 4. Processar o pagamento passando os dados + as chaves da filial
      const gatewayResponse = await adapter.createPayment(dto, credentials);

      // 5. Salvar a transação no banco com os dados retornados
      return await this.prisma.transaction.create({
        data: {
          amount: dto.amount,
          paymentMethod: dto.paymentMethod,
          gateway: dto.gateway,
          filialId: dto.filialId,
          customerName: dto.customerName,
          customerEmail: dto.customerEmail,

          externalId: gatewayResponse.externalId,
          paymentUrl: gatewayResponse.paymentUrl,
          pixQrCode: gatewayResponse.pixQrCode,
          metadata: gatewayResponse.rawResponse,

          status: 'PENDING',
        },
      });
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Erro ao processar pagamento no gateway selecionado.',
      );
    }
  }

  /**
   * Helper para extrair a chave correta da filial
   */
  private getGatewayCredentials(filial: any, gateway: string) {
    if (gateway.toUpperCase() === 'STRIPE') {
      if (!filial.stripeSecretKey) {
        throw new ForbiddenException(
          'Stripe não configurado para esta filial.',
        );
      }
      return { secretKey: filial.stripeSecretKey };
    }

    if (gateway.toUpperCase() === 'MERCADO_PAGO') {
      if (!filial.mercadoPagoAccessToken) {
        throw new ForbiddenException(
          'Mercado Pago não configurado para esta filial.',
        );
      }
      return { secretKey: filial.mercadoPagoAccessToken };
    }

    throw new BadRequestException('Gateway não suportado.');
  }

  async findAllByFilial(filialId: string) {
    return this.prisma.transaction.findMany({
      where: { filialId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
