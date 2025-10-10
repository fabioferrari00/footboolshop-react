import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Consigliati from '../src/components/Consigliati';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../src/CartContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { useFavorites } from "../src/components/FavoritesContext";
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';







const DetailProductPage = () => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { favorites, toggleFavorite } = useFavorites();
  const navigate = useNavigate();


  const [copySuccessMessage, setCopySuccessMessage] = useState('')



  //recupero slug
  const { slug } = useParams();

  //Recupera la funzione addItem dal Context
  const { addItem } = useCart();

  const fetchProduct = () => {
    axios
      .get(`http://localhost:3000/products/${slug}`)
      .then((resp) => {
        if (!resp.data || Object.keys(resp.data).length === 0) {
          // Nessun prodotto trovato
          navigate("/404"); //  reindirizza alla pagina 404
        } else {
          setProduct(resp.data);
        }
      })
      .catch(() => {
        navigate("/404"); // se la richiesta fallisce
      });
  };

  useEffect(fetchProduct, [slug])


  const showMessage = (message, type) => {
    setNotification({ message, type });
    // Nasconde il messaggio dopo 3 secondi
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  const handleAddToCart = () => {
    // Controlliamo che il prodotto esista e che la quantità sia valida
    if (product.id && quantity > 0) {
      // L'oggetto product contiene già tutti i dati necessari (id, name, price, ecc.)
      addItem(product, quantity);
      // Opzionale: azzerare la quantità
      setQuantity(1);
    } else {
      // Se entri qui, significa che product.id è nullo o quantity è zero
      console.error('ERRORE: Tentativo di aggiungere un prodotto senza ID valido.');
    }
    setCopySuccessMessage('Articolo aggiunto al carrello!');
    setTimeout(() => setCopySuccessMessage(''), 3000);
  }


  return (
    <div className="container my-5">
      <div className="row g-4">
        <div className="col-md-6">
          <img src={product.image_url} alt={product.name} className='img-fluid rounded product-image' />
        </div>
        {/*dettagi prodotto*/}
        <div className="col-md-6">
          <h1>{product.name}</h1>
          <h2 className='text-success'>{`€ ${product.price}`}</h2>
          <p>{product.description}</p>
          <p>{`Squadra: ${product.team_name}`}</p>
          <p>{`Taglia: ${product.size}`}</p>


          {/*Div responsive mobile*/}

          <div className="mt-4">
            <div className="row g-2 align-items-center">
              {/* Quantità */}
              <div className="col-12 col-sm-4 col-md-auto">
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="form-control"
                  style={{ maxWidth: 140 }}
                />
              </div>

              {/* Aggiungi al carrello */}
              <div className="col-12 col-sm-4 col-md-auto d-grid">
                <button
                  className="btn btn-success rounded-5 px-3 py-2"
                  onClick={handleAddToCart}
                  disabled={!product.id}
                >
                  Aggiungi al carrellino
                </button>
              </div>

              {/* Preferiti */}
              <div className="col-12 col-sm-4 col-md-auto d-grid">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(Number(product.id));
                  }}
                  className={`btn rounded-5 px-3 py-2 ${favorites.includes(Number(product.id))
                    ? "btn-danger text-white"
                    : "btn-outline-secondary"
                    }`}
                >
                  <FontAwesomeIcon
                    icon={favorites.includes(Number(product.id)) ? solidHeart : regularHeart}
                    className="me-2"
                  />
                  Preferiti
                </button>
              </div>

              {/* Messaggio copia */}
              {copySuccessMessage && (
                <div className="col-12">
                  <div className="alert alert-success mt-1 mb-0">{copySuccessMessage}</div>
                </div>
              )}
            </div>
          </div>


        </div>
      </div>
      <Consigliati team={product.team_name} excludeId={product.id} />
    </div>
  )
}

export default DetailProductPage
