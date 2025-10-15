// Em app/accountScreen.tsx

import { Layout, Text } from '@ui-kitten/components';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function AccountScreen() {
  return (
    <Layout style={styles.container}>
      {/* 2. Adicione o componente StatusBar com estas props */}
      <StatusBar 
        style="dark" // ou "light", dependendo da cor do seu fundo
        backgroundColor="transparent" // Deixa o fundo transparente
        translucent={true} // ✅ ESTA É A PROP MÁGICA!
      />

      <Text category="h1">Tela da Conta</Text>
      <Text>Meu conteúdo agora começa no topo da tela.</Text>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
});