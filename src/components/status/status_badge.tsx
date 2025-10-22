// Crie este componente auxiliar em algum lugar
import { Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View } from 'react-native';


interface StatusBadgeProps {
  text: string;
  status: 'success' | 'basic'; // Definimos os tipos exatos que esperamos
}
export const StatusBadge = ({ text, status }: StatusBadgeProps) => (
  <View style={[
    styles.badge,
    status === 'success' ? styles.success : styles.basic
  ]}>
    <Text style={styles.badgeText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12, // Deixa bem arredondado
  },
  success: {
    backgroundColor: '#00E096', // Cor de sucesso do UI Kitten (pode variar)
  },
  basic: {
    backgroundColor: '#EDF1F7', // Cor básica do UI Kitten
  },
  badgeText: {
    color: '#222B45', // Cor do texto
    fontSize: 12,
    fontWeight: 'bold',
  },
});