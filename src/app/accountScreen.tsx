// Em app/accountScreen.tsx

import {
  Avatar,
  Button,
  Input,
  Layout,
  Text
} from '@ui-kitten/components';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';

// 1. IMPORTAÇÃO REMOVIDA
// import { Icon, IconElement } from '@ui-kitten/components';
// import { ImageProps } from 'react-native'; // Não é mais necessário

// 2. IMPORTAÇÃO ADICIONADA
// Você pode escolher outro pacote, como FontAwesome, Ionicons, etc.
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// 3. FUNÇÕES DE ÍCONE REMOVIDAS
// As funções PersonIcon, EmailIcon, e LockIcon foram removidas.

export default function AccountScreen() {
  const [nome, setNome] = React.useState('Nome do Usuário');
  const [email, setEmail] = React.useState('usuario@email.com');
  const [telefone, setTelefone] = React.useState('(71) 99999-9999');

  return (
    <Layout style={styles.container}>
      <StatusBar 
        style="dark"
        backgroundColor="transparent"
        translucent={true}
      />

      <View style={styles.headerContainer}>
        <Avatar 
          style={styles.avatar} 
          size='giant' 
          source={{ uri: 'https://i.pravatar.cc/150' }}
        />
        <Text category="h4" style={styles.nomeText}>
          {nome || 'Nome do Usuário'}
        </Text>
        <Text appearance='hint'>
          {email}
        </Text>
      </View>

      <View style={styles.formContainer}>
        <Input
          label='Nome Completo'
          value={nome}
          onChangeText={setNome}
          style={styles.input}
          // 4. PROP MODIFICADA
          // Passamos uma função que renderiza o ícone.
          // UI Kitten passa 'props' que incluem o 'style' com 'tintColor'.
          accessoryLeft={props => (
            <Icon 
              name="account-outline" 
              size={24} 
              // Pega a cor do tema!
            />
          )}
        />
        <Input
          label='Email'
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType='email-address'
          // 4. PROP MODIFICADA
          accessoryLeft={props => (
            <Icon 
              name="email-outline" 
              size={24} 
              
            />
          )}
        />

        <Input
          label='Telefone'
          value={telefone}
          onChangeText={setTelefone}
          style={styles.input}
          keyboardType='phone-pad' // Abre o teclado numérico
          accessoryLeft={props => (
            <Icon 
              name="phone-outline" 
              size={24} 
              
            />
          )}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          onPress={() => { /* Navegar para tela de alterar senha */ }}
          // 4. PROP MODIFICADA
          accessoryLeft={props => (
            <Icon 
              name="lock-outline" 
              size={18} // Ícones de botão são menores
              // Pega a cor do botão (branca)
            />
          )}
        >
          Alterar Senha
        </Button>
        <Button
          style={styles.button_delete_account}
          status='danger'
          appearance='outline'
          onPress={() => { /* Lógica de Logout */ }}
        >
          Deletar conta
        </Button>
      </View>

    </Layout>
  );
}

// Estilos permanecem os mesmos
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingTop: Constants.statusBarHeight, 
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  avatar: {
    marginBottom: 16,
  },
  nomeText: {
    marginBottom: 4,
    color: '#3A416F'
  },
  formContainer: {
    width: '100%',
  },
  input: {
    marginVertical: 8,
    borderRadius : 5,
    borderColor: '#3A416F'
  },
  buttonContainer: {
    width: '100%',
    marginTop: 24,
  },
  button: {
    marginVertical: 4,
    backgroundColor: '#3A416F',
    borderRadius: 5,
    borderColor : '#3A416F'
  },
  button_delete_account: {
  marginVertical: 4,
  borderRadius: 5,
  
  }
});