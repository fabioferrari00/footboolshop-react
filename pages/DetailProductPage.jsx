import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Consigliati from '../src/components/Consigliati';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../src/CartContext';
import { Link } from 'react-router-dom';




const DetailProductPage = () => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);


  //recupero slug
  const { slug } = useParams();

  //Recupera la funzione addItem dal Context
  const { addItem } = useCart();

  const fetchProduct = () => {
    axios.get(`http://localhost:3000/products/${slug}`).then((resp) => {
      setProduct(resp.data)
      console.log(resp.data)
    })
  }

  useEffect(fetchProduct, [slug])

  const handleAddToCart = () => {
    // Controlliamo che il prodotto esista e che la quantità sia valida
    if (product.id && quantity > 0) {
      console.log('Prodotto aggiunto:', product);
      console.log('ID Prodotto:', product.id);
      // L'oggetto product contiene già tutti i dati necessari (id, name, price, ecc.)
      addItem(product, quantity);
      console.log('Chiamata addItem terminata. Lo stato del carrello DEVE essere aggiornato.')
      alert(`${product.name} (x${quantity}) aggiunto al carrello!`);
      // Opzionale: azzerare la quantità
      setQuantity(1);
    } else {
      // Se entri qui, significa che product.id è nullo o quantity è zero
      console.error('ERRORE: Tentativo di aggiungere un prodotto senza ID valido.');
    }
  }


  return (
    <div className="container my-5">
      <div className="row g-4">
        <div className="col-md-6">
          <img src={product.image_url} alt={product.name} className='img-fluid rounded product-image' />
        </div>
        {/*dettagi prodotto*/}
        <div className="col-md-6">
          <div className="d-flex">
            <h1>{product.name}</h1>
            <Link to={`/products/${slug}/edit`}><i className='fas fa-edit'></i></Link>
          </div>
          <h2 className='text-success'>{`€ ${product.price}`}</h2>
          <p>{product.description}</p>
          <p>{`Squadra: ${product.team_name}`}</p>
          <p>{`Taglia: ${product.size}`}</p>


          <div className='mt-4'>

  
            

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="form-control d-inline-block w-auto me-2"
            />
            <button
              className='btn btn-primary me-2'
              onClick={handleAddToCart} // <-- Collegamento della funzione al click
              disabled={!product.id} // Disabilita se i dati del prodotto non sono ancora caricati
            >
              Aggiungi al carrellino</button>
            <button className='btn btn-primary me-2'>Preferiti</button>
          </div>
        </div>
      </div>
      <Consigliati team={product.team_name} excludeId={product.id} />
    </div>
  )
}

export default DetailProductPage
