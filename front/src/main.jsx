import { StrictMode } from 'react'; // Importando o componente StrictMode do React, que ativa verificações adicionais para ajudar na identificação de problemas no desenvolvimento.
import { createRoot } from 'react-dom/client'; // Importando a função createRoot do 'react-dom/client', usada para inicializar o aplicativo React na árvore de DOM.
import './index.css'; // Importando o arquivo CSS global para estilizar o aplicativo
import HomePage from './pages/HomePage'; // Importando o componente HomePage

createRoot(document.getElementById('root')).render(
  <StrictMode> {/* O StrictMode é um componente que ajuda a identificar problemas no código durante o desenvolvimento, mas não tem efeito em produção. */} 
    <HomePage /> {/* HomePage é a página inicial do app */}
  </StrictMode>,
)
