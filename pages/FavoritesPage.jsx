import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import Card_Prod from '../src/components/Card_Prod';

// 1. Importa l'hook useCart
import { useCart } from '../src/CartContext'; 

const FavoritesPage = () => {
    const [products, setProducts] = useState([]);
    const [favorites, setFavorites] = useState([]);

    // 2. RECUPERA: Ottieni le funzioni e i dati del carrello dal Context
    const { addItem, items: cartItems, itemCount } = useCart();
    
    // 3. STATO: Aggiungi lo stato per il messaggio di conferma (come in ProductsPage)
    const [cartMessage, setCartMessage] = useState('');

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(savedFavorites);

        axios.get("http://localhost:3000/products").then(resp => {
            setProducts(resp.data);
        });
    }, []);

    // 4. FUNZIONE: Definisci la funzione per aggiungere al carrello
    const handleAddToCart = useCallback((product) => {
        addItem(product, 1);
        
        // Il conteggio del carrello si aggiorna subito
        setCartMessage(`"${product.name}" aggiunto! (Totale: ${cartItems.length + 1})`); 
        setTimeout(() => setCartMessage(''), 3000);
    }, [addItem, cartItems.length]); // Aggiungi le dipendenze per useCallback

    // Filtra i prodotti per mostrare solo i favoriti
    const favoriteProducts = products.filter(p => favorites.includes(p.id));

    return (
        <div className="container">
            <h2 className="my-4">I Miei Preferiti</h2>
            
            {/* Messaggio Carrello */}
            {cartMessage && <div className="alert alert-info mt-2">{cartMessage}</div>}

            <div className="row gy-3">
                {favoriteProducts.length === 0 && <p>Nessun prodotto preferito.</p>}
                
                {favoriteProducts.map(product => {
                    
                    // 5. CALCOLO: Determina se l'articolo è già nel carrello
                    const isInCart = cartItems.some(item => item.id == product.id);

                    return (
                        <Card_Prod
                            key={product.id}
                            {...product} 
                            
                            // 6. PASSARE LE PROPS: Invia le informazioni al componente Card_Prod
                            onAddToCart={() => handleAddToCart(product)}
                            isInCart={isInCart} 
                            // Nota: se la gestione dei preferiti è interna alla Card,
                            // non devi passare toggleFavorite/isFavorite qui!
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default FavoritesPage;