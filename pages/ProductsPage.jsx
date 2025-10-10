import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card_Prod from '../src/components/Card_Prod';
import { faHeart as solidHeart, faShareFromSquare } from '@fortawesome/free-solid-svg-icons';

// prendiamo le funzioni per il carrello dal nostro Context!
import { useCart } from '../src/CartContext'; 

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    size: '',
    team_name: '',
  });
  const [sortOrder, setSortOrder] = useState('default'); 
  const [favorites, setFavorites] = useState([]);
  const [uniqueTeams, setUniqueTeams] = useState([]);
  const [uniqueSizes, setUniqueSizes] = useState([]);
  const [searchParams] = useSearchParams();
  const [copySuccessMessage, setCopySuccessMessage] = useState('');

  // Sfruttiamo il carrello centralizzato (Context) per aggiungere prodotti e vedere il conteggio.
  const { addItem, items: cartItems, itemCount } = useCart();
  
  // Lo stato per mostrare velocemente il messaggio di "Articolo aggiunto!"
  const [cartMessage, setCartMessage] = useState(''); 


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

  useEffect(() => {
    const nameFromUrl = searchParams.get('name') || '';
    const sizeFromUrl = searchParams.get('size') || '';
    const teamFromUrl = searchParams.get('team_name') || '';

    setFilters({
      name: nameFromUrl,
      size: sizeFromUrl,
      team_name: teamFromUrl,
    });

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

  // Gestione dei preferiti (la vecchia funzione, mantenuta)
  const toggleFavorite = (productId) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.includes(productId);
      let newFavorites = isFavorite 
        ? prevFavorites.filter(id => id !== productId)
        : [...prevFavorites, productId];
        
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };
  
  // La funzione per aggiungere al carrello: ora chiama solo il Context!
  const handleAddToCart = (product) => {
    addItem(product, 1); 
    
    // Messaggio di conferma che scompare dopo 3 secondi
    setCartMessage(`"${product.name}" aggiunto al carrello! (Totale: ${itemCount + 1})`);
    setTimeout(() => setCartMessage(''), 3000); 
  };


  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleShare = () => {
    const params = new URLSearchParams();
    if (filters.name) params.append('name', filters.name);
    if (filters.size) params.append('size', filters.size);
    if (filters.team_name) params.append('team_name', filters.team_name);
    if (sortOrder && sortOrder !== 'default') params.append('sort', sortOrder);

    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopySuccessMessage('Link copiato!');
      setTimeout(() => setCopySuccessMessage(''), 3000);
    }).catch(err => {
      console.error('Errore nella copia del link:', err);
      setCopySuccessMessage('Impossibile copiare il link.');
      setTimeout(() => setCopySuccessMessage(''), 3000);
    });
  };

  const processedProducts = useMemo(() => {
    // 1. Fase di filtraggio
    const filtered = products.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(filters.name.toLowerCase());
      const sizeMatch = !filters.size || product.size === filters.size;
      const teamMatch = !filters.team_name || product.team_name === filters.team_name;
      return nameMatch && sizeMatch && teamMatch;
    });

    // 2. Fase di ordinamento
    const sorted = [...filtered];

    switch (sortOrder) {
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

    return sorted;
  }, [filters, products, sortOrder]);


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
            {/* Filtro Nome */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mx2">Nome</label>
              <input
                type="text"
                name="name"
                id="name"
                value={filters.name}
                onChange={handleFilterChange}
                placeholder="Cerca per nome..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              />
            </div>

            {/* Filtro Team */}
            <div>
              <label htmlFor="team_name" className="block text-sm font-medium text-gray-700 mx-2">Team</label>
              <select
                name="team_name"
                id="team_name"
                value={filters.team_name}
                onChange={handleFilterChange}
                className="w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 appearance-none cursor-pointer transition duration-150"
              >
                <option value="">Tutti i Team</option>
                {uniqueTeams.map(team_name => (
                  <option key={team_name} value={team_name}>{team_name}</option>
                ))}
              </select>
            </div>

            {/* Filtro Taglia */}
            <div>
              <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1 mx-2">Taglia</label>
              <select
                name="size"
                id="size"
                value={filters.size}
                onChange={handleFilterChange}
                className="w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 appearance-none cursor-pointer transition duration-150"
              >
                <option value="">Tutte le Taglie</option>
                {uniqueSizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            {/* Controllo Ordinamento */}
            <div>
              <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700 mx-2">Ordina per</label>
              <select
                name="sortOrder"
                id="sortOrder"
                value={sortOrder}
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


          </div>
          {/* Pulsante Condividi */}

          <div className='ms-auto d-flex justify-content-center'>
            <button onClick={handleShare} className="btn btn-success d-flex align-items-center gap-2 justify-content-center">
              <FontAwesomeIcon icon={faShareFromSquare} />
              Condividi
            </button>
          </div>
          {/* Messaggio di conferma che appare e scompare */}
          {copySuccessMessage && <div className="alert alert-success mt-2">{copySuccessMessage}</div>}
          
          {/* Messaggio del carrello che appare quando aggiungi un prodotto */}
          {cartMessage && <div className="alert alert-info mt-2">{cartMessage}</div>}

        </div>
      </div>
      <div className="row my-4">
        {processedProducts.length > 0 ? (
          processedProducts.map(product => {
            // Controlla se il prodotto è già nel carrello usando gli 'items' del Context
            const isInCart = cartItems.some(item => item.id == product.id); 
            
            return (
              <Card_Prod
                key={product.id}
                {...product}
                toggleFavorite={toggleFavorite} 
                isFavorite={favorites.includes(product.id)}
                
                // Passiamo la funzione che chiama il Context
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
    </div>
  );
}
export default ProductsPage;