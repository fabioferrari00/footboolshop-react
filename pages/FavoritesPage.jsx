import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import Card_Prod from '../src/components/Card_Prod';

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
          <Card_Prod
            key={product.id}
            {...product} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
