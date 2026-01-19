import axios from "axios";

const api = axios.create({
  baseURL: "http://10.0.2.2:3000", // IP padrão do emulador para o seu PC
});

export default api;
