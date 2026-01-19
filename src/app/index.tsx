import { useRouter } from "expo-router"; // 1. Importar o hook de navegação
import * as SecureStore from "expo-secure-store"; // 2. Importar o SecureStore
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Toast } from "toastify-react-native";
import { Login_Logo } from "../components/Login_logo/Login_logo";
import { loginUser } from "../features/auth.login.feature";
import { app_styles } from "./app_styles";

export default function Index() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handlerLogin = async () => {
    // Validação inicial com Toast de aviso
    if (!mail || !password) {
      return Toast.warn("Preencha e-mail e senha!");
    }

    try {
      const data = await loginUser(mail, password);

      // Feedback de Sucesso (Usa o verde da sua paleta)
      Toast.success("Bem-vindo de volta!");

      await SecureStore.setItemAsync("userToken", data.access_token);

      // Pequeno delay para o usuário ver o Toast antes de mudar de tela
      setTimeout(() => {
        router.replace("/home");
      }, 1000);
    } catch (error: any) {
      // Feedback de Erro
      const errorMsg = error.response?.data?.message || "Credenciais inválidas";
      Toast.error(Array.isArray(errorMsg) ? errorMsg[0] : errorMsg);
    }
  };

  return (
    <View style={app_styles.App}>
      <StatusBar
        style="dark" // ou "light", dependendo da cor do seu fundo
        backgroundColor="transparent" // Deixa o fundo transparente
        translucent={true} // ✅ ESTA É A PROP MÁGICA!
      />
      {/* O <ToastManager /> FOI REMOVIDO DAQUI */}
      <Text style={text_styles.Text}>
        Organize todos os seus <Text style={span_styles.Text}>pagamentos</Text>{" "}
        em um só lugar.
      </Text>

      <Login_Logo />
      <View style={login_form_styles.Form_login}>
        <TextInput
          style={login_form_styles.input}
          placeholder="Mail"
          placeholderTextColor="#3A416F"
          inputMode="email"
          value={mail}
          onChangeText={setMail}
        ></TextInput>
        <TextInput
          style={login_form_styles.input}
          placeholder="Senha"
          placeholderTextColor="#3A416F"
          inputMode="text"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        ></TextInput>
        <TouchableOpacity
          style={login_form_styles.LoginButton}
          onPress={handlerLogin}
        >
          <Text style={login_form_styles.LoginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={singin_conteiner.Sing_in}>
        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text style={singin_text.Sing_in_text}>Criar Conta</Text>
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
    fontWeight: "bold",
    fontFamily: "Roboto",
    color: "#3A416F",
  },
});
export const span_styles = StyleSheet.create({
  Text: {
    color: "#82d616",
  },
});
export const singin_conteiner = StyleSheet.create({
  Sing_in: {
    display: "flex",
    flexDirection: "row",
    gap: "35%",
  },
});
export const singin_text = StyleSheet.create({
  Sing_in_text: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#3A416F",
  },
});

export const login_form_styles = StyleSheet.create({
  Form_login: {
    width: "100%",
    gap: 10,
  },

  input: {
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E9ECEF",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: "#3A416F",
  },

  LoginButton: {
    backgroundColor: "#82d616", // Peguei a cor verde que você usou no texto
    padding: 15,
    borderRadius: 5,
    alignItems: "center", // Para centralizar o texto
  },
  LoginButtonText: {
    color: "#0a0a0aff", // Texto branco
    fontWeight: "bold",
    fontSize: 16,
  },
});
