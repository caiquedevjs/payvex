import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores Identidade Payvex
        brand: {
          blue: "#3A416F", // Azul Marinho (Seriedade)
          green: "#82d616", // Verde (Ação/Dinheiro)
          light: "#F8F9FA", // Cinza claro para fundos
        },
      },
    },
  },
  plugins: [],
};
export default config;
