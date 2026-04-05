export function verificarHorario() {
  const agora = new Date();
  const hora = agora.getHours();
  const minuto = agora.getMinutes();
  const totalMinutos = hora * 60 + minuto;

  const aberturaManha = 8 * 60 + 30;
  const fechaManha = 12 * 60;
  const aberturaTarde = 13 * 60;
  const fechaTarde = 18 * 60;

  return (
    (totalMinutos >= aberturaManha && totalMinutos < fechaManha) ||
    (totalMinutos >= aberturaTarde && totalMinutos < fechaTarde)
  );
}

function AvisoFechado() {
  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-5 py-3 rounded-2xl shadow-lg text-sm z-50 max-w-xs">
      <p className="font-bold mb-1">Fora do horario de atendimento</p>
      <p className="text-gray-300">08:30 - 12:00 e 13:00 - 18:00</p>
      <p className="text-gray-400 text-xs mt-1">Voce pode montar seu carrinho, mas nao podera finalizar o pedido agora.</p>
    </div>
  );
}

export default AvisoFechado;