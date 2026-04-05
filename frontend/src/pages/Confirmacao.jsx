function Confirmacao({ pedido, onNavegar }) {
  if (!pedido) {
    onNavegar("home");
    return null;
  }

  const { form, total, itens } = pedido;

  function enviarWhatsApp() {
    const itensTxt = itens
      .map((item) => `• ${item.nome} — R$ ${item.preco.toFixed(2).replace(".", ",")}`)
      .join("\n");

    const mensagem = `
🌸 *Novo Pedido — Tulipa Flores* 🌸

*Cliente:* ${form.nome}
*Telefone:* ${form.telefone}

*Itens:*
${itensTxt}

*Entrega:* ${form.tipoEntrega === "entrega" ? `Entrega — ${form.endereco}` : "Retirada na loja"}
*Pagamento:* ${form.pagamento}
*Total:* R$ ${total.toFixed(2).replace(".", ",")}

${form.observacao ? `*Observações:* ${form.observacao}` : ""}
    `.trim();

    const numero = "5546932251035";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
  }

  return (
    <div className="max-w-lg mx-auto text-center py-10">
      {/* Ícone de sucesso */}
      <div className="text-7xl mb-4">🌸</div>
      <h2 className="text-3xl font-bold text-pink-700 mb-2">Pedido Confirmado!</h2>
      <p className="text-gray-500 mb-8">
        Agora é só enviar seu pedido para a gente pelo WhatsApp e aguardar a confirmação!
      </p>

      {/* Resumo */}
      <div className="bg-white rounded-2xl shadow p-6 text-left mb-6">
        <h3 className="font-bold text-gray-700 mb-4">Resumo do Pedido</h3>

        <div className="flex flex-col gap-2 mb-4">
          {itens.map((item, index) => (
            <div key={index} className="flex justify-between text-sm text-gray-600">
              <span>{item.nome}</span>
              <span>R$ {item.preco.toFixed(2).replace(".", ",")}</span>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 flex flex-col gap-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Entrega</span>
            <span>{form.tipoEntrega === "entrega" ? "R$ 15,00" : "Retirada — Grátis"}</span>
          </div>
          {form.tipoEntrega === "entrega" && (
            <div className="flex justify-between">
              <span>Endereço</span>
              <span className="text-right max-w-xs">{form.endereco}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Pagamento</span>
            <span className="capitalize">{form.pagamento}</span>
          </div>
          <div className="flex justify-between font-bold text-base text-gray-700 mt-2">
            <span>Total</span>
            <span className="text-pink-600">R$ {total.toFixed(2).replace(".", ",")}</span>
          </div>
        </div>
      </div>

      {/* Botão WhatsApp */}
      <button
        onClick={enviarWhatsApp}
        className="w-full bg-green-500 text-white py-4 rounded-full text-lg font-bold hover:bg-green-600 transition flex items-center justify-center gap-2 mb-4"
      >
        <span>📲</span> Enviar Pedido pelo WhatsApp
      </button>

      <button
        onClick={() => onNavegar("home")}
        className="w-full border border-pink-300 text-pink-600 py-3 rounded-full font-semibold hover:bg-pink-50 transition"
      >
        Voltar ao Início
      </button>
    </div>
  );
}

export default Confirmacao;