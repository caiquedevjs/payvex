/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  constructor(private prisma: PrismaService) {}

  async processStripe(rawBody: Buffer, signature: any) {
    // 1. Parse inicial apenas para ler o metadata (sem validar ainda)
    const eventData = JSON.parse(rawBody.toString());
    const filialId = eventData.data.object.metadata?.filialId;

    if (!filialId) {
      this.logger.error('Webhook recebido sem filialId no metadata');
      throw new Error('Metadata incompleto');
    }

    // 2. Busca as chaves desta filial específica no banco
    const filial = await this.prisma.filial.findUnique({
      where: { id: filialId },
    });

    if (!filial?.stripeWebhookSecret || !filial.stripeSecretKey) {
      throw new Error('Configuração de gateway incompleta para esta filial');
    }

    // 3. Inicializa o Stripe daquela filial para validar a assinatura
    const stripe = new Stripe(filial.stripeSecretKey, {
      apiVersion: '2025-12-15.clover' as any,
    });
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        filial.stripeWebhookSecret,
      );
    } catch (err) {
      this.logger.error(`Assinatura inválida para a filial ${filialId}`);
      throw new Error(`Invalid Signature: ${err.message}`);
    }

    // 4. Trata o evento de pagamento confirmado
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      // Atualiza a transação no banco de dados para PAID
      await this.prisma.transaction.update({
        where: { externalId: session.id },
        data: {
          status: 'PAID',
          updatedAt: new Date(),
        },
      });

      this.logger.log(
        `💰 Pagamento confirmado: Transação ${session.id} da Filial ${filialId}`,
      );
    }
  }
}
