function Contato({ onNavegar }) {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-pink-700 mb-8">Fale Conosco</h2>

      <div className="bg-white rounded-2xl shadow p-8 mb-6">
        <h3 className="text-xl font-bold text-gray-700 mb-6">Tulipa Flores</h3>

        <div className="flex flex-col gap-5">

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
              📱
            </div>
            <div>
              <p className="text-sm text-gray-500">WhatsApp</p>
              <p className="font-semibold text-green-600">(46) 3225-1035</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-2xl">
              📸
            </div>
            <div>
              <p className="text-sm text-gray-500">Instagram</p>
              <p className="font-semibold text-pink-600">@tulipaflorees</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
              📍
            </div>
            <div>
              <p className="text-sm text-gray-500">Cidade</p>
              <p className="font-semibold text-gray-700">Pato Branco, PR</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-2xl">
              🚗
            </div>
            <div>
              <p className="text-sm text-gray-500">Entrega</p>
              <p className="font-semibold text-gray-700">Somente em Pato Branco</p>
              <p className="text-sm text-gray-500">Taxa de entrega: R$ 15,00</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
              💳
            </div>
            <div>
              <p className="text-sm text-gray-500">Formas de Pagamento</p>
              <p className="font-semibold text-gray-700">Pix, Cartao e Dinheiro</p>
            </div>
          </div>

        </div>
      </div>

      <button
        onClick={() => window.open("https://wa.me/5546932251035", "_blank")}
        className="w-full bg-green-500 text-white py-4 rounded-full text-lg font-bold hover:bg-green-600 transition mb-4"
      >
        Chamar no WhatsApp
      </button>

      <button
        onClick={() => onNavegar("catalogo")}
        className="w-full border border-pink-300 text-pink-600 py-3 rounded-full font-semibold hover:bg-pink-50 transition"
      >
        Ver Catalogo
      </button>
    </div>
  );
}

export default Contato;