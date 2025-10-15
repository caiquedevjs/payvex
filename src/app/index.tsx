
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Input } from '../components/Input/Input';
import { Login_Logo } from '../components/Login_logo/Login_logo';
import { app_styles } from './app_styles';


export default function Index() {
 


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
      <Input />

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