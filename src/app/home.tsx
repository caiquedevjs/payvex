// Em app/home.js

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    // Um contêiner que centraliza o conteúdo
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Home!</Text>
      <Text style={styles.subtitle}>Login realizado com sucesso.</Text>
    </View>
  );
}

// Estilos para a nova tela simples
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa a tela inteira
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
    backgroundColor: '#f5f5f5', // Um fundo claro
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3A416F', // Usando uma de suas cores
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'gray',
  },
});