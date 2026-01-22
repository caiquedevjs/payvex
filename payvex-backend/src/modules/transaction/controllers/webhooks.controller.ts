/* eslint-disable prettier/prettier */
import * as common from '@nestjs/common';
// 1. Usamos o namespace import para satisfazer o 'isolatedModules'
import * as express from 'express';
import { WebhookService } from '../services/webhook.service';

@common.Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhookService: WebhookService) {}

  @common.Post('stripe')
  async handleStripe(
    @common.Req() req: common.RawBodyRequest<express.Request>,
    @common.Res() res: express.Response,
  ) {
    const sig = req.headers['stripe-signature'];

    // 2. Resolvemos o erro do Buffer | undefined com uma validação
    if (!req.rawBody) {
      throw new common.BadRequestException(
        'Raw body not found. Make sure rawBody: true is set in main.ts',
      );
    }

    if (!sig) {
      throw new common.BadRequestException('Stripe signature missing');
    }

    try {
      // Agora o TS sabe que req.rawBody é um Buffer garantido
      await this.webhookService.processStripe(req.rawBody, sig);

      return res.status(200).send({ received: true });
    } catch (err) {
      return res
        .status(400)
        .send(
          `Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
        );
    }
  }
}
