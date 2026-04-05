import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const STATUS_VALIDOS = ["pendente", "em_preparo", "saiu_entrega", "entregue", "cancelado"];

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id, status } = req.body;

  if (!id || !status) {
    return res.status(400).json({ error: "id e status são obrigatórios" });
  }

  if (!STATUS_VALIDOS.includes(status)) {
    return res.status(400).json({ error: "Status inválido" });
  }

  const { error } = await supabase
    .from("pedidos")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Erro ao atualizar status:", error);
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ ok: true });
}
