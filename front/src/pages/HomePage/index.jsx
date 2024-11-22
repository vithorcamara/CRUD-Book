import { useState, useEffect } from 'react'; // Importa hooks do React para gerenciar estado e efeitos colaterais.
import './style.css'; // Importa o arquivo CSS para estilizar o componente.
import api from '../../api.js'; // Importa a instância configurada da API para fazer requisições.

export default function HomePage() { // Declara o componente principal da página.
    const [title, setTitle] = useState(''); // Gerencia o estado do título do livro.
    const [author, setAuthor] = useState(''); // Gerencia o estado do autor do livro.
    const [books, setBooks] = useState([]); // Armazena a lista de livros.
    const [editItem, setEditItem] = useState(null); // Armazena o item que está sendo editado.

    // Função para buscar livros da API
    const fetchBooks = async () => { 
        try {
            const response = await api.get(); // Faz uma requisição GET para buscar os livros.
            setBooks(response.data); // Atualiza o estado com os livros retornados.
        } catch (e) {
            alert(`Não foi possível buscar dados! ERRO[${e}]`); // Loga erro caso a requisição falhe.
        }
    };

    const handleSubmit = async (e) => { // Gerencia o envio do formulário (inserção ou atualização de livros).
        e.preventDefault(); // Evita o comportamento padrão de recarregar a página.
        const newBook = { title, author }; // Cria um objeto com os dados do livro.

        try {
            if (editItem) { // Se há um item em edição:
                await api.put(`/update/${editItem.ID}`, newBook); // Atualiza o livro na API.
                alert('Livro atualizado!'); // Mostra mensagem de sucesso.
            } else { // Caso contrário:
                await api.post('/add', newBook); // Adiciona um novo livro na API.
                alert('Livro inserido!'); // Mostra mensagem de sucesso.
            }
            setTitle(''); // Limpa o campo de título.
            setAuthor(''); // Limpa o campo de autor.
            setEditItem(null); // Reseta o item em edição.
            fetchBooks(); // Atualiza a lista de livros.
        } catch (e) {
            alert(`Erro ao salvar o livro: ${e.message}`); // Mostra mensagem de erro.
        }
    };
    
    const handleDelete = async (id) => { // Gerencia a exclusão de um livro.
        try {
            await api.delete(`/delete/${id}`); // Faz uma requisição DELETE para a API.
            alert('Livro excluído!'); // Mostra mensagem de sucesso.
            fetchBooks(); // Atualiza a lista de livros.
        } catch (e) {
            alert(`Erro ao excluir o livro: ${e.message}`); // Mostra mensagem de erro.
        }
    };    
    
    const handleEdit = (book) => { // Prepara um item para ser editado.
        setTitle(book.title); // Preenche o título no formulário.
        setAuthor(book.author); // Preenche o autor no formulário.
        setEditItem(book); // Define o item como o atual em edição.
    };
    
    useEffect(() => { // Executa um efeito colateral ao carregar o componente.
        fetchBooks(); // Busca a lista de livros na API ao montar o componente.
    }, []); // Array vazio garante que o efeito é executado apenas uma vez.

    return (
        <> {/* Fragmento React para conter o layout */}
            <section className="books-page"> {/* Seção principal da página */}
                <h1>{editItem ? "Editar Item" : "Inserir Item" }</h1> {/* Mostra o título dinâmico com base na ação. */}
                <form className="new-book" onSubmit={handleSubmit}> {/* Formulário para adicionar ou editar livros. */}
                    <div>
                        <label htmlFor="titulo">Título: </label> {/* Rótulo para o campo de título. */}
                        <input
                            type="text"
                            id="titulo"
                            name="titulo"
                            value={title} // Define o valor do campo como o estado `title`.
                            onChange={(e) => setTitle(e.target.value)} // Atualiza o estado ao digitar.
                            required // Torna o campo obrigatório.
                        />
                    </div>
                    <div>
                        <label htmlFor="autor">Autor: </label> {/* Rótulo para o campo de autor. */}
                        <input
                            type="text"
                            id="autor"
                            name="autor"
                            value={author} // Define o valor do campo como o estado `author`.
                            onChange={(e) => setAuthor(e.target.value)} // Atualiza o estado ao digitar.
                            required // Torna o campo obrigatório.
                        />
                    </div>
                    <button type="submit">{editItem ? 'Atualizar' : 'Inserir'}</button> {/* Botão dinâmico com base na ação. */}
                </form>

                <h1>Tabela de Livros</h1> {/* Título da tabela */}
                <table> {/* Início da tabela de livros */}
                    <thead> {/* Cabeçalho da tabela */}
                        <tr>
                            <th>ID</th> {/* Coluna para o ID */}
                            <th>Título</th> {/* Coluna para o título */}
                            <th>Autor</th> {/* Coluna para o autor */}
                            <th>Ações</th> {/* Coluna para ações */}
                        </tr>
                    </thead>
                    <tbody> {/* Corpo da tabela */}
                    {books.map((book) => { // Itera sobre a lista de livros.
                        return(
                            <tr key={book.ID}> {/* Linha da tabela para cada livro. */}
                                <td>{book.ID}</td> {/* Mostra o ID do livro. */}
                                <td>{book.TITLE}</td> {/* Mostra o título do livro. */}
                                <td>{book.AUTHOR}</td> {/* Mostra o autor do livro. */}
                                <td>
                                    <button className='updtButton' onClick={() => handleEdit(book)}>Editar</button> {/* Botão de edição */}
                                    <button className='delButton' onClick={() => handleDelete(book.ID)}>Excluir</button> {/* Botão de exclusão */}
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </section>
        </>
    );
}
