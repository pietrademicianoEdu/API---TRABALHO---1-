🎬 API de Catálogo de Filmes - Trabalho 2Esta API foi desenvolvida como parte do Trabalho 1, focada na implementação de operações de consulta (GET) e criação (POST) de recursos, com sistema de validação robusto e persistência em memória.📌 Lista de EndpointsMétodoURLDescriçãoGET/api/filmesLista filmes com paginação (padrão 5 por página).GET/api/filmes/:idBusca um filme específico pelo ID.POST/api/filmesAdiciona um novo filme à lista (com validações).🚀 Detalhamento dos Endpoints1. Listagem Geral (GET)URL: http://localhost:3000/api/filmesParâmetros de Query (Opcionais): pagina, limite, genero, ordenar.Resposta de Sucesso: 200 OKExemplo de Resposta:JSON{
  "total": 15,
  "pagina": 1,
  "dados": [...]
}
2. Cadastro de Filme (POST)URL: http://localhost:3000/api/filmesCorpo da Requisição (Body JSON):JSON{
  "titulo": "Batman: O Cavaleiro das Trevas",
  "diretor": "Christopher Nolan",
  "ano": 2008,
  "genero": "Ação",
  "nota": 9.0
}
Resposta de Sucesso: 201 Created✅ Validações ImplementadasPara garantir a integridade dos dados (conforme ensinado nos slides do professor), o endpoint POST executa as seguintes verificações:Campos Obrigatórios: Verifica se titulo, diretor, ano, genero e nota estão presentes. Caso contrário, retorna 400 Bad Request.Tipo de Dado: Valida se ano e nota são números.Regra de Negócio (Nota): A nota deve ser obrigatoriamente um valor entre 0 e 10.Tamanho Mínimo: O título do filme deve conter pelo menos 2 caracteres.🧪 Testes de Verificação (Postman)Criar Recurso (Sucesso 201)Demonstração da criação do filme "Batman", gerando o ID 11 e confirmando o recebimento dos dados.Verificação de Persistência (GET)Após a criação de 5 novos recursos via POST, a chamada GET abaixo confirma que o total de itens subiu para 15.🛠️ Como executarCertifique-se de ter o Node.js instalado.Execute npm install para instalar as dependências (Express).Inicie o servidor com node index.js.Importe a Collection do Postman inclusa no repositório para testar.