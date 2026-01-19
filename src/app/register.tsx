import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { Toast } from "toastify-react-native";
import api from "../service/api";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Estados do Formulário
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    companyName: "",
    companyCnpj: "",
  });

  const maskCNPJ = (value: any) => {
    return value
      .replace(/\D/g, "") // Remove tudo o que não é dígito
      .replace(/^(\d{2})(\d)/, "$1.$2") // Coloca ponto após os 2 primeiros dígitos
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") // Coloca ponto após os 5 primeiros dígitos
      .replace(/\.(\d{3})(\d)/, ".$1/$2") // Coloca a barra após os 8 primeiros dígitos
      .replace(/(\d{4})(\d)/, "$1-$2") // Coloca o hífen após o bloco de 4 dígitos
      .substring(0, 18); // Limita ao tamanho máximo do CNPJ formatado
  };

  const handleRegister = async () => {
    // 1. Criamos uma cópia dos dados para enviar
    const dataToSubmit = {
      ...formData,
      // Removemos tudo que não for número antes de enviar para o NestJS
      companyCnpj: formData.companyCnpj.replace(/\D/g, ""),
    };

    // 2. Validação básica de tamanho
    if (dataToSubmit.companyCnpj.length !== 14) {
      Toast.error("O CNPJ deve ter 14 dígitos.");
      return;
    }

    setLoading(true);
    try {
      // Enviamos o 'dataToSubmit' em vez do 'formData'
      const response = await api.post("/identity/signup", dataToSubmit);

      Toast.success("Conta criada com sucesso!");
      setTimeout(() => router.replace("/"), 2000);
    } catch (error: any) {
      const msg = error.response?.data?.message || "Erro ao criar conta";
      Toast.error(Array.isArray(msg) ? msg[0] : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Crie sua conta na <Text style={{ color: "#82d616" }}>Payvex</Text>
      </Text>

      <Text style={styles.sectionTitle}>Dados Pessoais</Text>
      <TextInput
        style={styles.input}
        placeholder="Seu Nome"
        value={formData.userName}
        onChangeText={(text) => setFormData({ ...formData, userName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Seu E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={formData.userEmail}
        onChangeText={(text) => setFormData({ ...formData, userEmail: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Sua Senha"
        secureTextEntry
        value={formData.userPassword}
        onChangeText={(text) =>
          setFormData({ ...formData, userPassword: text })
        }
      />

      <Text style={styles.sectionTitle}>Dados da Empresa</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da Empresa"
        value={formData.companyName}
        onChangeText={(text) => setFormData({ ...formData, companyName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="CNPJ (00.000.000/0001-00)"
        keyboardType="numeric"
        value={formData.companyCnpj}
        onChangeText={(text) =>
          setFormData({ ...formData, companyCnpj: maskCNPJ(text) })
        }
      />

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.7 }]}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Carregando..." : "Finalizar Cadastro"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/")}>
        <Text style={styles.linkText}>Já tem uma conta? Faça login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 25, paddingTop: 60, backgroundColor: "#fff" },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#3A416F",
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#82d616",
    marginTop: 15,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  input: {
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E9ECEF",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#3A416F",
    padding: 18,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  linkText: {
    textAlign: "center",
    marginTop: 20,
    color: "#3A416F",
    fontWeight: "500",
  },
});
