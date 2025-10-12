import Jumbotron from '../src/components/Jumbotron'
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import SerieASpinner from '../src/components/SerieASpinner';

import { useFavorites } from "../src/components/FavoritesContext";

import Card_Prod from '../src/components/Card_Prod';
// Importiamo l'hook per il Carrello
import { useCart } from '../src/CartContext';

const HomePage = () => {

  const [products, setProducts] = useState([]);
  const { favorites, toggleFavorite } = useFavorites();

  // 1. ESTRAIAMO LE FUNZIONI DEL CARRELLO
  const { addItem, items: cartItems } = useCart();
  const [cartMessage, setCartMessage] = useState(''); // Per feedback utente (opzionale)

  const fetchProducts = () => {
    axios.get("http://localhost:3000/products").then((resp) => {
      setProducts(resp.data)
    })
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. FUNZIONE PER AGGIUNGERE AL CARRELLO
  const handleAddToCart = useCallback((product) => {
    addItem(product, 1);

    setCartMessage(`"${product.name}" aggiunto!`);
    setTimeout(() => setCartMessage(''), 3000);
  }, [addItem]);


  return (
    <>
      <SerieASpinner />
      <Jumbotron />
      <div className="container">

        {/* Messaggio di conferma carrello */}
        {cartMessage && <div className="alert alert-info mt-2">{cartMessage}</div>}

        <div className="row gy-3">
          <div className="col-12 d-flex justify-content-center my-4">
            <h2 className='title_section mt-5'>ARTICOLI PIU RECENTI</h2>
          </div>
          {products.map((product) => {
            if (product.arrival_date >= "2025-10-02") {

              // 3. LOGICA: Controlla se il prodotto è già nel carrello
              const isInCart = cartItems.some(item => item.id == product.id);

              return (
                <Card_Prod
                  key={product.id}
                  {...product}
                  toggleFavorite={toggleFavorite}
                  isFavorite={favorites.includes(product.id)}

                  // 4. PASSIAMO LE PROPS DEL CARRELLO
                  onAddToCart={() => handleAddToCart(product)}
                  isInCart={isInCart}
                />
              )
            }
            return null;
          })
          }
        </div>
        <div className="row mb-4">
          <div className="col-12 d-flex justify-content-center my-4">
            <h2 className='title_section mt-5'>ARTICOLI PER BAMBINI</h2>
          </div>
          {products.map((product) => {
            if (product.size == "XXS" || product.size == 36) {

              // 3. LOGICA: Controlla se il prodotto è già nel carrello
              const isInCart = cartItems.some(item => item.id == product.id);

              return (
                <Card_Prod
                  key={product.id}
                  {...product}
                  toggleFavorite={toggleFavorite}
                  isFavorite={favorites.includes(product.id)}

                  // 4. PASSIAMO LE PROPS DEL CARRELLO
                  onAddToCart={() => handleAddToCart(product)}
                  isInCart={isInCart}
                />
              )
            }
            return null;
          })
          }
        </div>
      </div>

    </>
  )
}
export default HomePage