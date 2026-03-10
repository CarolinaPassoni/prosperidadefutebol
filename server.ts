import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
import cors from "cors";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cors());

  console.log("Iniciando servidor...");
  console.log("RESEND_API_KEY presente:", !!process.env.RESEND_API_KEY);

  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

  // API routes
  app.post("/api/membership", async (req, res) => {
    const { name, email, plan, cpf, whatsapp } = req.body;

    console.log(`Nova solicitação recebida: ${name} (${email})`);

    if (!resend) {
      console.error("ERRO: RESEND_API_KEY não encontrada no ambiente.");
      return res.status(500).json({ error: "Configuração de e-mail ausente no servidor." });
    }

    try {
      console.log("Tentando enviar e-mail para o clube...");
      const { data: clubData, error: clubError } = await resend.emails.send({
        from: "Prosperidade FC <onboarding@resend.dev>",
        to: "prosperidadefutebolclube@gmail.com",
        subject: `Nova Solicitação de Sócio: ${name}`,
        html: `
          <h1>Nova Solicitação de Sócio-Torcedor</h1>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Plano:</strong> ${plan}</p>
          <p><strong>CPF:</strong> ${cpf}</p>
          <p><strong>WhatsApp:</strong> ${whatsapp}</p>
        `,
      });

      if (clubError) {
        console.error("Erro ao enviar e-mail para o clube:", clubError);
      } else {
        console.log("E-mail enviado para o clube com sucesso:", clubData);
      }

      // Tentativa de enviar para o usuário (pode falhar no modo Sandbox do Resend)
      console.log(`Tentando enviar e-mail de confirmação para o torcedor: ${email}`);
      const { data: userData, error: userError } = await resend.emails.send({
        from: "Prosperidade FC <onboarding@resend.dev>",
        to: email,
        subject: "Sua solicitação de Sócio-Torcedor foi recebida!",
        html: `
          <h1>Olá, ${name}!</h1>
          <p>Recebemos sua solicitação para o <strong>${plan}</strong> do Prosperidade FC.</p>
          <p>Nossa equipe entrará em contato em breve via WhatsApp (${whatsapp}) para finalizar seu cadastro e enviar as instruções de pagamento.</p>
          <br/>
          <p>Saudações Alvinegras!</p>
          <p><strong>Prosperidade Futebol Clube</strong></p>
        `,
      });

      if (userError) {
        console.warn("Aviso: Não foi possível enviar e-mail para o torcedor (provavelmente restrição de Sandbox do Resend):", userError.message);
      } else {
        console.log("E-mail de confirmação enviado para o torcedor:", userData);
      }

      // Retornamos sucesso se pelo menos o processo foi concluído, 
      // mesmo que o e-mail do usuário falhe por restrições de teste.
      res.json({ success: true });
    } catch (error: any) {
      console.error("Erro detalhado ao enviar email:", error);
      res.status(500).json({ 
        error: "Erro ao processar solicitação", 
        details: error?.message || error 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
