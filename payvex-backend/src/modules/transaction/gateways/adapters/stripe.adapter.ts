/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import Stripe from 'stripe';
import { PaymentGateway, PaymentResponse } from '../payment-gateway.interface';

export class StripeAdapter implements PaymentGateway {
  async createPayment(
    data: any,
    credentials: { secretKey: string },
  ): Promise<PaymentResponse> {
    // O erro TS2322 avisou que a versão correta para o seu pacote é '2025-12-15.clover'
    const stripe = new Stripe(credentials.secretKey, {
      apiVersion: '2025-12-15.clover' as any,
    });

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: this.mapPaymentMethod(data.paymentMethod),
        line_items: [
          {
            price_data: {
              currency: 'brl',
              product_data: {
                name: `Cobrança Payvex - ${data.customerName || 'Venda Online'}`,
              },
              unit_amount: Math.round(data.amount * 100),
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        // Corrigido: era process.en e tinha um 'v' perdido
        success_url:
          process.env.STRIPE_SUCCESS_URL || 'http://localhost:3001/success',
        cancel_url:
          process.env.STRIPE_CANCEL_URL || 'http://localhost:3001/cancel',

         
        customer_email: data.customerEmail,
        metadata: {
          filialId: data.filialId,
        },
      });

      return {
        externalId: session.id,
        // Corrigido TS2322: session.url pode ser null, forçamos undefined se for null
        paymentUrl: session.url ?? undefined,
        rawResponse: session,
      };
    } catch (error) {
      throw new Error(`[Stripe Gateway Error]: ${error.message}`);
    }
  }

  // Corrigido: Sripe -> Stripe | cost -> const | tring -> string
  private mapPaymentMethod(
    method: string,
  ): Stripe.Checkout.SessionCreateParams.PaymentMethodType[] {
    const methods: Record<
      string,
      Stripe.Checkout.SessionCreateParams.PaymentMethodType[]
    > = {
      CREDIT_CARD: ['card'],
      PIX: ['pix'],
      BOLETO: ['boleto'],
    };

    return methods[method] || ['card'];
  }
}
