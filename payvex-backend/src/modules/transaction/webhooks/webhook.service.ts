/* eslint-disable prettier/prettier */
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger('StripeWebhookProducer');

  constructor(@InjectQueue('stripe-webhooks') private webhookQueue: Queue) {}

  async processStripe(rawBody: Buffer, signature: string) {
    // 🚚 Apenas despachamos para a fila do Upstash
    // Convertemos o Buffer para String para ele poder ser serializado no Redis
    await this.webhookQueue.add(
      'process-webhook',
      {
        rawBody: rawBody.toString(),
        signature: signature,
      },
      {
        attempts: 5, // Se o banco de dados falhar, o BullMQ tenta de novo
        backoff: { type: 'exponential', delay: 3000 }, // 3s, 6s, 12s...
      },
    );

    this.logger.log('📥 Evento encaminhado para a fila de processamento.');
    return { received: true };
  }
}
