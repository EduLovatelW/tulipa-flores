import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id, disponivel } = req.body;

  if (id === undefined || disponivel === undefined) {
    return res.status(400).json({ error: "id e disponivel são obrigatórios" });
  }

  const { error } = await supabase
    .from("produtos")
    .update({ disponivel: Boolean(disponivel) })
    .eq("id", id);

  if (error) {
    console.error("Erro ao atualizar produto:", error);
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ ok: true });
}
