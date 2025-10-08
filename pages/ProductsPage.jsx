import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { useFavorites } from '../src/components/FavoritesContext';


  const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const { favorites, toggleFavorite } = useFavorites();

  
  
  fetchProducts();
  
}, []);

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
      <div className="row gy-3 my-4">
        <h2 className='section_team' >Inter</h2>
        {products.map((product) => {
          if (product.team_name == "Inter")
            return (
              <div  key={product.id} className="col-12 col-md-6 col-lg-4  noDecoration" >
                <Link to={`/product/${product.slug}`} state={{
                  id: product.id
                }} >
                  <div className="card " >
                    <img src={product.image_url} className="card-img-top" alt="Product 1" />

                    <div className="card-body">
                      <h5 className="text-decoration-none card-title">{product.name}</h5>
                      <p className="text-decoration-none card-text">{product.description}</p>
                    </div>
                    <div className="card-footer text-end">
                      <button
                        className="btn btn-link p-0"
                        onClick={(e) => {
                          e.preventDefault(); 
                          toggleFavorite(product.id);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={solidHeart}
                          style={{ color: favorites.includes(product.id) ? 'red' : 'gray' }}
                        />
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
              
            )
        })}
      </div>
      <div className="row gy-3  my-4">
        <h2 className='section_team' >Milan</h2>
        {products.map((product) => {
          if (product.team_name == "Milan")
            return (
              <div  key={product.id} className="col-12 col-md-6 col-lg-4  noDecoration" >
                <Link to={`/product/${product.slug}`} state={{
                  id: product.id
                }} >
                  <div className="card " >
                    <img src={product.image_url} className="card-img-top" alt="Product 1" />

                    <div className="card-body">
                      <h5 className="text-decoration-none card-title">{product.name}</h5>
                      <p className="text-decoration-none card-text">{product.description}</p>
                    </div>
                    <div className="card-footer text-end">
                      <button
                        className="btn btn-link p-0"
                        onClick={(e) => {
                          e.preventDefault(); 
                          toggleFavorite(product.id);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={solidHeart}
                          style={{ color: favorites.includes(product.id) ? 'red' : 'gray' }}
                        />
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            )
        })}
      </div>
      <div className="row gy-3 my-4">
        <h2 className='section_team' >Roma</h2>
        {products.map((product) => {
          if (product.team_name == "Roma")
            return (
              <div  key={product.id} className="col-12 col-md-6 col-lg-4  noDecoration" >
                <Link to={`/product/${product.slug}`} state={{
                  id: product.id
                }} >
                  <div className="card " >
                    <img src={product.image_url} className="card-img-top" alt="Product 1" />

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

            )
        })}
      </div>
      <div className="row gy-3 my-4">
        <h2 className='section_team' >Cagliari</h2>
        {products.map((product) => {
          if (product.team_name == "Cagliari")
            return (
              <div  key={product.id} className="col-12 col-md-6 col-lg-4 noDecoration" >
                <Link to={`/product/${product.slug}`} state={{
                  id: product.id
                }} >
                  <div className="card " >
                    <img src={product.image_url} className="card-img-top" alt="Product 1" />

                    <div className="card-body">
                      <h5 className="text-decoration-none card-title">{product.name}</h5>
                      <p className="text-decoration-none card-text">{product.description}</p>
                    </div>
                    <div className="card-footer text-end">
                      <button
                        className="btn btn-link p-0"
                        onClick={(e) => {
                          e.preventDefault(); 
                          toggleFavorite(product.id);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={solidHeart}
                          style={{ color: favorites.includes(product.id) ? 'red' : 'gray' }}
                        />
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            )
        })}
      </div>
      <div className="row gy-3 my-4">
        <h2 className='section_team' >Juventus</h2>
        {products.map((product) => {
          if (product.team_name == "Juventus")
            return (
              <div  key={product.id} className="col-12 col-md-6 col-lg-4 noDecoration " >
                <Link to={`/product/${product.slug}`} state={{
                  id: product.id
                }} >
                  <div className="card " >
                    <img src={product.image_url} className="card-img-top" alt="Product 1" />

                    <div className="card-body">
                      <h5 className="text-decoration-none card-title">{product.name}</h5>
                      <p className="text-decoration-none card-text">{product.description}</p>
                    </div>
                    <div className="card-footer text-end">
                      <button
                        className="btn btn-link p-0"
                        onClick={(e) => {
                          e.preventDefault(); 
                          toggleFavorite(product.id);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={solidHeart}
                          style={{ color: favorites.includes(product.id) ? 'red' : 'gray' }}
                        />
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
              
            )
        })}
      </div>
      <div className="row my-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => {
            return (
              <div  key={product.id} className="col-12 col-md-6 col-lg-4 noDecoration" >
                <Link to={`/product/${product.slug}`} state={{
                  id: product.id
                }} >
                  <div className="card " >
                    <img src={product.image_url} className="card-img-top" alt="Product 1" />

                    <div className="card-body">
                      <h5 className="text-decoration-none card-title">{product.name}</h5>
                      <p className="text-decoration-none card-text">{product.description}</p>
                    </div>
                    <div className="card-footer text-end">
                      <button
                        className="btn btn-link p-0"
                        onClick={(e) => {
                          e.preventDefault(); 
                          toggleFavorite(product.id);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={solidHeart}
                          style={{ color: favorites.includes(product.id) ? 'red' : 'gray' }}
                        />
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