
import { Layout, Tab, TabBar } from '@ui-kitten/components';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { OrdersScreen } from './OrdersScreen';
import { TransactionsScreen } from './TransactionsScreen';
import { UsersScreen } from './UsersScreen';

export default function HomeScreen() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const renderScreen = () => {
    switch (selectedIndex) {
      case 0:
        return <TransactionsScreen />;
      case 1:
        return <OrdersScreen />;
      case 2:
        return <UsersScreen />;
      default:
        return <UsersScreen />;
    }
  };

  return (
    
    
    <Layout style={{ flex: 1 }}>
       <StatusBar 
              style="dark" // ou "light", dependendo da cor do seu fundo
              backgroundColor="transparent" // Deixa o fundo transparente
              translucent={true} // ✅ ESTA É A PROP MÁGICA!
            />
      
      {/* 2. Mova a barra de navegação para o TOPO do layout */}
      <TabBar
       style={styles.tabBar}
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
        indicatorStyle={{ backgroundColor: '#82d616' }} 
      >
        <Tab title='Dashboard' />
        <Tab title='Pagamentos' />
        <Tab title='Conta' />
        
        
      </TabBar>

      {/* 3. A área de conteúdo agora fica ABAIXO da barra */}
      <View style={{ flex: 1 }}>
        {renderScreen()}
      </View>

    </Layout>
    
  );
}

// 3. Crie o StyleSheet com a margem
const styles = StyleSheet.create({
  tabBar: {
    marginTop: 70 // <-- Ajuste este valor como preferir
  },
});