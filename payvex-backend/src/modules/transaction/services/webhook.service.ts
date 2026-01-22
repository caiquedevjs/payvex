/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { TransactionStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma.service/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger('StripeWebhook');

  constructor(private prisma: PrismaService) {}

  async processStripe(rawBody: Buffer, signature: any) {
    const eventData = JSON.parse(rawBody.toString());
    const filialId = eventData.data.object.metadata?.filialId;

    if (!filialId) {
      this.logger.error('❌ [ERRO] Metadata filialId não encontrado no evento');
      return;
    }

    const filial = await this.prisma.filial.findUnique({ where: { id: filialId } });
    if (!filial || !filial.stripeSecretKey || !filial.stripeWebhookSecret) {
      this.logger.error(`❌ [ERRO] Configurações do Stripe incompletas para filial: ${filialId}`);
      return;
    }

    const stripe = new Stripe(filial.stripeSecretKey, { 
        apiVersion: '2025-12-15.clover' as any 
    });

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, filial.stripeWebhookSecret);
    } catch (err) {
      this.logger.error(`❌ [ERRO] Falha na assinatura do Webhook: ${err.message}`);
      return;
    }

    const session = event.data.object as Stripe.Checkout.Session;

    switch (event.type) {
      case 'checkout.session.completed':
        this.logger.log(`🔔 [EVENTO] checkout.session.completed recebido: ${session.id}`);
        await this.handlePaymentSucceeded(stripe, session);
        break;

      case 'checkout.session.expired':
        this.logger.warn(`⏳ [EVENTO] checkout.session.expired: ${session.id}`);
        await this.updateTransactionStatus(session.id, 'EXPIRED');
        break;

      case 'payment_intent.payment_failed':
        this.logger.error(`❌ [EVENTO] payment_intent.payment_failed: ${session.id}`);
        await this.updateTransactionStatus(session.id, 'FAILED');
        break;

      default:
        this.logger.log(`ℹ️ [INFO] Evento ignorado: ${event.type}`);
    }
  }

  /* eslint-disable prettier/prettier */
private async handlePaymentSucceeded(stripe: Stripe, session: Stripe.Checkout.Session) {
  try {
    this.logger.log(`🔍 [DEBUG] Iniciando busca de taxas para: ${session.id}`);

    // Aguarda 3 segundos para o Stripe processar a transação financeira
    await new Promise(resolve => setTimeout(resolve, 3000));

    // 1. Recuperar o Payment Intent
    const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent as string, {
      expand: ['latest_charge'],
    });

    const charge = paymentIntent.latest_charge as Stripe.Charge;

    // 2. Tentar buscar a transação de saldo
    if (charge && charge.balance_transaction) {
      const balanceTransaction = await stripe.balanceTransactions.retrieve(
        charge.balance_transaction as string
      );

      const fee = balanceTransaction.fee / 100;
      const netAmount = balanceTransaction.net / 100;
      const grossAmount = balanceTransaction.amount / 100;

      this.logger.log(`📊 [VALORES] Capturados com sucesso: Bruto: ${grossAmount} | Taxa: ${fee} | Líquido: ${netAmount}`);

      await this.updateTransactionStatus(session.id, 'PAID', fee, netAmount);
    } else {
      // Se ainda não tiver, tenta mais uma vez em 5 segundos (segunda chance)
      this.logger.warn(`⚠️ [AVISO] Taxa ainda não disponível. Tentando novamente em 5s...`);
      
      await new Promise(resolve => setTimeout(resolve, 5000));
      const retryPI = await stripe.paymentIntents.retrieve(session.payment_intent as string, {
        expand: ['latest_charge'],
      });
      const retryCharge = retryPI.latest_charge as Stripe.Charge;

      if (retryCharge?.balance_transaction) {
        const bt = await stripe.balanceTransactions.retrieve(retryCharge.balance_transaction as string);
        await this.updateTransactionStatus(session.id, 'PAID', bt.fee / 100, bt.net / 100);
      } else {
        await this.updateTransactionStatus(session.id, 'PAID');
      }
    }

  } catch (error) {
    this.logger.error(`❌ [ERRO] Falha ao processar taxas: ${error.message}`);
    await this.updateTransactionStatus(session.id, 'PAID');
  }
}

  private async updateTransactionStatus(
    externalId: string, 
    status: TransactionStatus, 
    fee?: number, 
    netAmount?: number
  ) {
    try {
      this.logger.log(`💾 [DB] Tentando atualizar banco: ${externalId} para ${status}`);

      // Construímos o objeto de dados dinamicamente
      const updateData: any = { 
        status, 
        updatedAt: new Date() 
      };

      if (fee !== undefined) updateData.fee = fee;
      if (netAmount !== undefined) updateData.netAmount = netAmount;

      // Usamos updateMany porque externalId pode não ser @unique no Schema
      const result = await this.prisma.transaction.updateMany({
        where: { externalId },
        data: updateData,
      });

      if (result.count > 0) {
        this.logger.log(`✅ [DB] Sucesso! ${result.count} registro(s) atualizado(s).`);
      } else {
        this.logger.error(`❌ [DB] Nenhuma transação encontrada com o ID: ${externalId}`);
      }
    } catch (error) {
      this.logger.error(`❌ [DB ERRO] Falha ao executar prisma.update: ${error.message}`);
    }
  }
}