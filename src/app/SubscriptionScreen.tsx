// SubscriptionScreen.js
import { Button, Card, Layout, ProgressBar, Text } from '@ui-kitten/components'; // 1. MUDANÇA AQUI
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

// --- (Copiado do CompanyScreen para reutilização) ---
// Interface para o InfoRow
interface InfoRowProps {
  label: string;
  value: string;
  iconName: string;
}

// Componente auxiliar para exibir uma linha de informação
const InfoRow = ({ label, value, iconName }: InfoRowProps) => {
  

  return (
    <View style={styles.infoRow}>
      
      <View style={styles.infoTextContainer}>
        <Text category='s2' appearance='hint'>{label}</Text>
        <Text category='s1' numberOfLines={2}>{value}</Text>
      </View>
    </View>
  );
};
// --- Fim do código copiado ---


// 2. Mock de dados da assinatura (baseado no Plano Pro)
const currentSubscription = {
  planName: 'Plano Pro',
  status: 'Ativo',
  price: 349.00,
  currency: 'BRL',
  nextRenewal: '2025-11-20T10:00:00Z', 
  usage: {
    gateways: { used: 3, limit: 3 },
    users: { used: 7, limit: 10 },
    transactions: { used: 1450, limit: 2000 },
  },
  paymentMethod: {
    type: 'Cartão de Crédito',
    last4: '4242',
  }
};

// 3. Formatar data e preço
const formattedPrice = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: currentSubscription.currency,
}).format(currentSubscription.price);

const formattedDate = new Date(currentSubscription.nextRenewal).toLocaleDateString('pt-BR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric'
});


// 4. Componente auxiliar para exibir quotas de uso
interface UsageProgressProps {
  label: string;
  used: number;
  limit: number;
}
const UsageProgress = ({ label, used, limit }: UsageProgressProps) => {
  const progress = used / limit;
  const isNearLimit = progress > 0.8; // Fica laranja/vermelho se passar de 80%

  return (
    <View style={styles.usageRow}>
      <View style={styles.usageTextHeader}>
        <Text category='s1'>{label}</Text>
        <Text category='s1' appearance='hint'>{`${used} / ${limit}`}</Text>
      </View>
      <ProgressBar // 2. MUDANÇA AQUI
        style={styles.progress}
        progress={progress}
        status={isNearLimit ? 'warning' : 'primary'}
      />
    </View>
  );
};


export default function SubscriptionScreen() {
    return(
        <Layout style={styles.layoutStyle}>
            <StatusBar
              style="dark"
              backgroundColor="transparent"
              translucent={true}
            />

            {/* CABEÇALHO FIXO */}
            <View style={styles.headerContainer}>
              <Text category='h4' style={styles.title}>
                Minha Assinatura
              </Text>
              <Text appearance='hint' style={styles.subtitle}>
                Gerencie seu plano, uso e faturamento.
              </Text>
            </View>

            {/* CONTEÚDO ROLÁVEL */}
            <ScrollView 
              style={styles.scrollContainer}
              contentContainerStyle={styles.scrollContent}
            >
              {/* Card 1: Plano Atual */}
              <Card style={styles.card}>
                <View style={styles.planHeader}>
                  <Text category='h6'>{currentSubscription.planName}</Text>
                  <Button 
                    size='tiny' 
                    status='success'
                    style={styles.badge}
                  >
                    {currentSubscription.status.toUpperCase()}
                  </Button>
                </View>
                <View style={styles.planPriceContainer}>
                  <Text category='h3' style={styles.planPrice}>{formattedPrice}</Text>
                  <Text category='s1' appearance='hint'>/mês</Text>
                </View>
              </Card>

              {/* Card 2: Uso do Plano (Quotas) */}
              <Text category='h6' style={styles.sectionTitle}>
                Uso do Plano
              </Text>
              <Card style={styles.card}>
                <UsageProgress 
                  label='Transações'
                  used={currentSubscription.usage.transactions.used}
                  limit={currentSubscription.usage.transactions.limit}
                />
                <UsageProgress 
                  label='Usuários (Colaboradores)'
                  used={currentSubscription.usage.users.used}
                  limit={currentSubscription.usage.users.limit}
                />
                <UsageProgress 
                  label='Gateways Conectados'
                  used={currentSubscription.usage.gateways.used}
                  limit={currentSubscription.usage.gateways.limit}
                />
              </Card>

              {/* Card 3: Faturamento e Ações */}
              <Text category='h6' style={styles.sectionTitle}>
                Faturamento
              </Text>
              <Card style={styles.card}>
                <InfoRow 
                  label="Próxima Cobrança" 
                  value={formattedDate}
                  iconName='calendar-outline' 
                />
                <InfoRow 
                  label="Método de Pagamento" 
                  value={`${currentSubscription.paymentMethod.type} final ${currentSubscription.paymentMethod.last4}`}
                  iconName='credit-card-outline' 
                />
                
                <View style={styles.ctaContainer}>
                  <Button 
                    appearance='outline'
                    style={styles.ctaButton}
                  >
                    Alterar Plano
                  </Button>
                  <Button 
                    appearance='ghost'
                    status='danger'
                  >
                    Cancelar Assinatura
                  </Button>
                </View>
              </Card>

            </ScrollView>
        </Layout>
    )
}

// --- ESTILOS ---
const styles = StyleSheet.create({
    layoutStyle: {
       flex: 1,
       flexDirection: 'column',
    },
    headerContainer: {
      paddingTop: Constants.statusBarHeight + 16,
      paddingHorizontal: 16,
    },
    scrollContainer: {
      flex: 1, 
    },
    scrollContent: {
      paddingHorizontal: 16,
      paddingBottom: 40,
    },
    title: {
      marginBottom: 4,
    },
    subtitle: {
      marginBottom: 24,
    },
    sectionTitle: {
      marginTop: 24, // Mais espaço entre seções
      marginBottom: 8,
    },
    card: {
      marginVertical: 4,
    },
    // Estilos do InfoRow (copiados)
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 12,
    },
    icon: {
      width: 24,
      height: 24,
      marginRight: 16,
    },
    infoTextContainer: {
      flex: 1,
    },
    // Estilos da Tela de Assinatura
    planHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    badge: {
      borderRadius: 16, // Deixa o botão mais arredondado
    },
    planPriceContainer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      marginBottom: 8,
    },
    planPrice: {
      marginRight: 4,
    },
    usageRow: {
      marginVertical: 12,
    },
    usageTextHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    progress: {
      marginTop: 4,
    },
    ctaContainer: {
      marginTop: 20,
      borderTopWidth: 1,
      borderTopColor: '#EDF1F7',
      paddingTop: 20,
    },
    ctaButton: {
      marginBottom: 12,
    }
})