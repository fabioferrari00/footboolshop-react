import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// 1. Importa le icone necessarie
import { faHeart as solidHeart, faShareFromSquare } from '@fortawesome/free-solid-svg-icons';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    size: '',
    team_name: '',
  });
  const [uniqueTeams, setUniqueTeams] = useState([]);
  const [uniqueSizes, setUniqueSizes] = useState([]);
  const [searchParams] = useSearchParams();

  // 2. Aggiungi uno stato per il messaggio di conferma della copia
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

  // 3. Funzione per gestire la condivisione
  const handleShare = () => {
    // Crea un oggetto URLSearchParams per costruire la query string
    const params = new URLSearchParams();

    // Aggiungi solo i parametri che hanno un valore
    if (filters.name) params.append('name', filters.name);
    if (filters.size) params.append('size', filters.size);
    if (filters.team_name) params.append('team_name', filters.team_name);

    // Costruisci l'URL completo
    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

    // Usa l'API del browser per copiare il link negli appunti
    navigator.clipboard.writeText(shareUrl).then(() => {
      // Mostra un messaggio di successo e nascondilo dopo 3 secondi
      setCopySuccessMessage('Link copiato!');
      setTimeout(() => setCopySuccessMessage(''), 3000);
    }).catch(err => {
      console.error('Errore nella copia del link:', err);
      setCopySuccessMessage('Impossibile copiare il link.');
      setTimeout(() => setCopySuccessMessage(''), 3000);
    });
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(filters.name.toLowerCase());
      const sizeMatch = !filters.size || product.size === filters.size;
      const teamMatch = !filters.team_name || product.team_name === filters.team_name;
      return nameMatch && sizeMatch && teamMatch;
    });
  }, [filters, products]);


  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex justify-content-center my-4">
          <h1 className='title' >Un ampio catalogo a tua Disposizione!</h1>
        </div>
      </div>
      <div className="row">
        {/* Modificato il layout per allineare meglio filtri e pulsante */}
        <div className="col-12">
          {/* 4. Aggiungi il pulsante Condividi e il messaggio di conferma */}
          <div className='d-flex flex-wrap align-items-end gap-3 mb-4'>
            {/* Filtro Nome */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome Prodotto</label>
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
              <label htmlFor="team_name" className="block text-sm font-medium text-gray-700 mb-1">Team</label>
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
              <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">Taglia</label>
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

            {/* Pulsante Condividi */}
            <div className='ms-auto'>
              <button onClick={handleShare} className="btn btn-success d-flex align-items-center gap-2">
                <FontAwesomeIcon icon={faShareFromSquare} />
                Condividi
              </button>
            </div>
          </div>
          {/* Messaggio di conferma che appare e scompare */}
          {copySuccessMessage && <div className="alert alert-success mt-2">{copySuccessMessage}</div>}
        </div>
      </div>
      <div className="row my-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => {
            return (
              <div className="col-12 col-md-6 col-lg-4  noDecoration" key={product.id} >
                <Link to={`/product/${product.slug}`} state={{ id: product.id }} >
                  <div className="card " >
                    <img src={product.image_url} className="card-img-top" alt="Product 1" />
                    <div className="card-body">
                      <h5 className="text-decoration-none card-title">{product.name}</h5>
                      <p className="text-decoration-none card-text">{product.description}</p>
                      <span>{product.price}€</span>
                    </div>
                    <div className="card-footer text-end">
                      <button className="btn btn-link p-0" onClick={(e) => { e.preventDefault(); }}>
                        <FontAwesomeIcon icon={solidHeart} />

                      </button>
                    </div>
                  </div>
                </Link>
              </div>
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