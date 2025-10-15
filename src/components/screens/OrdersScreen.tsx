// Em components/screens/PaymentsScreen.js
import { Card, Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';



// Defina os status possíveis como um tipo. Isso evita erros de digitação.
type PaymentStatus = 'Pago' | 'Pendente' | 'Cancelado';

// Defina os gateways possíveis
type PaymentGateway = 'Stripe' | 'MercadoPago' | 'PagarMe';

// Defina a estrutura de um objeto de pagamento
type Payment = {
  id: string;
  customer: string;
  amount: string;
  currency: string;
  dueDate: string;
  status: PaymentStatus; // Usamos o tipo que criamos acima
  gateway: PaymentGateway;
};

// --- Dados Mocados (coloque em um arquivo separado depois) ---
const mockPayments : Payment[] = [
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
  Stripe: { uri: 'https://cdn.icon-icons.com/icons2/2699/PNG/512/stripe_logo_icon_167963.png' },
  MercadoPago: { uri: 'https://logospng.org/download/mercado-pago/logo-mercado-pago-256.png' },
  PagarMe: { uri: 'https://pagar.me/images/logo/pagarme-logo.png' }
};
// ----------------------------------------------------------------

// Componente para a "tag" de status
const StatusBadge = ({ status }: { status: PaymentStatus }) => {
  const getStatusStyle = () => {
    switch (status) {
      case 'Pago':
        return styles.badgePago;
      case 'Pendente':
        return styles.badgePendente;
      case 'Cancelado':
        return styles.badgeCancelado;
      default:
        return {};
    }
  };

  return (
    <View style={[styles.badge, getStatusStyle()]}>
      <Text style={styles.badgeText}>{status}</Text>
    </View>
  );
};

// Card que representa um único pagamento
const PaymentCard = ({ item }: { item: Payment }) => (
  <Card style={styles.card}
    header={() => (
        <View style={styles.cardHeader}>
            <Text category='s1'>{item.customer}</Text>
            <Text category='c1'>
              Venc.: {new Date(item.dueDate).toLocaleDateString('pt-BR')}
            </Text>
        </View>
    )}
    footer={() => (
        <View style={styles.cardFooter}>
            <Image source={gatewayImages[item.gateway]} style={styles.gatewayLogo} />
        </View>
    )}>
    <View style={styles.cardBody}>
      <Text category='h5'>R$ {item.amount}</Text>
      <StatusBadge status={item.status} />
    </View>
  </Card>
);

// A tela principal
export const OrdersScreen = () => (
  <Layout style={styles.container}>
    <Text category='h4' style={styles.title}>Meus Pagamentos</Text>
    <FlatList
      data={mockPayments}
      renderItem={PaymentCard}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
    />
  </Layout>
);

// --- Estilos ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  card: {
    marginVertical: 8,
  },
  cardHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardFooter: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      alignItems: 'flex-start'
  },
  gatewayLogo: {
    width: 80,
    height: 20,
    resizeMode: 'contain',
  },
  // Estilos para o Badge de Status
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  badgePago: { backgroundColor: '#28a745' }, // Verde
  badgePendente: { backgroundColor: '#ffc107' }, // Amarelo
  badgeCancelado: { backgroundColor: '#dc3545' }, // Vermelho
});