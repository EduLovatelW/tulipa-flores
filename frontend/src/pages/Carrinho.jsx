function Carrinho({ carrinho, onRemover, onNavegar }) {
  const total = carrinho.reduce((acc, item) => acc + Number(item.preco), 0);

  if (carrinho.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-8xl mb-6">🛒</div>
        <h2 className="text-2xl font-bold text-gray-600 mb-2">
          Seu carrinho esta vazio
        </h2>
        <p className="text-gray-400 mb-8">Adicione produtos para continuar</p>
        <button
          onClick={() => onNavegar("catalogo")}
          className="bg-pink-600 text-white px-8 py-3 rounded-full hover:bg-pink-700 transition shadow-md"
        >
          Ver Catalogo
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-pink-700 mb-2">Meu Carrinho</h2>
        <p className="text-gray-500">{carrinho.length} {carrinho.length === 1 ? "item" : "itens"} no carrinho</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Lista de itens */}
        <div className="md:col-span-2 flex flex-col gap-4">
          {carrinho.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow p-5 flex items-center gap-4"
            >
              <div className="w-16 h-16 bg-pink-50 rounded-xl flex items-center justify-center text-4xl flex-shrink-0">
                {item.emoji}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-700">{item.nome}</h3>
                <p className="text-pink-600 font-semibold">
                  R$ {Number(item.preco).toFixed(2).replace(".", ",")}
                </p>
              </div>
              <button
                onClick={() => onRemover(index)}
                className="text-gray-300 hover:text-red-400 transition text-2xl font-light"
              >
                x
              </button>
            </div>
          ))}
        </div>

        {/* Resumo */}
        <div className="bg-white rounded-2xl shadow p-6 h-fit sticky top-24">
          <h3 className="text-xl font-bold text-gray-700 mb-4">Resumo</h3>

          <div className="flex flex-col gap-2 mb-4">
            {carrinho.map((item, index) => (
              <div key={index} className="flex justify-between text-sm text-gray-500">
                <span className="truncate mr-2">{item.nome}</span>
                <span className="flex-shrink-0">R$ {Number(item.preco).toFixed(2).replace(".", ",")}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between text-gray-500 mb-2">
              <span>Subtotal</span>
              <span>R$ {total.toFixed(2).replace(".", ",")}</span>
            </div>
            <div className="flex justify-between text-gray-500 mb-4">
              <span>Frete</span>
              <span className="text-xs text-gray-400">calculado no checkout</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-gray-700">
              <span>Total</span>
              <span className="text-pink-600">R$ {total.toFixed(2).replace(".", ",")}</span>
            </div>
          </div>

          <button
            onClick={() => onNavegar("checkout")}
            className="w-full bg-pink-600 text-white py-3 rounded-full font-semibold hover:bg-pink-700 transition shadow-md mb-3"
          >
            Finalizar Pedido
          </button>

          <button
            onClick={() => onNavegar("catalogo")}
            className="w-full text-pink-600 border border-pink-300 py-3 rounded-full font-semibold hover:bg-pink-50 transition"
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    </div>
  );
}

export default Carrinho;