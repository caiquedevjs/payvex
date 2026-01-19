# 💳 Payvex - Hub de Gestão de Pagamentos B2B

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-SDK%2054-61DAFB?style=for-the-badge&logo=react" alt="React Native">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS">
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma">
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase">
</p>

O **Payvex** é um ecossistema SaaS (Software as a Service) focado na centralização de pagamentos. Projetado para empresas que utilizam múltiplos gateways, o Payvex unifica transações, usuários e assinaturas em uma interface mobile intuitiva e robusta.

---

## 🌟 Diferenciais do Produto

- **Unificação de Gateways:** Visualize todos os seus recebimentos em um só lugar.
- **Arquitetura Multi-tenant:** Isolamento total de dados por empresa via UUIDs.
- **Transações Atômicas:** Cadastro garantido (Empresa + Usuário + Assinatura) via Prisma Transactions.
- **Interface Pro:** Design System baseado no Eva Design (UI Kitten) com notificações fluidas via Toastify.



---

## 🛠️ Stack Tecnológica

### Frontend (Mobile)
- **Framework:** React Native (Expo SDK 54)
- **Navegação:** Expo Router (File-based)
- **UI:** UI Kitten & NativeWind
- **Segurança:** Expo Secure Store (Persistência de JWT)

### Backend (API)
- **Framework:** NestJS
- **Banco de Dados:** PostgreSQL (Supabase)
- **ORM:** Prisma
- **Conexão:** Supavisor Pooler (Porta 6543) para alta disponibilidade.

---

## 📂 Estrutura do Projeto

```text
├── payvex-mobile/          # App React Native
│   ├── app/                # Rotas (Login, Register, Home, Subscription)
│   ├── components/         # UI Reutilizável (Logo, Custom Inputs)
│   ├── service/            # Configuração Axios (IP: 10.0.2.2 para Emulador)
│   └── babel.config.js     # Configuração de plugins (Reanimated/Worklets)
│
├── payvex-backend/         # API NestJS
│   ├── src/
│   │   ├── modules/        # Identity, Payments, Subscriptions
│   │   └── prisma.service/ # Conexão Singleton
│   └── prisma/             # Schema.prisma e Migrations
