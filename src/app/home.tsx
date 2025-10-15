// Em app/home.js

// 1. Importe 'TabBar' e 'Tab' em vez de 'BottomNavigation'
import { Layout, Tab, TabBar } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Suas importações de tela continuam as mesmas
import { OrdersScreen } from '../components/screens/OrdersScreen';
import { TransactionsScreen } from '../components/screens/TransactionsScreen';
import { UsersScreen } from '../components/screens/UsersScreen';

export default function HomeScreen() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  // Esta função para renderizar a tela correta não muda!
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
    <SafeAreaView style={{ flex: 1 }}>
    
    <Layout style={{ flex: 1 }}>
      
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
    </SafeAreaView>
  );
}

// 3. Crie o StyleSheet com a margem
const styles = StyleSheet.create({
  tabBar: {
    marginTop: 40, // <-- Ajuste este valor como preferir
  },
});