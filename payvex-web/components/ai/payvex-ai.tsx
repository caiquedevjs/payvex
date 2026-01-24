"use client";

import { BubbleChat } from "flowise-embed-react";

export const PayvexAI = () => {
  return (
    <BubbleChat
      chatflowid="0e3f10a9-08b5-45af-9af5-731882137cbd"
      apiHost="https://my-flowise-production.up.railway.app"
      theme={{
        button: {
          backgroundColor: "#82d616", // Verde Payvex
          right: 20,
          bottom: 20,
          size: 48,
          iconColor: "#3a416f", // Ícone no Azul Escuro
          // Você pode colocar a URL do seu logo 'P' aqui:
          // customIconSrc: "https://seu-site.com/logo-p.png",
        },
        chatWindow: {
          title: "Suporte Payvex AI",
          titleAvatarSrc:
            "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Payvex&backgroundColor=3a416f&fillColor=82d616", // Exemplo de avatar
          showWelcomeMessage: true,
          welcomeMessage:
            "Olá! Eu sou a inteligência da Payvex. Como posso otimizar seus pagamentos hoje?",
          backgroundColor: "#ffffff",
          fontSize: 16,
          poweredByTextColor: "#3a416f",
          botMessage: {
            backgroundColor: "#f7f8ff",
            textColor: "#3a416f",
            showAvatar: true,
            avatarSrc:
              "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Payvex&backgroundColor=3a416f&fillColor=82d616",
          },
          userMessage: {
            backgroundColor: "#3a416f", // Balão do usuário no azul da marca
            textColor: "#ffffff",
            showAvatar: true,
            avatarSrc: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
          },
          textInput: {
            placeholder: "Digite sua dúvida...",
            backgroundColor: "#ffffff",
            textColor: "#3a416f",
            sendButtonColor: "#3a416f",
          },
        },
      }}
    />
  );
};
