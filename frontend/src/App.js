import { useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import Carrinho from "./pages/Carrinho";
import Checkout from "./pages/Checkout";
import Confirmacao from "./pages/Confirmacao";
import Admin from "./pages/Admin";
import Contato from "./pages/Contato";
import Footer from "./components/Footer";
import AvisoFechado, { verificarHorario } from "./components/AvisoFechado";

function App() {
  const [pagina, setPagina] = useState("home");
  const [carrinho, setCarrinho] = useState([]);
  const [pedido, setPedido] = useState(null);

  function adicionarAoCarrinho(produto) {
    setCarrinho((prev) => {
      const idx = prev.findIndex((item) => item.id === produto.id);
      if (idx >= 0) {
        return prev.map((item, i) =>
          i === idx ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  }

  function removerDoCarrinho(id) {
    setCarrinho((prev) => prev.filter((item) => item.id !== id));
  }

  function alterarQuantidade(id, delta) {
    setCarrinho((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantidade: item.quantidade + delta } : item
        )
        .filter((item) => item.quantidade > 0)
    );
  }

  function finalizarPedido(form, total) {
    setPedido({ form, total, itens: carrinho });
    setCarrinho([]);
  }

  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={totalItens} onNavegar={setPagina} />
      <main className="max-w-6xl mx-auto px-4 py-8">
        {pagina === "home" && <Home onNavegar={setPagina} />}
        {pagina === "catalogo" && (
          <Catalogo onAddToCart={adicionarAoCarrinho} onNavegar={setPagina} />
        )}
        {pagina === "carrinho" && (
          <Carrinho
            carrinho={carrinho}
            onRemover={removerDoCarrinho}
            onAlterarQuantidade={alterarQuantidade}
            onNavegar={setPagina}
          />
        )}
        {pagina === "checkout" && (
          <Checkout carrinho={carrinho} onNavegar={setPagina} onFinalizarPedido={finalizarPedido} />
        )}
        {pagina === "confirmacao" && (
          <Confirmacao pedido={pedido} onNavegar={setPagina} />
        )}
        {pagina === "admin" && (
          <Admin onNavegar={setPagina} />
        )}
        {pagina === "contato" && (
          <Contato onNavegar={setPagina} />
        )}
      </main>
      <Footer onNavegar={setPagina} />
      {!verificarHorario() && <AvisoFechado />}
    </div>
  );
}

export default App;
