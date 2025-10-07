import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

const FavoritesPage = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);

    axios.get("http://localhost:3000/products").then(resp => {
      setProducts(resp.data);
    });
  }, []);

  // Filtra i prodotti per mostrare solo i favoriti
  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  return (
    <div className="container">
      <h2 className="my-4">I Miei Preferiti</h2>
      <div className="row gy-3">
        {favoriteProducts.length === 0 && <p>Nessun prodotto preferito.</p>}
        {favoriteProducts.map(product => (
          <div className="col-12 col-md-6 col-lg-4" key={product.id}>
            <div className="card">
              <Link to={`/product/${product.slug}`} state={{ id: product.id }}>
                <img src={product.image_url} className="card-img-top" alt={product.name} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                </div>
              </Link>
              <div className="card-footer text-end">
                <FontAwesomeIcon icon={solidHeart} style={{ color: 'red' }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
