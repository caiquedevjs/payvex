import { Layout } from '@ui-kitten/components';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ButtonIntegration } from '../Button/button_integrations';


export const LogoShowcase = (): React.ReactElement => (

  
  <Layout style={styles.container} level='1'>

    {/* Item 1 */}
    <View style={styles.rowItem}>
      <Image
        style={styles.logo}
        resizeMode='contain'
        source={{ uri: 'https://cdn.icon-icons.com/icons2/2699/PNG/512/stripe_logo_icon_167963.png' }}
      />
      <ButtonIntegration />
    </View>
    
    {/* Item 2 */}
    <View style={styles.rowItem}>
      <Image
        style={styles.logo}
        resizeMode='contain'
        source={{ uri: 'https://logospng.org/download/mercado-pago/logo-mercado-pago-256.png' }}
      />
      <ButtonIntegration />
    </View>

    {/* Item 3 */}
    <View style={styles.rowItem}>
      <Image
        style={styles.logo}
        resizeMode='contain'
        source={{ uri: 'https://painel.hotmobile.com.br/arquivos/email/img_1_9703_20251017_201912.png' }}
      />
      <ButtonIntegration />
    </View>
    
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column', // Empilha os 'rowItem' um em cima do outro
    padding: 8,
    alignSelf: 'stretch', // Faz o container ocupar a largura
  },
  rowItem: {
    flexDirection: 'row',        // Itens lado a lado
    alignItems: 'center',      // <-- Alinha verticalmente
    justifyContent: 'space-between', // <-- Coloca um em cada ponta da linha
    padding: 16,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#E4E9F2',
    borderRadius: 8,
  },
  logo: {
    width: 100,
    height: 50,
  },
});