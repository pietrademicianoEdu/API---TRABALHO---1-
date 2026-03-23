# 🎬 API de Catálogo de Filmes - Trabalho 1

Este projeto é uma API REST desenvolvida com Node.js e Express para gerenciar um catálogo de filmes. O projeto contempla operações de listagem, filtragem, ordenação, paginação e criação de recursos com validações.

## 🚀 Como Executar o Projeto

1. Clone o repositório.
2. No terminal, execute: `npm install`
3. Inicie o servidor: `node index.js`
4. A API estará disponível em: `http://localhost:3000`

## 📌 Endpoints

### 1. Listar Filmes (GET)
Retorna a lista de filmes com suporte a filtros e paginação.
* **URL:** `/api/filmes`
* **Query Params (Opcionais):**
    * `genero`: Filtra por gênero (ex: `Sci-Fi`).
    * `ordenar`: Ordena por `titulo` ou `nota`.
    * `ordem`: `asc` ou `desc`.
    * `pagina`: Número da página (padrão: 1).

### 2. Buscar por ID (GET)
* **URL:** `/api/filmes/:id`

### 3. Criar Filme (POST)
* **URL:** `/api/filmes`
* **Body:** JSON com `titulo`, `diretor`, `ano`, `genero`, `nota`.
* **Validações:** Todos os campos são obrigatórios.

## 🛠️ Validações Implementadas
Conforme os requisitos do professor, o endpoint POST valida:
1. **Presença de Campos:** Verifica se todos os campos obrigatórios foram enviados.
2. **Status Code:** Retorna `201 Created` para sucesso e `400 Bad Request` para erros de entrada.

## 🧪 Testes Realizados
As capturas de tela dos testes realizados no Postman estão anexadas na pasta `/screenshots` (ou descritas no documento de entrega).