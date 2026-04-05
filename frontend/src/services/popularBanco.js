import { supabase } from './supabase';

const produtos = [
  { nome: "1 Rosa ou Girassol Solto", descricao: "Uma rosa ou girassol solto, perfeito para um gesto especial.", preco: 15.00, categoria: "Buquês", emoji: "🌹", disponivel: true },
  { nome: "1 Rosa ou Girassol Embalado", descricao: "Uma rosa ou girassol com embalagem especial.", preco: 30.00, categoria: "Buquês", emoji: "🌹", disponivel: true },
  { nome: "2 Rosas ou Girassóis", descricao: "2 rosas, 2 girassóis ou um de cada.", preco: 60.00, categoria: "Buquês", emoji: "💐", disponivel: true },
  { nome: "3 Rosas ou Girassóis", descricao: "Buquê com 3 rosas ou girassóis.", preco: 80.00, categoria: "Buquês", emoji: "💐", disponivel: true },
  { nome: "5 Rosas ou Girassóis", descricao: "Buquê com 5 rosas ou girassóis.", preco: 130.00, categoria: "Buquês", emoji: "💐", disponivel: true },
  { nome: "6 Rosas ou Girassóis", descricao: "Buquê com 6 rosas ou girassóis.", preco: 170.00, categoria: "Buquês", emoji: "💐", disponivel: true },
  { nome: "12 Rosas", descricao: "Buquê especial com 12 rosas.", preco: 250.00, categoria: "Buquês", emoji: "🌹", disponivel: true },
  { nome: "12 Girassóis", descricao: "Buquê especial com 12 girassóis.", preco: 250.00, categoria: "Buquês", emoji: "🌻", disponivel: true },
  { nome: "12 Rosas e Girassóis", descricao: "Buquê especial com rosas e girassóis juntos.", preco: 250.00, categoria: "Buquês", emoji: "💐", disponivel: true },
  { nome: "Flores do Campo Pequeno", descricao: "Buquê pequeno de flores do campo.", preco: 120.00, categoria: "Buquês", emoji: "🌼", disponivel: true },
  { nome: "Flores do Campo Médio", descricao: "Buquê médio de flores do campo.", preco: 160.00, categoria: "Buquês", emoji: "🌼", disponivel: true },
  { nome: "Flores do Campo Grande", descricao: "Buquê grande de flores do campo.", preco: 200.00, categoria: "Buquês", emoji: "🌼", disponivel: true },
  { nome: "Orquídea", descricao: "Orquídeas a partir de R$ 90,00. Consulte disponibilidade.", preco: 90.00, categoria: "Orquídeas", emoji: "🌸", disponivel: true, consultar_disponibilidade: true },
  { nome: "Box Pequeno", descricao: "Box pequeno com flores. Adicional de balão por R$ 30,00.", preco: 120.00, categoria: "Box", emoji: "🎁", disponivel: true, adicional_balao: true },
  { nome: "Box Médio", descricao: "Box médio com flores. Adicional de balão por R$ 30,00.", preco: 160.00, categoria: "Box", emoji: "🎁", disponivel: true, adicional_balao: true },
  { nome: "Box Grande", descricao: "Box grande com flores. Adicional de balão por R$ 30,00.", preco: 200.00, categoria: "Box", emoji: "🎁", disponivel: true, adicional_balao: true },
  { nome: "Cesta Café da Manhã Pequena", descricao: "Cesta de café da manhã pequena. Adicional Ferrero Rocher disponível.", preco: 250.00, categoria: "Cestas", emoji: "🧺", disponivel: true, adicional_ferrero: true },
  { nome: "Cesta Café da Manhã Média", descricao: "Cesta de café da manhã média. Adicional Ferrero Rocher disponível.", preco: 270.00, categoria: "Cestas", emoji: "🧺", disponivel: true, adicional_ferrero: true },
  { nome: "Cesta Café da Manhã Grande", descricao: "Cesta de café da manhã grande. Adicional Ferrero Rocher disponível.", preco: 300.00, categoria: "Cestas", emoji: "🧺", disponivel: true, adicional_ferrero: true },
  { nome: "Cesta Diversa", descricao: "Cestas com balão, chocolate e ursos. A partir de R$ 160,00.", preco: 160.00, categoria: "Cestas", emoji: "🎀", disponivel: true },
];

export async function popularBanco() {
  // Função desativada - banco já populado
  return;
}