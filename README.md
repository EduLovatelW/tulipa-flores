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

## 🚀 Demo

> **[https://tulipa-flores.vercel.app](https://tulipa-flores.vercel.app)**

---

## ✨ Funcionalidades

### 🛍️ Para o cliente

| Funcionalidade | Descrição |
|---|---|
| **Catálogo de produtos** | Listagem com filtros por categoria, imagens e emojis temáticos |
| **Carrinho inteligente** | Adicionar, remover e ajustar quantidade de itens em tempo real |
| **Checkout completo** | Formulário com nome, telefone, endereço de entrega e forma de pagamento |
| **Entrega ou retirada** | Escolha entre entrega (taxa R$ 15) ou retirada gratuita na loja |
| **Pagamentos flexíveis** | Suporte a Pix, Cartão e Dinheiro |
| **Confirmação via WhatsApp** | Ao finalizar, o pedido é enviado diretamente para o WhatsApp da floricultura |
| **Aviso de loja fechada** | Modal automático fora do horário de funcionamento com bloqueio do checkout |
| **Orquídeas sob consulta** | Produtos com disponibilidade variável redirecionam para WhatsApp |
| **Página de contato** | Informações da loja, localização e canais de atendimento |

### 🔐 Painel administrativo

| Funcionalidade | Descrição |
|---|---|
| **Login seguro** | Autenticação com senha protegida por hash SHA-256 |
| **Gestão de pedidos** | Visualização de todos os pedidos com dados completos do cliente |
| **Fluxo de status** | Atualização de status: `pendente → em preparo → saiu para entrega → entregue` |
| **Toggle de disponibilidade** | Ativar ou desativar produtos no catálogo em tempo real |
| **Funções serverless** | Operações sensíveis executadas no backend via Vercel Functions |

---

## 🛠️ Stack tecnológica

```
Frontend        React 19 (Create React App) — sem TypeScript
Estilo          Tailwind CSS v3
Backend/BaaS    Supabase (PostgreSQL + Storage + RLS)
Serverless      Vercel Functions (Node.js) — protege a service key
Deploy          Vercel (CI/CD via GitHub)
```

### Por que essas escolhas?

- **React sem router**: navegação via `useState` no `App.js` — simples, sem over-engineering para o escopo do projeto
- **Supabase**: banco relacional + auth + storage + RLS em uma única plataforma, sem custo inicial
- **Vercel Functions**: isola a `SUPABASE_SERVICE_KEY` do bundle do frontend, seguindo boas práticas de segurança
- **Tailwind CSS**: produtividade alta com design consistente e responsivo

---

## 🗂️ Arquitetura

```
tulipa-flores/
├── api/                          # Vercel Serverless Functions (Node.js)
│   ├── pedidos.js                # GET  /api/pedidos — lista pedidos (service key)
│   ├── atualizar-status.js       # PUT  /api/atualizar-status — muda status do pedido
│   ├── produtos-admin.js         # GET  /api/produtos-admin — lista produtos para admin
│   └── atualizar-produto.js      # PUT  /api/atualizar-produto — toggle disponibilidade
│
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Header.jsx        # Navegação + contador do carrinho
│       │   ├── Footer.jsx        # Rodapé com links e informações
│       │   └── AvisoFechado.jsx  # Modal + função verificarHorario()
│       │
│       ├── pages/
│       │   ├── Home.jsx          # Landing page com destaques
│       │   ├── Catalogo.jsx      # Vitrine de produtos com filtros
│       │   ├── Carrinho.jsx      # Carrinho com ajuste de quantidade
│       │   ├── Checkout.jsx      # Formulário de pedido
│       │   ├── Confirmacao.jsx   # Resumo + botão WhatsApp
│       │   ├── Contato.jsx       # Informações de contato
│       │   └── Admin.jsx         # Painel administrativo protegido
│       │
│       ├── services/
│       │   └── supabase.js       # Cliente Supabase (anon key — pública por design)
│       │
│       └── App.js                # Estado global: página, carrinho, pedido
│
└── package.json
```

### Fluxo de navegação

```
Home → Catálogo → Carrinho → Checkout → Confirmação
                                           ↓
                                    WhatsApp da loja
```

O estado global é gerenciado diretamente no `App.js` via `useState`, passando props para os filhos. Sem Context API, sem Redux — a simplicidade é intencional para o porte do projeto.

---

## 🔒 Segurança

| Camada | Implementação |
|---|---|
| **Banco de dados** | Row Level Security (RLS) habilitado no Supabase — clientes só escrevem, nunca leem dados de outros |
| **Senha admin** | Armazenada como hash SHA-256, nunca em texto plano |
| **Service Key** | Exclusivamente nas Vercel Functions (`/api`) — nunca exposta no bundle do frontend |
| **Anon Key** | Permanece no frontend (`supabase.js`) — é pública por design do Supabase |
| **Variáveis de ambiente** | `.env` no `.gitignore` — valores sensíveis nunca vão para o repositório |

---

## 🖥️ Como rodar localmente

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta no [Supabase](https://supabase.com) com projeto criado

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/tulipa-flores.git
cd tulipa-flores

# 2. Instale as dependências do frontend
cd frontend
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais do Supabase

# 4. Inicie o servidor de desenvolvimento
npm start
```

O app estará disponível em `http://localhost:3000`.

> **Nota:** Para testar as funções serverless localmente, instale a [Vercel CLI](https://vercel.com/docs/cli) e rode `vercel dev` na raiz do projeto.

---

## 🔑 Variáveis de ambiente

Crie um arquivo `.env` dentro de `frontend/` com:

```env
# Supabase — frontend (anon key, pública por design)
REACT_APP_SUPABASE_URL=https://SEU_PROJETO.supabase.co
REACT_APP_SUPABASE_ANON_KEY=sua_anon_key_aqui
```

E na raiz do projeto (usadas pelas Vercel Functions):

```env
# Supabase — serverless (NUNCA expor no frontend)
SUPABASE_URL=https://SEU_PROJETO.supabase.co
SUPABASE_SERVICE_KEY=sua_service_role_key_aqui
```

> ⚠️ **Nunca** comite o `.env` com valores reais. O `.gitignore` já está configurado para ignorá-lo.

---

## 📦 Deploy na Vercel

### 1. Conecte o repositório

1. Acesse [vercel.com](https://vercel.com) e importe o repositório do GitHub
2. Configure o **Root Directory** como `frontend`
3. O framework será detectado automaticamente como Create React App

### 2. Configure as variáveis de ambiente

No painel da Vercel, em **Settings → Environment Variables**, adicione:

```
REACT_APP_SUPABASE_URL
REACT_APP_SUPABASE_ANON_KEY
SUPABASE_URL
SUPABASE_SERVICE_KEY
```

### 3. Deploy automático

Todo `push` na branch `main` dispara um novo deploy automaticamente. As funções em `/api` são detectadas e publicadas como Vercel Functions.

---

## 🗃️ Banco de dados (Supabase)

### Tabelas

```sql
-- Produtos disponíveis na loja
produtos (
  id, nome, categoria, preco, emoji, disponivel,
  consultar_disponibilidade, adicional_balao,
  adicional_ferrero, imagem_url
)

-- Pedidos realizados pelos clientes
pedidos (
  id, cliente_nome, cliente_telefone, tipo_entrega,
  endereco, pagamento, observacao, total, status, criado_em
)

-- Itens vinculados a cada pedido
itens_pedido (
  id, pedido_id, produto_nome, produto_emoji, preco
)
```

### Status dos pedidos

```
pendente → em_preparo → saiu_entrega → entregue
                                    ↘ cancelado
```

---

## 📍 Sobre a floricultura

**Tulipa Flores** — Pato Branco/PR  
📞 WhatsApp: [(46) 99136-0839](https://wa.me/5546991360839)  
🕐 Horário: Seg–Sex, 08:30–12:00 e 13:00–18:00

---

## 👨‍💻 Desenvolvido por

**Eduardo Lovatel**

[![GitHub](https://img.shields.io/badge/GitHub-Eduardo_Lovatel-181717?style=flat-square&logo=github)](https://github.com/lovatel)

---

<p align="center">
  Feito com 💜 e ☕ em Pato Branco/PR
</p>
