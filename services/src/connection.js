const mysql = require('mysql2/promise') // Importando o módulo mysql2/promise para usar a API baseada em Promises do MySQL

const connection = mysql.createPool({ // Criando um pool de conexões com o banco
    host: 'localhost' ,// Definindo o host do banco
    port: 3306, // Definindo a porta de comunicação do MySQL
    user: 'root', // Definindo o usuário do banco
    password: '', // Definindo a senha do banco
    database: 'crud1_start' // Definindo o nome do banco de dados ao qual se conectar
})

module.exports = connection // Exportando o pool de conexões para que possa ser usado em outras partes do código
