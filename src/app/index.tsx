
import { useRouter } from 'expo-router'; // 1. Importar o hook de navegação
import * as SecureStore from 'expo-secure-store'; // 2. Importar o SecureStore
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useState } from 'react';
import { Login_Logo } from '../components/Login_logo/Login_logo';
import { loginUser } from '../features/auth.login.feature';
import { app_styles } from './app_styles';


export default function Index() {
  const  [mail, setMail] = useState('');
  const  [password, setPassword] = useState('')
  const router = useRouter();

const handlerLogin =  async () => {
  if (!mail || !password ){
    return console.error('Por favor digite um mail e sua senha.')
  }
  try{
    const data = await loginUser(mail, password)
    console.log('Token de Acesso:', data.access_token);
    Alert.alert('Sucesso!', 'Login realizado.');

    await SecureStore.setItemAsync('userToken', data.access_token);
    router.replace('/UsersScreen');
  }
  catch (error) {
      // ERRO!
      Alert.alert('Erro no Login');
    }
}

  return (
    <View style={app_styles.App}>
      <StatusBar 
                    style="dark" // ou "light", dependendo da cor do seu fundo
                    backgroundColor="transparent" // Deixa o fundo transparente
                    translucent={true} // ✅ ESTA É A PROP MÁGICA!
                  />
      {/* O <ToastManager /> FOI REMOVIDO DAQUI */}
      <Text style={text_styles.Text}>
        Organize todos os seus <Text style={span_styles.Text}>pagamentos</Text>{' '}
        em um só lugar.
      </Text>

      <Login_Logo />
      <View style={login_form_styles.Form_login}>
      <TextInput placeholder="Mail" placeholderTextColor= '#3A416F'  inputMode="email" value={mail} onChangeText={setMail}></TextInput>
      <TextInput placeholder="Senha" placeholderTextColor= '#3A416F'  inputMode="text" secureTextEntry={true} value={password} onChangeText={setPassword}></TextInput>
      <button onClick={handlerLogin}>Login</button>
      </View>
      <View style={singin_conteiner.Sing_in}>
        <TouchableOpacity>
          <Text style={singin_text.Sing_in_text}>Sing in</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={singin_text.Sing_in_text}>Esqueci a senha</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export const text_styles = StyleSheet.create({
  Text: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: '#3A416F',
  },
});
export const span_styles = StyleSheet.create({
  Text: {
    color: '#82d616',
  },
});
export const singin_conteiner = StyleSheet.create({
  Sing_in: {
    display: 'flex',
    flexDirection: 'row',
    gap: '35%',
  },
});
export const singin_text = StyleSheet.create({
  Sing_in_text: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#3A416F',
  },
});

export const login_form_styles = StyleSheet.create({
    Form_login : {
        width : "100%",
        gap : 10
       
    }
})