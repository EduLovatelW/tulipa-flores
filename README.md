<h1 align="center">
  🌷 Tulipa Flores
</h1>

<p align="center">
  E-commerce completo para floricultura — do catálogo ao pedido confirmado
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS v3" />
  <img src="https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/Vercel-Deploy-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

<p align="center">
  <a href="https://tulipa-flores.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/🌐_Ver_Demo_ao_vivo-tulipa--flores.vercel.app-FF69B4?style=for-the-badge" alt="Demo ao vivo" />
  </a>
</p>

---

## 📋 Sobre o projeto

Simulação de um e-commerce real de flores e presentes, desenvolvido como primeiro projeto comercial. O site conta com catálogo de produtos, carrinho de compras, checkout completo e painel administrativo.

O desafio foi transformar um processo manual (catálogo em PDF + pedidos pelo WhatsApp) em uma experiência digital completa, do catálogo até a confirmação do pedido.

---

## ✨ Funcionalidades

**Loja:**
- Catálogo com filtros por categoria e controle de disponibilidade
- Carrinho com ajuste de quantidade por item
- Checkout com opção de entrega ou retirada na loja
- Pagamento via Pix, Cartão ou Dinheiro
- Confirmação do pedido via WhatsApp
- Bloqueio automático do checkout fora do horário de funcionamento

**Painel admin:**
- Login com senha protegida por hash SHA-256
- Listagem e atualização de status dos pedidos
- Toggle de disponibilidade de produtos em tempo real
- Operações sensíveis via Vercel Functions (service key fora do frontend)

---

## 🛠️ Stack

- **React 19** — navegação via `useState`, sem React Router
- **Tailwind CSS v3** — estilização utilitária e responsiva
- **Supabase** — PostgreSQL + RLS + Storage
- **Vercel Functions** — endpoints serverless para o painel admin
- **Vercel** — deploy contínuo via GitHub

---

## 🔒 Segurança

- RLS habilitado no Supabase — clientes não acessam dados de outros pedidos
- Senha do admin armazenada como hash SHA-256, nunca em texto plano
- `SUPABASE_SERVICE_KEY` exclusivamente nas Vercel Functions, nunca no bundle do frontend
- Variáveis sensíveis em `.env`, fora do controle de versão

---

## 🖥️ Como rodar localmente

**Pré-requisitos:** Node.js 18+, conta no [Supabase](https://supabase.com)

```bash
git clone https://github.com/seu-usuario/tulipa-flores.git
cd tulipa-flores/frontend
npm install
# configure o .env conforme a seção abaixo
npm start
```

O app estará disponível em `http://localhost:3000`.

Para testar as funções serverless localmente, use `vercel dev` na raiz do projeto.

---

## 🔑 Variáveis de ambiente

`frontend/.env`:
```env
REACT_APP_SUPABASE_URL=https://SEU_PROJETO.supabase.co
REACT_APP_SUPABASE_ANON_KEY=sua_anon_key_aqui
```

`.env` na raiz (Vercel Functions):
```env
SUPABASE_URL=https://SEU_PROJETO.supabase.co
SUPABASE_SERVICE_KEY=sua_service_role_key_aqui
```
