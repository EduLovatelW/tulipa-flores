import { useState } from "react";
import { supabase } from "../services/supabase";
import { verificarHorario } from "../components/AvisoFechado";

function Checkout({ carrinho, onNavegar, onFinalizarPedido }) {
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    tipoEntrega: "entrega",
    endereco: "",
    pagamento: "pix",
    observacao: "",
  });
  const [salvando, setSalvando] = useState(false);

  const subtotal = carrinho.reduce((acc, item) => acc + Number(item.preco) * item.quantidade, 0);
  const frete = form.tipoEntrega === "entrega" ? 15 : 0;
  const total = subtotal + frete;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    if (!verificarHorario()) {
      alert("Fora do horario de atendimento!\n\nAtendemos:\nManha: 08:30 - 12:00\nTarde: 13:00 - 18:00");
      return;
    }
    if (!form.nome || !form.telefone) {
      alert("Por favor preencha seu nome e telefone!");
      return;
    }
    if (form.tipoEntrega === "entrega" && !form.endereco) {
      alert("Por favor preencha o endereco de entrega!");
      return;
    }

    setSalvando(true);

    try {
      const { data: pedidoSalvo, error: erroPedido } = await supabase
        .from("pedidos")
        .insert({
          cliente_nome: form.nome,
          cliente_telefone: form.telefone,
          tipo_entrega: form.tipoEntrega,
          endereco: form.endereco,
          pagamento: form.pagamento,
          observacao: form.observacao,
          total: total,
          status: "pendente",
        })
        .select()
        .single();

      if (erroPedido) throw erroPedido;

      const itens = carrinho.flatMap((item) =>
        Array.from({ length: item.quantidade }, () => ({
          pedido_id: pedidoSalvo.id,
          produto_nome: item.nome,
          produto_emoji: item.emoji,
          preco: item.preco,
        }))
      );

      const { error: erroItens } = await supabase
        .from("itens_pedido")
        .insert(itens);

      if (erroItens) throw erroItens;

      onFinalizarPedido(form, total);
      onNavegar("confirmacao");
    } catch (erro) {
      console.error("Erro ao salvar pedido:", erro);
      alert("Erro ao salvar pedido. Tente novamente!");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-pink-700 mb-2">Finalizar Pedido</h2>
        <p className="text-gray-500">Preencha seus dados para concluir a compra</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 flex flex-col gap-6">

          {/* Dados pessoais */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-bold text-gray-700 mb-4">Seus Dados</h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Nome completo</label>
                <input
                  type="text"
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  placeholder="Seu nome"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
                />
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Telefone / WhatsApp</label>
                <input
                  type="text"
                  name="telefone"
                  value={form.telefone}
                  onChange={handleChange}
                  placeholder="(46) 99999-9999"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
                />
              </div>
            </div>
          </div>

          {/* Entrega */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-bold text-gray-700 mb-4">Entrega ou Retirada?</h3>
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => setForm({ ...form, tipoEntrega: "entrega" })}
                className={`flex-1 py-4 rounded-xl font-semibold border-2 transition ${
                  form.tipoEntrega === "entrega"
                    ? "border-pink-600 bg-pink-50 text-pink-600"
                    : "border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
              >
                <div className="text-2xl mb-1">🚗</div>
                <div>Entrega</div>
                <div className="text-xs font-normal">R$ 15,00</div>
              </button>
              <button
                onClick={() => setForm({ ...form, tipoEntrega: "retirada" })}
                className={`flex-1 py-4 rounded-xl font-semibold border-2 transition ${
                  form.tipoEntrega === "retirada"
                    ? "border-pink-600 bg-pink-50 text-pink-600"
                    : "border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
              >
                <div className="text-2xl mb-1">🏪</div>
                <div>Retirar na Loja</div>
                <div className="text-xs font-normal">Gratis</div>
              </button>
            </div>

            {form.tipoEntrega === "entrega" && (
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Endereco de entrega</label>
                <input
                  type="text"
                  name="endereco"
                  value={form.endereco}
                  onChange={handleChange}
                  placeholder="Rua, numero, bairro - Pato Branco/PR"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400"
                />
              </div>
            )}
          </div>

          {/* Pagamento */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-bold text-gray-700 mb-4">Forma de Pagamento</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { valor: "pix", label: "Pix", emoji: "💠" },
                { valor: "cartao", label: "Cartao", emoji: "💳" },
                { valor: "dinheiro", label: "Dinheiro", emoji: "💵" },
              ].map((op) => (
                <button
                  key={op.valor}
                  onClick={() => setForm({ ...form, pagamento: op.valor })}
                  className={`py-4 rounded-xl font-semibold border-2 transition ${
                    form.pagamento === op.valor
                      ? "border-pink-600 bg-pink-50 text-pink-600"
                      : "border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  <div className="text-2xl mb-1">{op.emoji}</div>
                  <div>{op.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Observacao */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-bold text-gray-700 mb-4">Observacoes</h3>
            <textarea
              name="observacao"
              value={form.observacao}
              onChange={handleChange}
              placeholder="Mensagem no cartao? Preferencia de cor? Horario de entrega?"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 h-28 resize-none"
            />
          </div>
        </div>

        {/* Resumo */}
        <div className="bg-white rounded-2xl shadow p-6 h-fit sticky top-24">
          <h3 className="text-xl font-bold text-gray-700 mb-4">Resumo</h3>

          <div className="flex flex-col gap-2 mb-4">
            {carrinho.map((item) => (
              <div key={item.id} className="flex justify-between text-sm text-gray-500">
                <span className="truncate mr-2">
                  {item.nome}
                  {item.quantidade > 1 && (
                    <span className="text-gray-400 ml-1">×{item.quantidade}</span>
                  )}
                </span>
                <span className="flex-shrink-0">
                  R$ {(Number(item.preco) * item.quantidade).toFixed(2).replace(".", ",")}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 flex flex-col gap-2 mb-6">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Frete</span>
              <span>{frete === 0 ? "Gratis" : "R$ 15,00"}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-gray-700 mt-2">
              <span>Total</span>
              <span className="text-pink-600">R$ {total.toFixed(2).replace(".", ",")}</span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={salvando}
            className="w-full bg-pink-600 text-white py-3 rounded-full font-semibold hover:bg-pink-700 transition shadow-md disabled:opacity-50 mb-3"
          >
            {salvando ? "Salvando..." : "Confirmar Pedido"}
          </button>

          <button
            onClick={() => onNavegar("carrinho")}
            className="w-full text-pink-600 border border-pink-300 py-3 rounded-full font-semibold hover:bg-pink-50 transition"
          >
            Voltar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;