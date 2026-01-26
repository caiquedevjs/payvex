import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001", // Sua URL do NestJS
});

api.interceptors.request.use(
  (config) => {
    const savedUser = localStorage.getItem("@payvex:user");
    console.log("1. Interceptor rodou!");
    console.log("2. O que tem no localStorage?", savedUser);

    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      console.log("3. Token extraído:", parsed.token);

      if (parsed.token) {
        config.headers.Authorization = `Bearer ${parsed.token}`;
        console.log("4. Header injetado com sucesso!");
      } else {
        console.warn("⚠️ Token não encontrado dentro do objeto do usuário!");
      }
    } else {
      console.error("❌ Usuário não encontrado no localStorage!");
    }

    return config;
  },
  (error) => Promise.reject(error),
);
