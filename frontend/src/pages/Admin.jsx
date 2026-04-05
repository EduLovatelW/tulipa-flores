import { useState, useEffect } from "react";

const SENHA_ADMIN_HASH = "6aec9ddc40ce4c812034f4b11258596b7e5ddb8ac7ac5b5cfb69b320fc4a696e";

async function hashSenha(texto) {
  const encoder = new TextEncoder();
  const data = encoder.encode(texto);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function Admin({ onNavegar }) {
  const [logado, setLogado] = useState(false);
  const [senha, setSenha] = useState("");
  const [aba, setAba] = useState("pedidos");
  const [pedidos, setPedidos] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  async function fazerLogin() {
    const hash = await hashSenha(senha);
    if (hash === SENHA_ADMIN_HASH) {
      setLogado(true);
    } else {
      alert("Senha incorreta!");
    }
  }

  useEffect(() => {
    if (logado) {
      buscarPedidos();
      buscarProdutos();
    }
  }, [logado]);

  async function buscarPedidos() {
    setCarregando(true);
    try {
      const res = await fetch("/api/pedidos");
      if (!res.ok) throw new Error(`Erro ${res.status}`);
      const data = await res.json();
      setPedidos(data);
    } catch (erro) {
      console.error("Erro ao buscar pedidos:", erro);
    } finally {
      setCarregando(false);
    }
  }

  async function buscarProdutos() {
    try {
      const res = await fetch("/api/produtos-admin");
      if (!res.ok) throw new Error(`Erro ${res.status}`);
      const data = await res.json();
      setProdutos(data);
    } catch (erro) {
      console.error("Erro ao buscar produtos:", erro);
    }
  }

  async function mudarStatus(id, novoStatus) {
    try {
      const res = await fetch("/api/atualizar-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: novoStatus }),
      });
      if (!res.ok) throw new Error(`Erro ${res.status}`);
      buscarPedidos();
    } catch (erro) {
      console.error("Erro ao mudar status:", erro);
    }
  }

  async function toggleDisponivel(id, atual) {
    try {
      const res = await fetch("/api/atualizar-produto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, disponivel: !atual }),
      });
      if (!res.ok) throw new Error(`Erro ${res.status}`);
      buscarProdutos();
    } catch (erro) {
      console.error("Erro ao atualizar produto:", erro);
    }
  }

  const statusCores = {
    pendente: "bg-yellow-100 text-yellow-700",
    em_preparo: "bg-blue-100 text-blue-700",
    saiu_entrega: "bg-purple-100 text-purple-700",
    entregue: "bg-green-100 text-green-700",
    cancelado: "bg-red-100 text-red-700",
  };

  const statusLabels = {
    pendente: "Pendente",
    em_preparo: "Em Preparo",
    saiu_entrega: "Saiu para Entrega",
    entregue: "Entregue",
    cancelado: "Cancelado",
  };

  if (!logado) {
    return (
      <div className="max-w-sm mx-auto mt-20">
        <div className="bg-white rounded-2xl shadow p-8 text-center">
          <h2 className="text-2xl font-bold text-pink-700 mb-2">Tulipa Flores</h2>
          <p className="text-gray-500 mb-6">Painel Administrativo</p>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fazerLogin()}
            placeholder="Digite a senha"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-400 mb-4"
          />
          <button
            onClick={fazerLogin}
            className="w-full bg-pink-600 text-white py-3 rounded-full font-semibold hover:bg-pink-700 transition"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-pink-700">Painel Admin</h2>
        <button
          onClick={() => onNavegar("home")}
          className="text-gray-500 hover:text-pink-600 transition"
        >
          Voltar ao site
        </button>
      </div>

      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setAba("pedidos")}
          className={`px-6 py-2 rounded-full font-semibold transition ${
            aba === "pedidos"
              ? "bg-pink-600 text-white"
              : "bg-white text-gray-600 border border-gray-300"
          }`}
        >
          Pedidos
        </button>
        <button
          onClick={() => setAba("produtos")}
          className={`px-6 py-2 rounded-full font-semibold transition ${
            aba === "produtos"
              ? "bg-pink-600 text-white"
              : "bg-white text-gray-600 border border-gray-300"
          }`}
        >
          Produtos
        </button>
      </div>

      {aba === "pedidos" && (
        <div className="flex flex-col gap-4">
          {carregando ? (
            <p className="text-gray-500 text-center py-10">Carregando pedidos...</p>
          ) : pedidos.length === 0 ? (
            <p className="text-gray-500 text-center py-10">Nenhum pedido ainda.</p>
          ) : (
            pedidos.map((pedido) => (
              <div key={pedido.id} className="bg-white rounded-2xl shadow p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-700 text-lg">{pedido.cliente_nome}</h3>
                    <p className="text-gray-500 text-sm">{pedido.cliente_telefone}</p>
                    <p className="text-gray-500 text-sm">
                      {pedido.tipo_entrega === "entrega"
                        ? `Entrega: ${pedido.endereco}`
                        : "Retirada na loja"}
                    </p>
                    <p className="text-gray-500 text-sm">Pagamento: {pedido.pagamento}</p>
                    {pedido.observacao && (
                      <p className="text-gray-500 text-sm">Obs: {pedido.observacao}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(pedido.criado_em).toLocaleString("pt-BR")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-pink-600">
                      R$ {Number(pedido.total).toFixed(2).replace(".", ",")}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${statusCores[pedido.status]}`}>
                      {statusLabels[pedido.status]}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap mt-3 border-t pt-3">
                  {Object.entries(statusLabels).map(([valor, label]) => (
                    <button
                      key={valor}
                      onClick={() => mudarStatus(pedido.id, valor)}
                      className={`text-xs px-3 py-1 rounded-full border transition ${
                        pedido.status === valor
                          ? "bg-pink-600 text-white border-pink-600"
                          : "text-gray-500 border-gray-300 hover:border-pink-400"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {aba === "produtos" && (
        <div className="flex flex-col gap-3">
          {produtos.map((produto) => (
            <div
              key={produto.id}
              className="bg-white rounded-2xl shadow p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{produto.emoji}</span>
                <div>
                  <p className="font-semibold text-gray-700">{produto.nome}</p>
                  <p className="text-sm text-gray-500">{produto.categoria}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-pink-600">
                  R$ {Number(produto.preco).toFixed(2).replace(".", ",")}
                </span>
                <button
                  onClick={() => toggleDisponivel(produto.id, produto.disponivel)}
                  className={`px-4 py-1 rounded-full text-sm font-semibold transition ${
                    produto.disponivel
                      ? "bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-700"
                      : "bg-red-100 text-red-700 hover:bg-green-100 hover:text-green-700"
                  }`}
                >
                  {produto.disponivel ? "Disponivel" : "Indisponivel"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Admin;
