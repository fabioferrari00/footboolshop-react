import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card_Prod from '../src/components/Card_Prod';
import { faHeart as solidHeart, faShareFromSquare } from '@fortawesome/free-solid-svg-icons';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    size: '',
    team_name: '',
  });

  // 1. Aggiungi uno stato per l'ordinamento
  const [sortOrder, setSortOrder] = useState('name-asc'); // Valore di default: Nome A-Z

  const [uniqueTeams, setUniqueTeams] = useState([]);
  const [uniqueSizes, setUniqueSizes] = useState([]);
  const [searchParams] = useSearchParams();
  const [copySuccessMessage, setCopySuccessMessage] = useState('');


  const fetchProducts = useCallback(() => {
    axios.get("http://localhost:3000/products").then((resp) => {
      setProducts(resp.data);
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

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // 2. Aggiungi una funzione per gestire il cambio di ordinamento
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleShare = () => {
    const params = new URLSearchParams();
    if (filters.name) params.append('name', filters.name);
    if (filters.size) params.append('size', filters.size);
    if (filters.team_name) params.append('team_name', filters.team_name);
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

  // 3. Aggiorna useMemo per applicare prima il filtro e poi l'ordinamento
  //    Ho rinominato la variabile da 'filteredProducts' a 'processedProducts' per chiarezza
  const processedProducts = useMemo(() => {
    // Fase di filtraggio (invariata)
    const filtered = products.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(filters.name.toLowerCase());
      const sizeMatch = !filters.size || product.size === filters.size;
      const teamMatch = !filters.team_name || product.team_name === filters.team_name;
      return nameMatch && sizeMatch && teamMatch;
    });

    // Fase di ordinamento (nuova)
    const sorted = [...filtered]; // Crea una copia per non modificare l'array originale

    switch (sortOrder) {
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      // Nota: Ho aggiunto anche l'ordinamento per prezzo come opzione comune.
      // Assicurati che i tuoi oggetti 'product' abbiano una proprietà 'price'.
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
  }, [filters, products, sortOrder]); // Aggiungi 'sortOrder' alle dipendenze


  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex justify-content-center my-4">
          <h1 className='title' >Un ampio catalogo a tua Disposizione!</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className='d-flex flex-wrap justify-content-center gap-3 mb-4'>
            {/* Filtro Nome */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 mx-2">Nome Prodotto</label>
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
              <label htmlFor="team_name" className="block text-sm font-medium text-gray-700 mb-1 mx-2">Team</label>
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

            {/* 4. Aggiungi il selettore per l'ordinamento */}
            <div>
              <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700 mb-1 mx-2">Ordina per</label>
              <select
                name="sortOrder"
                id="sortOrder"
                value={sortOrder}
                onChange={handleSortChange}
                className="w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 appearance-none cursor-pointer transition duration-150"
              >
                <option value="name-asc">Nome (A-Z)</option>
                <option value="name-desc">Nome (Z-A)</option>
                <option value="price-asc">Prezzo (Crescente)</option>
                <option value="price-desc">Prezzo (Decrescente)</option>
              </select>
            </div>

          </div>
          {/* Pulsante Condividi */}
        </div>
        <div className="row">
          <div className='d-flex justify-content-center mx-auto'>
            <button onClick={handleShare} className="btn btn-success d-flex align-items-center gap-2">
              <FontAwesomeIcon icon={faShareFromSquare} />
              Condividi
            </button>
          </div>
        </div>
        {/* Messaggio di conferma che appare e scompare */}
        {copySuccessMessage && <div className="alert alert-success mt-2">{copySuccessMessage}</div>}
      </div>
      <div className="row my-4">
        {/* 5. Usa 'processedProducts' per il rendering */}
        {processedProducts.length > 0 ? (
          processedProducts.map(product => {
            return (
              <Card_Prod key={product.id} {...product} />
            )
          })
        ) : (
          <div className="text-center p-12 bg-white rounded-xl shadow-lg border-2 border-dashed border-gray-200">
            <p className="text-xl text-gray-600 font-semibold">Nessun articolo trovato.</p>
            <p className="text-sm text-gray-500 mt-2">Prova a modificare i filtri di ricerca.</p>
          </div>
        )
        }
      </div>
    </div >
  )
}

export default ProductsPage;