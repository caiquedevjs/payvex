// IntegrationScreen.js
import { Card, Layout, Text } from '@ui-kitten/components';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
// 1. IMPORTE SCROLLVIEW E CONSTANTS
import Constants from 'expo-constants';
import { ScrollView, StyleSheet, View } from 'react-native';
import { LogoShowcase } from '../components/avatar_gataway/avatar_gatway';
import { StatusBadge } from '../components/status/status_badge';



interface ActiveCardProps {
  gatewayName: string;
}
const conectionsList = [
  {gatewayName : 'Stripe'},
  {gatewayName : 'Mercado Pago'},
  {gatewayName : 'Pagarme.me'}
];
const ActiveConnectionCard = ({ gatewayName }: ActiveCardProps) => (
  <Card style={styles.activeCard} status='success'>
    {/* ... (código do card) ... */}
    <View style={styles.activeRow}>
      <Text category='s1'>{gatewayName}</Text> 
      <StatusBadge text="CONECTADO" status="success" /> 
    </View>
    <Text appearance='hint' style={{ marginTop: 4 }}>
      Sua conta está pronta para processar pagamentos.
    </Text>
  </Card>
);

export default function IntegrationScreen() {

 

    return(
        <Layout style={styles.layoutStyle}>
            <StatusBar
              style="dark"
              backgroundColor="transparent"
              translucent={true}
            />

            {/* 2. CABEÇALHO FIXO */}
            {/* Esta View NÃO rola. Ela contém o padding da status bar */}
            <View style={styles.headerContainer}>
              <Text category='h4' style={styles.title}>
                Integrações
              </Text>
              <Text appearance='hint' style={styles.subtitle}>
                Gerencie suas conexões com gateways de pagamento.
              </Text>
            </View>

            {/* 3. CONTEÚDO ROLÁVEL */}
            {/* Este ScrollView tem flex: 1 para ocupar o resto da tela e rolar */}
            <ScrollView 
              style={styles.scrollContainer}
              contentContainerStyle={styles.scrollContent}
            >
              <Text category='h6' style={styles.sectionTitle}>
                Minha Conexão Ativa
              </Text>
              {conectionsList.map((conection)=>(
                <ActiveConnectionCard 
                  key={conection.gatewayName}
                  gatewayName={conection.gatewayName} 
                />
              ))}

              <Text category='h6' style={styles.sectionTitle}>
                Gateways Disponíveis
              </Text>
            
              <LogoShowcase />
            </ScrollView>
        </Layout>
    )
}

const styles = StyleSheet.create({
    layoutStyle: {
       flex: 1,
       flexDirection: 'column',
       // O padding geral foi removido daqui
    },
    // 4. Estilo para o CABEÇALHO (Fixo)
    headerContainer: {
      // Adiciona o padding para a status bar + padding da tela
      paddingTop: Constants.statusBarHeight + 16,
      paddingHorizontal: 16,
    },
    // 5. Estilo para o CONTAINER do ScrollView
    scrollContainer: {
      flex: 1, // Faz ele ocupar o espaço restante
    },
    // 6. Estilo para o CONTEÚDO dentro do ScrollView
    scrollContent: {
      paddingHorizontal: 16, // Padding lateral para o conteúdo
      paddingBottom: 40, // Um espaço no final
    },
    title: {
      marginBottom: 4,
      // textAlign: 'justify' FOI REMOVIDO DAQUI PARA ALINHAR À ESQUERDA
    },
    subtitle: {
      marginBottom: 24,
    },
    sectionTitle: {
      marginTop: 20,
      marginBottom: 8,
    },
    activeCard: {
      margin: 5
    },
    activeRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }
})