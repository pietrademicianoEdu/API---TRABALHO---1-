const express = require('express');
const app = express();

app.use(express.json());

// 1. Array com 10 itens iniciais (Campos: id, titulo, diretor, ano, genero, nota)
let filmes = [
    { id: 1, titulo: "Inception", diretor: "Christopher Nolan", ano: 2010, genero: "Sci-Fi", nota: 8.8 },
    { id: 2, titulo: "The Matrix", diretor: "Lana Wachowski", ano: 1999, genero: "Sci-Fi", nota: 8.7 },
    { id: 3, titulo: "O Poderoso Chefão", diretor: "Francis Ford Coppola", ano: 1972, genero: "Crime", nota: 9.2 },
    { id: 4, titulo: "Pulp Fiction", diretor: "Quentin Tarantino", ano: 1994, genero: "Crime", nota: 8.9 },
    { id: 5, titulo: "Interestelar", diretor: "Christopher Nolan", ano: 2014, genero: "Sci-Fi", nota: 8.7 },
    { id: 6, titulo: "Parasita", diretor: "Bong Joon-ho", ano: 2019, genero: "Drama", nota: 8.5 },
    { id: 7, titulo: "Cidade de Deus", diretor: "Fernando Meirelles", ano: 2002, genero: "Drama", nota: 8.6 },
    { id: 8, titulo: "O Cavaleiro das Trevas", diretor: "Christopher Nolan", ano: 2008, genero: "Ação", nota: 9.0 },
    { id: 9, titulo: "Clube da Luta", diretor: "David Fincher", ano: 1999, genero: "Drama", nota: 8.8 },
    { id: 10, titulo: "O Auto da Compadecida", diretor: "Guel Arraes", ano: 2000, genero: "Comédia", nota: 8.7 }
];

let proximoId = 11;

// Listar todos + Filtros + Ordenação + Paginação
app.get('/api/filmes', (req, res) => {
    let resultado = [...filmes];
    const { genero, ordenar, ordem, pagina = 1, limite = 5 } = req.query;

    // A. Filtrar por gênero
    if (genero) {
        resultado = resultado.filter(f => f.genero.toLowerCase() === genero.toLowerCase());
    }

    // B. Ordenar por título ou nota
    if (ordenar === 'titulo' || ordenar === 'nota') {
        resultado.sort((a, b) => {
            if (ordem === 'desc') {
                return a[ordenar] < b[ordenar] ? 1 : -1;
            }
            return a[ordenar] > b[ordenar] ? 1 : -1;
        });
    }

    // C. Paginação
    const inicio = (pagina - 1) * limite;
    const fim = pagina * limite;
    const paginado = resultado.slice(inicio, fim);

    res.json({
        total: resultado.length,
        pagina: Number(pagina),
        dados: paginado
    });
});

// Buscar por ID
app.get('/api/filmes/:id', (req, res) => {
    const filme = filmes.find(f => f.id === parseInt(req.params.id));
    if (!filme) return res.status(404).json({ erro: "Filme não encontrado" });
    res.json(filme);
});

// Endpoint POST (conforme ensinado nos slides)
app.post('/api/filmes', (req, res) => {
    // 1. Extrair dados do body
    const { titulo, diretor, ano, genero, nota } = req.body;

    // 2. VALIDAÇÃO: Campos obrigatórios (Slide 5)
    if (!titulo || !diretor || !ano || !genero || !nota) {
        return res.status(400).json({ 
            erro: "Campos obrigatórios: titulo, diretor, ano, genero e nota" 
        });
    }

    // 3. VALIDAÇÃO: Tipo de dado (Ano e Nota devem ser números)
    if (typeof ano !== 'number' || typeof nota !== 'number') {
        return res.status(400).json({ 
            erro: "Ano e Nota devem ser valores numéricos" 
        });
    }

    // 4. VALIDAÇÃO: Regra de negócio (Ano não pode ser no futuro)
    if (ano > 2026 || ano < 1895) {
        return res.status(400).json({ 
            erro: "Ano inválido (deve ser entre 1895 e 2026)" 
        });
    }

    // 5. VALIDAÇÃO: Tamanho mínimo do título
    if (titulo.length < 2) {
        return res.status(400).json({ 
            erro: "O título deve ter pelo menos 2 caracteres" 
        });
    }

    // 6. Se passou em tudo, criar o objeto
    const novoFilme = {
        id: proximoId++,
        titulo,
        diretor,
        ano,
        genero,
        nota
    };

    filmes.push(novoFilme);

    // 7. Retornar sucesso com status 201 (Slide 4)
    res.status(201).json(novoFilme);
});

app.listen(3000, () => console.log("API rodando em http://localhost:3000"));
