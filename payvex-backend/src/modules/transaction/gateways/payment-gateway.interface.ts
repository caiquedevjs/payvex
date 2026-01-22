/* eslint-disable prettier/prettier */
export interface PaymentResponse {
  externalId: string;
  paymentUrl?: string;
  pixQrCode?: string;
  rawResponse: any;
}

export interface PaymentGateway {
  // Adicionamos o segundo parâmetro 'credentials'
  createPayment(
    data: any,
    credentials: { secretKey: string },
  ): Promise<PaymentResponse>;
}
