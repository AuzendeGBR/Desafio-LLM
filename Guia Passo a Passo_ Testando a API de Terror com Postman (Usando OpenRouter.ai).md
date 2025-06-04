# Guia Passo a Passo: Testando a API de Terror com Postman (Usando OpenRouter.ai)

Este guia detalha como configurar e testar a API backend que consulta um LLM sobre séries de terror, agora utilizando a API do OpenRouter.ai, através do Postman.

## Pré-requisitos

1.  **Node.js:** Certifique-se de ter o Node.js instalado em sua máquina. Você pode baixá-lo em [https://nodejs.org/](https://nodejs.org/).
2.  **Postman:** Instale o aplicativo Postman. Você pode obtê-lo em [https://www.postman.com/downloads/](https://www.postman.com/downloads/).
3.  **Chave da API OpenRouter.ai:** Você precisará de uma chave de API do OpenRouter. Crie uma conta e gere uma chave em [https://openrouter.ai/keys](https://openrouter.ai/keys).

## Configuração do Projeto

1.  **Navegue até o Diretório:** Abra seu terminal ou prompt de comando e navegue até a pasta onde você descompactou o projeto (a versão mais recente que usa OpenRouter), especificamente para o diretório que contém `server.js`.

    ```bash
    cd caminho/para/seu/projeto
    ```

2.  **Configure a Chave da API:**
    *   Localize o arquivo `.env` dentro da pasta do projeto.
    *   Abra este arquivo em um editor de texto.
    *   Substitua a linha `OPENROUTER_API_KEY=COLOQUE_SUA_CHAVE_DA_OPENROUTER_AQUI` pela sua chave real do OpenRouter. O arquivo deve ficar assim (substitua `sua_chave_real_aqui`):

        ```
        OPENROUTER_API_KEY=sua_chave_real_aqui
        ```
    *   **Importante:** Salve o arquivo `.env`. Sem uma chave válida, a API não conseguirá consultar o LLM e retornará um erro.

3.  **Instale as Dependências (Opcional, mas recomendado):** Se você ainda não o fez ou se é uma nova pasta, execute no terminal para garantir que todas as dependências (Express, Axios, Dotenv) estejam instaladas:

    ```bash
    npm install
    ```

4.  **Inicie o Servidor:** No mesmo terminal, execute o seguinte comando para iniciar o servidor da API:

    ```bash
    node server.js
    ```

    Você deverá ver a mensagem: `Servidor rodando em http://localhost:3000`. Mantenha este terminal aberto enquanto testa com o Postman.

## Testando com o Postman

1.  **Abra o Postman:** Inicie o aplicativo Postman.

2.  **Crie uma Nova Requisição:**
    *   Clique em `New` (Novo) ou no ícone `+` para abrir uma nova aba de requisição.

3.  **Configure a Requisição:**
    *   Altere o método HTTP para `POST`.
    *   No campo da URL, insira: `http://localhost:3000/perguntar`

4.  **Configure o Corpo da Requisição (Body):**
    *   Vá para a aba `Body` (Corpo).
    *   Selecione a opção `raw`.
    *   No menu dropdown à direita, selecione `JSON`.
    *   No campo de texto abaixo, insira o corpo da sua pergunta em formato JSON. Por exemplo:

        ```json
        {
          "pergunta": "Qual o filme de terror mais subestimado dos anos 80?"
        }
        ```
        Você pode alterar o valor da chave `"pergunta"` para fazer diferentes consultas.

5.  **Envie a Requisição:**
    *   Clique no botão `Send` (Enviar).

6.  **Analise a Resposta:**
    *   **Sucesso:** Se tudo correr bem (servidor rodando, chave válida, LLM respondeu), você verá uma resposta no painel inferior do Postman com status `200 OK`. O corpo da resposta será um JSON contendo a resposta do LLM, formatada para o contexto de terror:

        ```json
        {
          "resposta": "No contexto de filmes de terror subestimados dos anos 80, 'Prince of Darkness' (Príncipe das Sombras) de John Carpenter é frequentemente citado. Ele combina horror cósmico e elementos científicos de uma forma única e atmosférica."
        }
        ```
        *(Nota: A resposta exata do LLM pode variar dependendo do modelo configurado e da pergunta)*

    *   **Erro (Pergunta Faltando):** Se você não enviar a chave `"pergunta"` no corpo JSON, receberá um status `400 Bad Request` com a mensagem:

        ```json
        {
          "error": "Pergunta é obrigatória."
        }
        ```

    *   **Erro (Falha no LLM / OpenRouter):** Se houver um problema ao consultar o LLM via OpenRouter (por exemplo, chave inválida, modelo incorreto, problema na API do OpenRouter, quota excedida, timeout), você receberá um status `500 Internal Server Error` com a mensagem:

        ```json
        {
          "error": "Erro ao consultar LLM via OpenRouter."
        }
        ```
        Verifique sua chave no arquivo `.env`, se o modelo configurado em `llmService.js` é válido no OpenRouter, e se o servidor Node.js ainda está rodando sem erros no terminal (o terminal pode mostrar mais detalhes sobre o erro específico da API).

## Parando o Servidor

Quando terminar de testar, volte ao terminal onde o servidor Node.js está rodando e pressione `Ctrl + C` para pará-lo.

