function Footer({ onNavegar }) {
  return (
    <footer className="bg-white border-t border-gray-100 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* Logo e descricao */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl font-bold text-pink-600">Tulipa Flores</span>
            </div>
            <p className="text-gray-500 text-sm">
              Flores e presentes especiais para todos os momentos. Entregamos com amor em Pato Branco/PR.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-gray-700 mb-3">Navegacao</h4>
            <div className="flex flex-col gap-2">
              <button onClick={() => onNavegar("home")} className="text-gray-500 hover:text-pink-600 transition text-left text-sm">Inicio</button>
              <button onClick={() => onNavegar("catalogo")} className="text-gray-500 hover:text-pink-600 transition text-left text-sm">Catalogo</button>
              <button onClick={() => onNavegar("contato")} className="text-gray-500 hover:text-pink-600 transition text-left text-sm">Contato</button>
            </div>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-bold text-gray-700 mb-3">Contato</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <p>WhatsApp: (46) 3225-1035</p>
              <p>Instagram: @tulipaflorees</p>
              <p>Pato Branco, PR</p>
              <button
                onClick={() => window.open("https://wa.me/5546932251035", "_blank")}
                className="mt-2 bg-green-500 text-white px-4 py-2 rounded-full text-sm hover:bg-green-600 transition w-fit"
              >
                Chamar no WhatsApp
              </button>
            </div>
          </div>

        </div>

        <div className="border-t pt-6 text-center text-gray-400 text-sm">
          <p>2025 Tulipa Flores - Todos os direitos reservados</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;