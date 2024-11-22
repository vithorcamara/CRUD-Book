const connection = require('./connection'); // Importa o módulo de conexão com o banco de dados.

const getAllItems = async () => {
    try {
        const query = 'SELECT * FROM crud1_start.book'; // Define a query SQL para buscar todos os registros da tabela `book` dentro do banco de dados `crud1_start`.
        const [rows] = await connection.execute(query); // Executa a consulta SQL e armazena o resultado em `rows`.
        return rows; // Retorna as linhas resultantes da consulta.
    } catch (e) {
        throw new Error(`Erro ao buscar itens: ${e.message}`); // Lança um erro personalizado caso ocorra alguma falha ao buscar os itens.
    }
};

const addItem = async (title, author) => {
    try {
        const query = 'INSERT INTO book (title, author) VALUES (?, ?)'; // Define a query SQL para inserir um novo registro na tabela `book` com os valores de `title` e `author`.
        const item = await connection.execute(query, [title, author]); // Executa a consulta com os valores passados como parâmetros, protegendo contra SQL Injection.
        return item; // Retorna o resultado da operação (geralmente informações como o ID do registro inserido).
    } catch (e) {
        throw new Error(`Erro ao adicionar item: ${e.message}`); // Lança um erro personalizado caso ocorra falha ao adicionar o item.
    }
};

const updtItem = async (id, title, author) => {
    try {
        const query = "UPDATE book SET title = ?, author = ? WHERE id = ?"; // Define a query SQL para atualizar os valores de `title` e `author` de um registro específico pelo `id`.
        const values = [title, author, id]; // Define os valores que serão passados como parâmetros para a query.
        const [item] = await connection.execute(query, values); // Executa a consulta com os valores, protegendo contra SQL Injection.
        return item; // Retorna o resultado da operação (como o número de linhas afetadas).
    } catch (error) {
        throw new Error(`Erro ao atualizar item: ${error.message}`); // Lança um erro personalizado caso ocorra falha na atualização do item.
    }
};

const delItem = async (id) => {
    try {
        const query = "DELETE FROM book WHERE id = ?"; // Define a query SQL para deletar um registro da tabela `book` com base no `id`.
        const values = [id]; // Define os valores que serão passados como parâmetros para a query.
        const [item] = await connection.execute(query, values); // Executa a consulta com o valor do ID passado como parâmetro.
        return item; // Retorna o resultado da operação (como o número de linhas afetadas).
    } catch (error) {
        throw new Error(`Erro ao excluir item: ${error.message}`); // Lança um erro personalizado caso ocorra falha na exclusão do item.
    }
};

module.exports = { getAllItems, addItem, updtItem, delItem }; // Exporta as funções definidas para serem usadas em outros módulos do projeto.