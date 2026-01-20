# 💳 Payvex - Hub de Gestão de Pagamentos B2B

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"> <img
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

### Frontend (Web) - NOVO
- **Framework:** Next.js 15 (App Router)
- **Motor de Build:** Turbopack (Ultra-fast development)
- **Estilização:** Tailwind CSS v4 (Engine de alto desempenho)
- **Componentes:** Shadcn/ui & Radix UI
- **Ícones:** Lucide React

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
├── payvex-web/             # Dashboard Administrativo Next.js
│   ├── app/                # App Router (Login, Register, Dashboard)
│   ├── components/         # Componentes Shadcn/ui & Reutilizáveis
│   ├── lib/                # Configurações (Axios/API, Utils)
│   └── public/             # Assets (Logo Payvex, Imagens)
│
├── payvex-mobile/          # App React Native
│   ├── app/                # Rotas (Login, Register, Home, Subscription)
│   ├── components/         # UI Reutilizável (Logo, Custom Inputs)
│   └── service/            # Configuração Axios
│
├── payvex-backend/         # API NestJS
│   ├── src/
│   │   ├── modules/        # Identity, Payments, Subscriptions
│   │   └── prisma.service/ # Conexão Singleton
│   └── prisma/             # Schema.prisma e Migrations
```




# 📄 Documento de Requisitos e Modelo de Negócio: Payvex

Este documento detalha as diretrizes de negócio, funcionalidades e especificações técnicas que regem o desenvolvimento do **Payvex**, um ecossistema SaaS para gestão financeira centralizada.

---

## 1. Visão Geral do Produto
O **Payvex** é uma plataforma B2B (Business-to-Business) que resolve a fragmentação de dados financeiros. Ele atua como um "Hub" onde gestores podem conectar múltiplos gateways de pagamento e visualizar sua operação em um dashboard mobile unificado.

---

## 2. Modelo de Negócio (SaaS)
O Payvex opera no modelo de **Software as a Service (SaaS)** com monetização baseada em subscrição mensal e limites de uso (Tiered Pricing).

### 💰 Estrutura de Planos
| Plano | Valor Mensal | Transações | Usuários | Gateways |
| :--- | :--- | :--- | :--- | :--- |
| **Trial** | Grátis (7 dias) | 100 | 3 | 1 |
| **Standard** | R$ 149,00 | 1.000 | 5 | 3 |
| **Pro** | R$ 349,00 | 5.000 | 15 | Ilimitados |
| **Enterprise** | Sob consulta | Ilimitado | Custom | Custom |

---

## 3. Requisitos Funcionais (RF)

### 3.1 Autenticação e Segurança
- **RF01 - Cadastro Atômico:** O sistema deve criar, em uma única transação, a Empresa (`Company`), o primeiro Usuário (`ADMIN`) e a Assinatura (`Subscription`).
- **RF02 - Login Seguro:** Autenticação baseada em JWT com expiração configurável.
- **RF03 - Proteção de Rotas:** O acesso a dados financeiros deve exigir um token válido e pertencer ao `companyId` da sessão.

### 3.2 Gestão Organizacional (Multi-tenancy)
- **RF04 - Isolamento de Dados:** Nenhuma empresa pode acessar dados de outra empresa (Hard Isolation via Foreign Keys).
- **RF05 - Hierarquia de Roles:**
  - `ADMIN`: Gestão de planos, usuários e configurações.
  - `USER`: Acesso a dashboards e extratos.

### 3.3 Dashboard e Finanças
- **RF06 - Consolidação Financeira:** Listagem unificada de pagamentos de diferentes fontes.
- **RF07 - Extrato Detalhado:** Histórico de movimentações com status e datas.
- **RF08 - Gestão de Quotas:** Monitoramento em tempo real do limite de transações e usuários permitidos no plano atual.

---

## 4. Requisitos Não Funcionais (RNF)

- **RNF01 - Performance:** O tempo de carregamento do dashboard não deve ultrapassar 2 segundos.
- **RNF02 - Segurança:** Senhas criptografadas com `Bcrypt` (10 salt rounds).
- **RNF03 - Disponibilidade:** Banco de dados PostgreSQL com Connection Pooling (Supavisor) para evitar quedas por excesso de conexões.
- **RNF04 - UX Mobile:** Máscaras de input (CNPJ) e feedback visual via Toasts em todas as ações críticas.
- **RNF05 - Escalabilidade:** Arquitetura NestJS modularizada para facilitar a adição de novos gateways (Stripe, Mercado Pago, etc).

---

## 5. Arquitetura de Dados (Resumo)

### Entidades Principais:
1. **Company:** Armazena dados da organização (Nome, CNPJ).
2. **User:** Armazena dados do colaborador e sua Role (Admin/User).
3. **Subscription:** Controla o plano ativo e os limites de consumo.
4. **Transaction:** Registro de cada entrada/saída financeira.

---

## 6. Fluxo de Valor do Usuário (User Journey)
1. **Onboarding:** O usuário cadastra sua empresa e já inicia no plano Trial.
2. **Integração:** O usuário conecta suas chaves de API de gateways externos.
3. **Monitoramento:** O gestor acompanha as vendas via App Mobile em tempo real.
4. **Escalabilidade:** Conforme o volume cresce, o usuário faz o upgrade de plano na tela de Assinatura.

---

## 7. Stack de Desenvolvimento
- **Web:** Next.js
- **Mobile:** React Native & Expo Router.
- **Backend:** NestJS & TypeScript.
- **Database:** PostgreSQL (Supabase).
- **ORM:** Prisma.
- **Auth:** JWT.

## 8. Fluxo de Trabalho (Gitflow)
### O projeto segue um fluxo de trabalho profissional para garantir a estabilidade:

- **main:** Código estável em produção.

- **develop:** Base para integração de novas funcionalidades.

- **feature/:** Desenvolvimento de novas tarefas (ex: feature/login-web).
