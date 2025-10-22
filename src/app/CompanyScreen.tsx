// CompanyScreen.js
// 1. Adicionado IconProps para tipar o ícone
import { Card, Layout, Text } from '@ui-kitten/components'; // <-- MUDANÇA
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

// ... (mock de dados da empresa permanece o mesmo) ...
const companyData = {
  name: 'Payvex Soluções',
  legalName: 'Payvex Soluções em Pagamentos LTDA',
  cnpj: '12.345.678/0001-99',
  email: 'contato@payvex.com.br',
  phone: '(71) 99999-8888',
  industry: 'Tecnologia - Fintech',
  address: {
    street: 'Av. Tancredo Neves',
    number: '1234',
    complement: 'Sala 101, Edf. Empresarial',
    city: 'Salvador',
    state: 'BA',
    zip: '41820-000'
  }
};


// 2. Defina a interface para as props do InfoRow
interface InfoRowProps {
  label: string;
  value: string;
  iconName: string;
}

// 3. Componente auxiliar para exibir uma linha de informação
const InfoRow = ({ label, value, iconName }: InfoRowProps) => { // <-- MUDANÇA
  

  return (
    <View style={styles.infoRow}>
      
      <View style={styles.infoTextContainer}>
        <Text category='s2' appearance='hint'>{label}</Text>
        <Text category='s1' numberOfLines={2}>{value}</Text>
      </View>
    </View>
  );
};


export default function CompanyScreen() {
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
                Minha Empresa
              </Text>
              <Text appearance='hint' style={styles.subtitle}>
                Informações da empresa que você colabora.
              </Text>
            </View>

            {/* CONTEÚDO ROLÁVEL */}
            <ScrollView 
              style={styles.scrollContainer}
              contentContainerStyle={styles.scrollContent}
            >
              <Text category='h6' style={styles.sectionTitle}>
                Informações Principais
              </Text>
              <Card style={styles.card}>
                <InfoRow 
                  label="Nome Fantasia" 
                  value={companyData.name} 
                  iconName='radio-button-on-outline' 
                />
                <InfoRow 
                  label="Razão Social" 
                  value={companyData.legalName} 
                  iconName='briefcase-outline' 
                />
                <InfoRow 
                  label="CNPJ" 
                  value={companyData.cnpj} 
                  iconName='hash-outline' 
                />
                <InfoRow 
                  label="Segmento" 
                  value={companyData.industry} 
                  iconName='layers-outline' 
                />
              </Card>

              <Text category='h6' style={styles.sectionTitle}>
                Contato e Endereço
              </Text>
              <Card style={styles.card}>
                <InfoRow 
                  label="E-mail" 
                  value={companyData.email} 
                  iconName='email-outline' 
                />
                <InfoRow 
                  label="Telefone" 
                  value={companyData.phone} 
                  iconName='phone-outline' 
                />
                <InfoRow 
                  label="Endereço" 
                  value={`${companyData.address.street}, ${companyData.address.number}, ${companyData.address.city} - ${companyData.address.state}`} 
                  iconName='pin-outline' 
                />
              </Card>

            </ScrollView>
        </Layout>
    )
}

const styles = StyleSheet.create({
    // --- Estilos Reutilizados ---
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
      marginTop: 20,
      marginBottom: 8,
    },
    // --- Novos Estilos ---
    card: {
      marginVertical: 4, // Similar ao 'activeCard'
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 12, // Espaçamento entre as linhas
    },
    icon: {
      width: 24,
      height: 24,
      marginRight: 16, // Espaço entre o ícone e o texto
    },
    infoTextContainer: {
      flex: 1, // Permite que o texto quebre a linha se for longo
    },
})