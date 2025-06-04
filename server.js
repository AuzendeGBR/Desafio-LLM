const express = require('express');
const { askLLM } = require('./services/llmService');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/perguntar', async (req, res) => {
  const { pergunta } = req.body;

  if (!pergunta) {
    return res.status(400).json({ error: "Pergunta é obrigatória." });
  }

  try {
    const resposta = await askLLM(`Responda no contexto de séries de terror: ${pergunta}`);
    res.json({ resposta });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao consultar LLM." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
