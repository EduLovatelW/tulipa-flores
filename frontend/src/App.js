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
    setCarrinho((prev) => [...prev, produto]);
  }

  function removerDoCarrinho(index) {
    setCarrinho((prev) => prev.filter((_, i) => i !== index));
  }

  function finalizarPedido(form, total) {
    setPedido({ form, total, itens: carrinho });
    setCarrinho([]);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={carrinho.length} onNavegar={setPagina} />
      <main className="max-w-6xl mx-auto px-4 py-8">
        {pagina === "home" && <Home onNavegar={setPagina} />}
        {pagina === "catalogo" && (
          <Catalogo onAddToCart={adicionarAoCarrinho} onNavegar={setPagina} />
        )}
        {pagina === "carrinho" && (
          <Carrinho carrinho={carrinho} onRemover={removerDoCarrinho} onNavegar={setPagina} />
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