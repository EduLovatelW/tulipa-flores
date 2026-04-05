# Tulipa Flores — Contexto do Projeto

## O que é
E-commerce de flores e presentes para a floricultura Tulipa Flores,
localizada em Pato Branco/PR. Primeiro projeto comercial.

## Stack
- React 19 (Create React App) — SEM TypeScript
- Tailwind CSS v3
- Supabase (PostgreSQL + Storage)
- Vercel (deploy — ainda não feito)
- SEM React Router — navegação via useState no App.js

## Estrutura
frontend/src/
├── components/   → Header, Footer, AvisoFechado
├── pages/        → Home, Catalogo, Carrinho, Checkout, Confirmacao, Contato, Admin
├── services/     → supabase.js (cliente), popularBanco.js (legado), Produtos.jsx (legado)
└── App.js        → gerencia estado global: pagina, carrinho, pedidoFinalizado

## Banco de dados (Supabase)
- produtos: id, nome, categoria, preco, emoji, disponivel, consultar_disponibilidade,
  adicional_balao, adicional_ferrero, imagem_url
- pedidos: id, cliente_nome, cliente_telefone, tipo_entrega, endereco,
  pagamento, observacao, total, status, criado_em
- itens_pedido: id, pedido_id, produto_nome, produto_emoji, preco

## Regras de negócio
- Horário: Seg-Sex 08:30-12:00 e 13:00-18:00
- Fora do horário: AvisoFechado aparece + checkout bloqueado
- Entrega apenas em Pato Branco/PR — taxa R$15
- Retirada na loja: grátis
- Pagamentos: Pix, Cartão, Dinheiro
- Orquídeas redirecionam para WhatsApp (disponibilidade variável)
- WhatsApp: 5546991360839

## Painel Admin
- Rota: página "admin" via useState
- Senha atual: hash SHA-256 (NUNCA escrever senha em texto plano)
- Funcionalidades: ver pedidos, mudar status, toggle disponibilidade de produtos
- Status dos pedidos: pendente → em_preparo → saiu_entrega → entregue / cancelado

## Segurança
- Supabase anon key pode ficar em src/services/supabase.js (é pública por design)
- Supabase SERVICE ROLE KEY nunca vai no frontend — apenas em api/ (serverless)
- RLS habilitado nas tabelas (configurar antes do deploy)
- Variáveis sensíveis em .env (nunca commitar o .env)

## Arquivos legados (não mexer)
- src/services/Produtos.jsx — array hardcoded antigo, não utilizado
- src/services/popularBanco.js — seed do banco, desativado com return;

## Bugs conhecidos
- AvisoFechado: usar versão com `export function verificarHorario()` separado
- Imagens: verificar se imagem_url está preenchida no Supabase

## Comandos
- `npm start` — dev server
- `npm run build` — build de produção
- Deploy: Vercel conectado ao GitHub (ainda não configurado)