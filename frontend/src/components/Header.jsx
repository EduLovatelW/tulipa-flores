import { useState } from "react";

function Header({ cartCount = 0, onNavegar }) {
  const [menuAberto, setMenuAberto] = useState(false);

  function navegar(pagina) {
    setMenuAberto(false);
    onNavegar(pagina);
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navegar("home")}
        >
          <span className="text-2xl">🌸</span>
          <span className="text-xl font-bold text-pink-600">Tulipa Flores</span>
        </div>

        {/* Navegação desktop */}
        <nav className="hidden md:flex gap-6 text-gray-600 font-medium">
          <button onClick={() => navegar("home")} className="hover:text-pink-600 transition">Início</button>
          <button onClick={() => navegar("catalogo")} className="hover:text-pink-600 transition">Catálogo</button>
          <button onClick={() => navegar("contato")} className="hover:text-pink-600 transition">Contato</button>
          <button onClick={() => navegar("admin")} className="hover:text-pink-600 transition">Admin</button>
        </nav>

        {/* Direita: carrinho + hambúrguer */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navegar("carrinho")}
            className="relative flex items-center gap-2 bg-pink-600 text-white px-3 sm:px-4 py-2 rounded-full hover:bg-pink-700 transition"
          >
            <span>🛒</span>
            <span className="hidden sm:inline text-sm font-medium">Carrinho</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>

          {/* Botão hambúrguer (mobile only) */}
          <button
            onClick={() => setMenuAberto((v) => !v)}
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg hover:bg-gray-100 transition"
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          >
            <span
              className={`block w-5 h-0.5 bg-gray-600 transition-all duration-200 origin-center ${
                menuAberto ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-600 transition-all duration-200 ${
                menuAberto ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-600 transition-all duration-200 origin-center ${
                menuAberto ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Menu mobile dropdown */}
      {menuAberto && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-3 flex flex-col gap-1">
          <button
            onClick={() => navegar("home")}
            className="text-left py-2.5 px-3 rounded-xl text-gray-600 hover:bg-pink-50 hover:text-pink-600 transition font-medium"
          >
            Início
          </button>
          <button
            onClick={() => navegar("catalogo")}
            className="text-left py-2.5 px-3 rounded-xl text-gray-600 hover:bg-pink-50 hover:text-pink-600 transition font-medium"
          >
            Catálogo
          </button>
          <button
            onClick={() => navegar("contato")}
            className="text-left py-2.5 px-3 rounded-xl text-gray-600 hover:bg-pink-50 hover:text-pink-600 transition font-medium"
          >
            Contato
          </button>
          <button
            onClick={() => navegar("admin")}
            className="text-left py-2.5 px-3 rounded-xl text-gray-600 hover:bg-pink-50 hover:text-pink-600 transition font-medium"
          >
            Admin
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
