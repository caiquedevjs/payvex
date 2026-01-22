/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { StripeAdapter } from './adapters/stripe.adapter';
// import { MercadoPagoAdapter } from './adapters/mercado-pago.adapter';
import { PaymentGateway } from './payment-gateway.interface';
@Injectable()
export class GatewayFactory {
  getGateway(gatewayName: string): PaymentGateway {
    switch (gatewayName.toUpperCase()) {
      case 'STRIPE':
        return new StripeAdapter();
      case 'MERCADO_PAGO':
        // return new MercadoPagoAdapter();
        throw new BadRequestException('Mercado Pago ainda em implementação');
      default:
        throw new BadRequestException('Gateway não suportado.');
    }
  }
}
