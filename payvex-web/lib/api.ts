import axios from "axios";

export const api = axios.create({
  // Se o seu NestJS estiver rodando na porta 3001
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});
