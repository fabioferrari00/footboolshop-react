import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card_Prod from '../src/components/Card_Prod';
import { faHeart as solidHeart, faShareFromSquare } from '@fortawesome/free-solid-svg-icons';

// prendiamo le funzioni per il carrello dal nostro Context!
import { useCart } from '../src/CartContext'; 
// PAGINAZIONE: 1. Definisci una costante per il numero di articoli per pagina
const ITEMS_PER_PAGE = 15;

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  // STATI ATTIVI (usati per filtrare/ordinare la lista)
  const [activeFilters, setActiveFilters] = useState({
    name: '',
    size: '',
    team_name: '',
  });
  const [activeSortOrder, setActiveSortOrder] = useState('default');

  // NUOVI STATI "STAGED" (usati per i campi input del form)
  const [stagedFilters, setStagedFilters] = useState({
    name: '',
    size: '',
    team_name: '',
  });
  const [stagedSortOrder, setStagedSortOrder] = useState('default');


  const [favorites, setFavorites] = useState([]);
  const [uniqueTeams, setUniqueTeams] = useState([]);
  const [uniqueSizes, setUniqueSizes] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [copySuccessMessage, setCopySuccessMessage] = useState('');

  // Sfruttiamo il carrello centralizzato (Context) per aggiungere prodotti e vedere il conteggio.
  const { addItem, items: cartItems, itemCount } = useCart();
  
  // Lo stato per mostrare velocemente il messaggio di "Articolo aggiunto!"
  const [cartMessage, setCartMessage] = useState(''); 

  // PAGINAZIONE: 2. Aggiungi lo stato per la pagina corrente
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = useCallback(() => {
    axios.get("http://localhost:3000/products").then((resp) => {
      setProducts(resp.data);
      // Il carrello è gestito dal Context, ma i preferiti li teniamo qui via localStorage.
      const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavorites(savedFavorites);
    }).catch((err) => {
      console.error(err);
    });
  }, []);

  // SINCRONIZZA STATI ALL'AVVIO/CAMBIO URL
  useEffect(() => {
    const nameFromUrl = searchParams.get('name') || '';
    const sizeFromUrl = searchParams.get('size') || '';
    const teamFromUrl = searchParams.get('team_name') || '';
    const sortFromUrl = searchParams.get('sort') || 'default';

    // Aggiorna gli stati ATTIVI (usati nel useMemo)
    setActiveFilters({
      name: nameFromUrl,
      size: sizeFromUrl,
      team_name: teamFromUrl,
    });
    setActiveSortOrder(sortFromUrl);

    // Aggiorna anche gli stati STAGED (usati per popolare gli input)
    setStagedFilters({
      name: nameFromUrl,
      size: sizeFromUrl,
      team_name: teamFromUrl,
    });
    setStagedSortOrder(sortFromUrl);

    fetchProducts();
  }, [fetchProducts, searchParams]);

  useEffect(() => {
    const teams = [...new Set(products.map(p => p.team_name))].sort();
    const sizes = [...new Set(products.map(p => p.size))].sort((a, b) => {
      const order = { 'S': 1, 'M': 2, 'L': 3, 'XL': 4, 'XXL': 5, 'Unica': 6 };
      return (order[a] || 99) - (order[b] || 99);
    });
    setUniqueTeams(teams);
    setUniqueSizes(sizes);
  }, [products]);

  // PAGINAZIONE: 3. Resetta la pagina quando i filtri ATTIVI cambiano
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilters, activeSortOrder]); // Usa activeFilters/activeSortOrder

  // FUNZIONI DI GESTIONE PER GLI INPUT (AGGIORNANO SOLO GLI STATI "STAGED")
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setStagedFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };
    
  // RECUPERATA: Funzione per aggiungere al carrello
  const handleAddToCart = (product) => {
    addItem(product, 1); 
    
    // Messaggio di conferma che scompare dopo 3 secondi
    setCartMessage(`"${product.name}" aggiunto al carrello! (Totale: ${itemCount + 1})`);
    setTimeout(() => setCartMessage(''), 3000); 
  };


  // RECUPERATA: Funzione per gestire il cambio di ordinamento (aggiorna stagedSortOrder)
  const handleSortChange = (event) => {
    setStagedSortOrder(event.target.value);
  };
  
  // CORRETTA: Logica dei preferiti via localStorage (solo una funzione)
  const toggleFavorite = (productId) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.includes(productId);
      let newFavorites;
      if (isFavorite) {
        newFavorites = prevFavorites.filter(id => id !== productId);
      } else {
        newFavorites = [...prevFavorites, productId];
      }
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };


  // Funzione per APPLICARE i filtri e l'ordinamento all'URL (Al click di "Cerca")
  const applyFiltersToUrl = () => {
    // 1. Costruisci i nuovi parametri dell'URL usando gli stati STAGED
    const newParams = {};
    if (stagedFilters.name) newParams.name = stagedFilters.name;
    if (stagedFilters.size) newParams.size = stagedFilters.size;
    if (stagedFilters.team_name) newParams.team_name = stagedFilters.team_name;
    if (stagedSortOrder && stagedSortOrder !== 'default') newParams.sort = stagedSortOrder;

    // 2. Naviga al nuovo URL. Questo innesca l'useEffect (dovuto a searchParams)
    //    che aggiornerà gli stati ATTIVI e ricalcolerà la lista.
    navigate({
      pathname: window.location.pathname,
      search: new URLSearchParams(newParams).toString(),
    });
  };


  const handleShare = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?${searchParams.toString()}`;

    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopySuccessMessage('Link copiato!');
      setTimeout(() => setCopySuccessMessage(''), 3000);
    }).catch(err => {
      console.error('Errore nella copia del link:', err);
      setCopySuccessMessage('Impossibile copiare il link.');
      setTimeout(() => setCopySuccessMessage(''), 3000);
    });
  };

  // PAGINAZIONE: 4. Usa activeFilters e activeSortOrder per il filtraggio/ordinamento
  const { paginatedProducts, totalPages } = useMemo(() => {
    // Fase di filtraggio
    const filtered = products.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(activeFilters.name.toLowerCase());
      const sizeMatch = !activeFilters.size || product.size === activeFilters.size;
      const teamMatch = !activeFilters.team_name || product.team_name === activeFilters.team_name;
      return nameMatch && sizeMatch && teamMatch;
    });

    // 2. Fase di ordinamento
    const sorted = [...filtered];
    switch (activeSortOrder) { // Usa activeSortOrder
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    // Fase di paginazione
    const calculatedTotalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
    const safeCurrentPage = Math.min(currentPage, calculatedTotalPages > 0 ? calculatedTotalPages : 1);

    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    const paginatedItems = sorted.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return { paginatedProducts: paginatedItems, totalPages: calculatedTotalPages };
  }, [activeFilters, products, activeSortOrder, currentPage]); // Dipendenze: activeFilters e activeSortOrder


  // PAGINAZIONE: 5. Funzione per cambiare pagina (invariata)
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };


  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex justify-content-center my-4">
          <h1 className='title' >Un ampio catalogo a tua Disposizione!</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          {/* Controlli Filtri e Ordinamento */}
          <div className='d-flex flex-wrap align-items-end gap-3 mb-4 filterbar'>
            {/* Filtro Nome: USA stagedFilters e handleFilterChange */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mx-2">Nome</label>
              <input
                type="text"
                name="name"
                id="name"
                value={stagedFilters.name}
                onChange={handleFilterChange}
                placeholder="Cerca per nome..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              />
            </div>

            {/* Filtro Team: USA stagedFilters e handleFilterChange */}
            <div>
              <label htmlFor="team_name" className="block text-sm font-medium text-gray-700 mx-2">Team</label>
              <select
                name="team_name"
                id="team_name"
                value={stagedFilters.team_name}
                onChange={handleFilterChange}
                className="w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 appearance-none cursor-pointer transition duration-150"
              >
                <option value="">Tutti i Team</option>
                {uniqueTeams.map(team_name => (
                  <option key={team_name} value={team_name}>{team_name}</option>
                ))}
              </select>
            </div>

            {/* Filtro Taglia: USA stagedFilters e handleFilterChange */}
            <div>
              <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1 mx-2">Taglia</label>
              <select
                name="size"
                id="size"
                value={stagedFilters.size}
                onChange={handleFilterChange}
                className="w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 appearance-none cursor-pointer transition duration-150"
              >
                <option value="">Tutte le Taglie</option>
                {uniqueSizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            {/* Controllo Ordinamento: USA stagedSortOrder e handleSortChange */}
            <div>
              <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700 mx-2">Ordina per</label>
              <select
                name="sortOrder"
                id="sortOrder"
                value={stagedSortOrder}
                onChange={handleSortChange}
                className="w-full pl-3 pr-10 py-2 border border-gray-300 bg-white mx-2 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 appearance-none cursor-pointer transition duration-150"
              >
                <option value="default">Seleziona</option>
                <option value="name-asc">Nome (A-Z)</option>
                <option value="name-desc">Nome (Z-A)</option>
                <option value="price-asc">Prezzo (Crescente)</option>
                <option value="price-desc">Prezzo (Decrescente)</option>
              </select>
            </div>
            {/* Pulsante Cerca: CHIAMA applyFiltersToUrl */}
            <div>
              <button className="btn btn-success" onClick={applyFiltersToUrl}>Cerca</button>
            </div>
          </div>
          {/* Pulsante Condividi */}
          <div className='ms-auto d-flex justify-content-center'>
            <button onClick={handleShare} className="btn btn-success d-flex align-items-center gap-2 justify-content-center">
              <FontAwesomeIcon icon={faShareFromSquare} />
              Condividi
            </button>
          </div>
          {copySuccessMessage && <div className="alert alert-success mt-2">{copySuccessMessage}</div>}
          
          {/* Messaggio del carrello che appare quando aggiungi un prodotto */}
          {cartMessage && <div className="alert alert-info mt-2">{cartMessage}</div>}

        </div>
      </div>


      {/* Paginazione superiore (invariata) */}
      {totalPages > 1 && (
        <div className="row">
          <div className="col-12 d-flex justify-content-center my-4">
            <nav aria-label="Page navigation">
              <ul className="pagination">
                {/* ... Controlli di paginazione ... */}
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link button-navigate" onClick={() => handlePageChange(currentPage - 1)}>
                    Precedente
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <button className="page-link pageNumber" onClick={() => handlePageChange(index + 1)}>
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link button-navigate" onClick={() => handlePageChange(currentPage + 1)}>
                    Successivo
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
      <div className="row my-4">
        {/* PAGINAZIONE: 6. Usa 'paginatedProducts' per il rendering */}
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map(product => {
            // Controlla se il prodotto è nel carrello e passa le props
            const isInCart = cartItems.some(item => item.id == product.id);
            
            return (
              <Card_Prod
                key={product.id}
                {...product} 
                toggleFavorite={toggleFavorite} 
                isFavorite={favorites.includes(product.id)}
                
                // PASSAGGIO DELLE PROPS DEL CARRELLO
                onAddToCart={() => handleAddToCart(product)} 
                isInCart={isInCart} 
              />
            )
          })
        ) : (
          <div className="text-center p-12 bg-white rounded-xl shadow-lg border-2 border-dashed border-gray-200">
            <p className="text-xl text-gray-600 font-semibold">Nessun articolo trovato. 😔</p>
            <p className="text-sm text-gray-500">Prova a modificare i filtri o a cercare un altro prodotto.</p>
          </div>
        )}
      </div>

      {/* Paginazione inferiore (invariata) */}
      {totalPages > 1 && (
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <nav aria-label="Page navigation">
              <ul className="pagination">
                {/* ... Controlli di paginazione ... */}
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link button-navigate" onClick={() => handlePageChange(currentPage - 1)}>
                    Precedente
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <button className="page-link pageNumber" onClick={() => handlePageChange(index + 1)}>
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link button-navigate" onClick={() => handlePageChange(currentPage + 1)}>
                    Successivo
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}

    </div>
  );
}

export default ProductsPage;