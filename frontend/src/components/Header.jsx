function Header({ cartCount = 0, onNavegar }) {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onNavegar("home")}
        >
          <span className="text-2xl">🌸</span>
          <span className="text-xl font-bold text-pink-600">Tulipa Flores</span>
        </div>

        {/* Navegação */}
        <nav className="hidden md:flex gap-6 text-gray-600 font-medium">
          <button onClick={() => onNavegar("home")} className="hover:text-pink-600 transition">Início</button>
          <button onClick={() => onNavegar("catalogo")} className="hover:text-pink-600 transition">Catálogo</button>
          <button onClick={() => onNavegar("contato")} className="hover:text-pink-600 transition">Contato</button>
          <button onClick={() => onNavegar("admin")} className="hover:text-pink-600 transition">Admin</button>
        </nav>

        {/* Carrinho */}
        <button
          onClick={() => onNavegar("carrinho")}
          className="relative flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700 transition"
        >
          <span>🛒</span>
          <span className="text-sm font-medium">Carrinho</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>


      </div>
    </header>
  );
}

export default Header;