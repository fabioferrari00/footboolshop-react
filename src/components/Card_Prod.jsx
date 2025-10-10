import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// AGGIUNTO: Import delle icone necessarie per il carrello
import { faHeart as solidHeart, faShoppingCart, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

import { useFavorites } from "../components/FavoritesContext";
// NOTA: L'hook useFavorites non viene toccato.


// MODIFICA CHIAVE: Destrutturiamo le props per ACCETTARE quelle del carrello (onAddToCart, isInCart)
const Card_Prod = (
  {
    // Accettiamo tutte le prop passate da ProductsPage, incluse quelle implicite (...product)
    onAddToCart, 
    isInCart,
    // E quelle non destrutturate, come name, price, ecc.
    ...product // Usiamo lo spread per mantenere tutte le altre proprietà
  }) => {

  // La logica esistente dei preferiti rimane intatta
  const { favorites, toggleFavorite } = useFavorites();

  return (
    // Ho spostato la key qui per convenzione React (era all'interno del Link)
    <div className="col-12 col-md-6 col-lg-4 noDecoration" key={product.id} > 

      <Link to={`/product/${product.slug}`} state={{ id: product.id }} >
        <div className="card m-2" >
          <img src={product.image_url} className="card-img-top" alt="Product 1" />
          
          <div className="card-body">
            <h5 className="text-decoration-none card-title">{product.name}</h5>
            <p className="text-decoration-none card-text">{product.description}</p>
            
            {/* INSERIAMO QUI IL PULSANTE AGGIUNGI AL CARRELLO */}
            <div className='d-flex justify-content-between align-items-center mt-3'>
              
                <span>{product.price}€</span>
              
                {/* 1. AGGIUNTO: Pulsante Aggiungi al Carrello */}
                <button 
                  // Intercetta l'evento e impedisce al Link esterno di attivarsi
                  onClick={(e) => {
                    e.preventDefault(); 
                    onAddToCart(); // Chiama la funzione inviata da ProductsPage
                  }} 
                  // Stile condizionale in base a isInCart
                  className={`btn ${isInCart ? 'btn-warning' : 'btn-primary'} d-flex align-items-center gap-2 btn-sm`}
                  title={isInCart ? "Già nel carrello" : "Aggiungi al Carrello"}
                >
                  <FontAwesomeIcon icon={isInCart ? faCheckCircle : faShoppingCart} />
                  {/* Testo leggermente accorciato per la Card */}
                  {isInCart ? 'Aggiunto' : 'Aggiungi al carrello'}
                </button>

            </div>

          </div>

          {/* Icona Preferiti (Logica esistente intatta) */}
          <span
            className="heart-icon"
            onClick={(e) => {
              // Intercetta l'evento e impedisce al Link esterno di attivarsi
              e.preventDefault(); 
              toggleFavorite(Number(product.id));
            }}
          >
            <FontAwesomeIcon
              icon={favorites.includes(Number(product.id)) ? solidHeart : regularHeart}
              className={favorites.includes(Number(product.id)) ? "liked" : ""}
            />
          </span>

        </div>
      </Link>
    </div>
  )
}


export default Card_Prod