function Home({ onNavegar }) {
  return (
    <div>
      {/* Hero */}
      <section
        className="rounded-3xl p-12 text-center mb-10 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #fff0f5 0%, #ffe4ee 100%)" }}
      >
        <p className="text-pink-400 font-semibold mb-2 tracking-widest text-sm uppercase">
          Flores com amor
        </p>
        <h2 className="text-5xl font-bold text-pink-700 mb-4 leading-tight">
          Flores para todos<br />os momentos
        </h2>
        <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
          Buques, cestas, orquideas e muito mais. Entregamos em Pato Branco!
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => onNavegar("catalogo")}
            className="bg-pink-600 text-white px-8 py-3 rounded-full text-lg hover:bg-pink-700 transition shadow-lg"
          >
            Ver Catalogo
          </button>
          <button
            onClick={() => onNavegar("contato")}
            className="bg-white text-pink-600 border-2 border-pink-300 px-8 py-3 rounded-full text-lg hover:bg-pink-50 transition"
          >
            Fale Conosco
          </button>
        </div>
      </section>

      {/* Beneficios */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {[
          { emoji: "🚗", titulo: "Entrega rapida", desc: "Entregamos em Pato Branco" },
          { emoji: "💐", titulo: "Flores frescas", desc: "Produtos de alta qualidade" },
          { emoji: "💳", titulo: "Facil pagamento", desc: "Pix, cartao ou dinheiro" },
        ].map((item) => (
          <div key={item.titulo} className="bg-white rounded-2xl shadow p-6 text-center">
            <div className="text-4xl mb-3">{item.emoji}</div>
            <h4 className="font-bold text-gray-700 mb-1">{item.titulo}</h4>
            <p className="text-gray-500 text-sm">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Categorias */}
      <section className="mb-10">
        <h3 className="text-2xl font-bold text-gray-700 mb-6">Categorias</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { nome: "Buques", emoji: "💐", cor: "bg-pink-50 hover:bg-pink-100" },
            { nome: "Orquideas", emoji: "🌸", cor: "bg-purple-50 hover:bg-purple-100" },
            { nome: "Box", emoji: "🎁", cor: "bg-yellow-50 hover:bg-yellow-100" },
            { nome: "Cestas", emoji: "🧺", cor: "bg-green-50 hover:bg-green-100" },
          ].map((cat) => (
            <div
              key={cat.nome}
              onClick={() => onNavegar("catalogo")}
              className={`${cat.cor} rounded-2xl shadow p-6 text-center transition cursor-pointer`}
            >
              <div className="text-5xl mb-3">{cat.emoji}</div>
              <div className="font-semibold text-gray-700">{cat.nome}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA WhatsApp */}
      <section className="bg-green-50 rounded-3xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-700 mb-2">Prefere pedir pelo WhatsApp?</h3>
        <p className="text-gray-500 mb-6">Fale diretamente com a gente!</p>
        <button
          onClick={() => window.open("https://wa.me/5546932251035", "_blank")}
          className="bg-green-500 text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-green-600 transition"
        >
          Chamar no WhatsApp
        </button>
      </section>
    </div>
  );
}

export default Home;