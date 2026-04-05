import { useState, useEffect } from "react";
import { supabase } from "../services/supabase";

const categorias = ["Todos", "Buquês", "Orquídeas", "Box", "Cestas"];

function Catalogo({ onAddToCart, onNavegar }) {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [adicionado, setAdicionado] = useState(null);

  useEffect(() => {
    async function buscarProdutos() {
      const { data, error } = await supabase
        .from("produtos")
        .select("*")
        .eq("disponivel", true)
        .order("categoria");

      if (error) {
        console.error("Erro ao buscar produtos:", error);
        setErro(error.message);
      } else {
        setProdutos(data || []);
      }
      setCarregando(false);
    }
    buscarProdutos();
  }, []);

  function handleAddToCart(produto) {
    onAddToCart(produto);
    setAdicionado(produto.id);
    setTimeout(() => setAdicionado(null), 1500);
  }

  const produtosFiltrados = categoriaSelecionada === "Todos"
    ? produtos
    : produtos.filter((p) => p.categoria === categoriaSelecionada);

  if (carregando) {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">🌸</div>
        <p className="text-gray-500 text-lg">Carregando produtos...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">⚠️</div>
        <p className="text-red-500 text-lg font-semibold mb-2">Erro ao carregar produtos</p>
        <p className="text-gray-400 text-sm">{erro}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-pink-700 mb-2">Catalogo</h2>
        <p className="text-gray-500">Escolha o produto perfeito para o momento especial</p>
      </div>

      {/* Filtro de categorias */}
      <div className="flex gap-3 flex-wrap mb-8">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaSelecionada(cat)}
            className={`px-5 py-2 rounded-full font-medium transition ${
              categoriaSelecionada === cat
                ? "bg-pink-600 text-white shadow-md"
                : "bg-white text-gray-600 border border-gray-200 hover:border-pink-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de produtos */}
      {produtosFiltrados.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🌷</div>
          <p className="text-gray-400 text-lg">Nenhum produto encontrado nessa categoria.</p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {produtosFiltrados.map((produto) => (
          <div
            key={produto.id}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition flex flex-col overflow-hidden"
          >
            {/* Imagem / Emoji placeholder */}
            <div className="bg-pink-50 h-40 flex items-center justify-center text-7xl overflow-hidden">
              {produto.imagem_url ? (
                <img
                  src={produto.imagem_url}
                  alt={produto.nome}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "block";
                  }}
                />
              ) : null}
              <span style={{ display: produto.imagem_url ? "none" : "block" }}>
                {produto.emoji}
              </span>
            </div>

            <div className="p-5 flex flex-col flex-1 justify-between">
              <div>
                <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full font-medium">
                  {produto.categoria}
                </span>
                <h3 className="text-lg font-bold text-gray-700 mt-2 mb-1">{produto.nome}</h3>
                <p className="text-gray-500 text-sm mb-3">{produto.descricao}</p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {produto.consultar_disponibilidade && (
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                      Consultar disponibilidade
                    </span>
                  )}
                  {produto.adicional_balao && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      + Balao por R$ 30,00
                    </span>
                  )}
                  {produto.adicional_ferrero && (
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                      + Ferrero Rocher disponivel
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mt-2">
                <span className="text-2xl font-bold text-pink-600">
                  R$ {Number(produto.preco).toFixed(2).replace(".", ",")}
                </span>
                {produto.consultar_disponibilidade ? (
                  <button
                    onClick={() => window.open("https://wa.me/5546932251035", "_blank")}
                    className="bg-green-500 text-white px-4 py-2 rounded-full text-sm hover:bg-green-600 transition"
                  >
                    WhatsApp
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddToCart(produto)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                      adicionado === produto.id
                        ? "bg-green-500 text-white"
                        : "bg-pink-600 text-white hover:bg-pink-700"
                    }`}
                  >
                    {adicionado === produto.id ? "Adicionado!" : "Adicionar"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalogo;