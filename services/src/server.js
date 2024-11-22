const express = require('express'); // Importa o framework Express para criar a aplicação web.
const cors = require('cors'); // Importa o middleware CORS para permitir acesso entre diferentes origens.
const { getAllItems, addItem, updtItem, delItem } = require('./allItems'); // Importa funções definidas no módulo 'allItems' para manipular os dados.

const app = express(); // Inicializa a aplicação Express.
app.use(express.json()); // Middleware para interpretar requisições com payload em JSON.
app.use(cors()); // Habilita CORS para todas as rotas, permitindo acesso de outras origens.

const PORT = 3003; // Define a porta onde o servidor será executado.
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Loga uma mensagem quando o servidor é iniciado.
});

app.get('/', async (req, res) => { // Rota GET para buscar todos os itens.
    try {
        const items = await getAllItems(); // Chama a função para buscar todos os itens.
        res.status(200).json(items); // Retorna os itens com status 200 (sucesso).
    } catch (e) {
        res.status(500).json({ error: e.message }); // Retorna erro com status 500 caso algo dê errado.
    }
});

app.post('/add', async (req, res) => { // Rota POST para adicionar um novo item.
    const { title, author } = req.body; // Extrai `title` e `author` do corpo da requisição.

    if (!title || !author) { // Verifica se os campos obrigatórios estão presentes.
        return res.status(400).json({ error: 'Título e Autor são obrigatórios' }); // Retorna erro 400 se faltar algo.
    }

    try {
        const item = await addItem(title, author); // Adiciona o item chamando a função `addItem`.
        res.status(201).json(item); // Retorna o item adicionado com status 201 (criado).
    } catch (e) {
        res.status(500).json({ error: e.message }); // Retorna erro 500 em caso de falha.
    }
});

app.put('/update/:id', async (req, res) => { // Rota PUT para atualizar um item pelo ID.
    const { id } = req.params; // Extrai o ID dos parâmetros da URL.
    const { title, author } = req.body; // Extrai `title` e `author` do corpo da requisição.

    try {
        const item = await updtItem(id, title, author); // Chama a função para atualizar o item.
        if (item.affectedRows === 0) { // Verifica se algum registro foi alterado.
            return res.status(404).json({ error: 'Item não encontrado' }); // Retorna erro 404 se o ID não existir.
        }
        res.status(200).json(item); // Retorna o item atualizado com status 200.
    } catch (error) {
        res.status(500).json({ error: error.message }); // Retorna erro 500 em caso de falha.
    }
});

app.delete('/delete/:id', async (req, res) => { // Rota DELETE para excluir um item pelo ID.
    const { id } = req.params; // Extrai o ID dos parâmetros da URL.

    try {
        const item = await delItem(id); // Chama a função para excluir o item.
        if (item.affectedRows === 0) { // Verifica se algum registro foi excluído.
            return res.status(404).json({ error: 'Item não encontrado' }); // Retorna erro 404 se o ID não existir.
        }
        res.status(200).json(item); // Retorna o item excluído com status 200.
    } catch (e) {
        res.status(500).json({ error: e.message }); // Retorna erro 500 em caso de falha.
    }
});
