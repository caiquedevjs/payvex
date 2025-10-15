// Em algum lugar, por exemplo, src/data/mockPayments.js
export const mockPayments = [
  {
    id: 'pay_1',
    customer: 'Empresa de Telecom X',
    amount: '99,90',
    currency: 'BRL',
    dueDate: '2025-10-20',
    status: 'Pago', // 'Pago', 'Pendente', 'Cancelado'
    gateway: 'Stripe', // 'Stripe', 'MercadoPago', 'PagarMe'
  },
  {
    id: 'pay_2',
    customer: 'Academia Fitness Plus',
    amount: '120,50',
    currency: 'BRL',
    dueDate: '2025-10-25',
    status: 'Pendente',
    gateway: 'MercadoPago',
  },
  {
    id: 'pay_3',
    customer: 'Software House Y',
    amount: '500,00',
    currency: 'BRL',
    dueDate: '2025-10-15',
    status: 'Cancelado',
    gateway: 'PagarMe',
  },
    {
    id: 'pay_4',
    customer: 'Escola de Idiomas Z',
    amount: '350,00',
    currency: 'BRL',
    dueDate: '2025-11-01',
    status: 'Pendente',
    gateway: 'Stripe',
  },
];

const gatewayImages = {
  Stripe: 'https://cdn.icon-icons.com/icons2/2699/PNG/512/stripe_logo_icon_167963.png',
  MercadoPago: 'https://logospng.org/download/mercado-pago/logo-mercado-pago-256.png',
  PagarMe: 'https://pagar.me/images/logo/pagarme-logo.png'
};