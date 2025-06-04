const axios = require("axios");
require("dotenv").config(); // Certifique-se que dotenv está configurado no início

// Lê a chave da API do OpenRouter do arquivo .env
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// URL da API de Chat Completions do OpenRouter
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

// Modelo que você deseja usar no OpenRouter (ex: um modelo gratuito ou de baixo custo)
// Verifique os modelos disponíveis em https://openrouter.ai/docs#models
const MODEL_NAME = "mistralai/mistral-7b-instruct:free"; // Exemplo de modelo gratuito

const gerarResposta = async (pergunta) => {
  // Monta o prompt específico para o contexto de terror
  const promptContextualizado = `Responda estritamente no contexto de séries e filmes de terror: ${pergunta}`;

  if (!OPENROUTER_API_KEY) {
    console.error("Erro: Chave da API do OpenRouter não encontrada no arquivo .env");
    throw new Error("Chave da API não configurada.");
  }

  try {
    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: MODEL_NAME,
        messages: [
          { role: "system", content: "Você é um assistente especializado em séries e filmes de terror." },
          { role: "user", content: promptContextualizado }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          // Opcional, mas recomendado pelo OpenRouter:
          // "HTTP-Referer": "YOUR_SITE_URL", // Substitua pela URL do seu site/app se aplicável
          // "X-Title": "TerrorLLMApp" // Substitua pelo nome do seu app
        },
        timeout: 30000 // 30 segundos
      }
    );

    // Extrai a resposta do modelo da estrutura de dados do OpenRouter
    const resposta = response.data?.choices?.[0]?.message?.content;

    if (!resposta) {
      console.error("Resposta inesperada ou vazia da API OpenRouter:", response.data);
      throw new Error("Resposta vazia ou inválida da LLM via OpenRouter.");
    }

    return resposta.trim();

  } catch (error) {
    // Log detalhado do erro
    if (error.response) {
      // A requisição foi feita e o servidor respondeu com um status code fora do range 2xx
      console.error("Erro ao consultar LLM (OpenRouter):", error.response.status, error.response.data);
    } else if (error.request) {
      // A requisição foi feita mas nenhuma resposta foi recebida
      console.error("Erro ao consultar LLM (OpenRouter): Nenhuma resposta recebida", error.request);
    } else {
      // Algo aconteceu ao configurar a requisição que disparou um erro
      console.error("Erro ao consultar LLM (OpenRouter): Erro na configuração da requisição", error.message);
    }
    throw new Error("Erro ao consultar LLM via OpenRouter.");
  }
};

// Mantém a exportação como askLLM para compatibilidade com server.js
module.exports = { askLLM: gerarResposta };

