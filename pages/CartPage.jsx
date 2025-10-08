import React from 'react';
// 1. IMPORTAZIONE: Assicurati che il percorso sia corretto rispetto al tuo CartContext.jsx
import { useCart } from '../src/CartContext';
// import './CartPage.css'; // Non dimenticare di importare gli stili
import { Link } from 'react-router-dom';

function CartPage() {



  // 2. RECUPERO: Recupera tutti i dati E le nuove funzioni dal Context
  const {
    items,
    subtotal,
    shipping,
    total,
    updateQuantity,
    removeItem
  } = useCart();

  console.log('Stato corrente del carrello (items):', items);

  // Funzione helper per formattare la valuta in €
  const formatCurrency = (amount) => `${amount.toFixed(2)} €`;

  // Visualizzazione: Carrello vuoto
  if (items.length === 0) {
    return (
      <div className="container">
        <div className="cart-page empty">
          <h1>Il tuo carrello è vuoto</h1>
          <p>È il momento perfetto per esplorare i nostri prodotti!</p>
          {/* Inserisci un link alla Home o alla ProductsPage */}
        </div>
      </div >
    );
  }

  // Visualizzazione: Carrello pieno
  return (
    <div className="container cart-page my-5">
      <h1>Il tuo Carrello</h1>

      <div className="row">

        {/* A. Area degli Articoli (Lista) */}
        <div className="col-lg-8 cart-items-list">
          {items.map(item => (
            <div key={item.id} className="cart-item d-flex align-items-center mb-3 border-bottom pb-3">

              {/* Immagine e Dettagli */}
              <img src={item.image_url} alt={item.name} className="item-image me-3" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
              <div className="item-details flex-grow-1">
                <h5 className="item-name mb-0">{item.name}</h5>
                <small className="text-muted">Prezzo unitario: {formatCurrency(item.price)}</small>
              </div>

              {/* Controlli Quantità */}
              <div className="item-controls d-flex align-items-center mx-4">
                <button
                  // 3. LOGICA: Diminuisci la quantità
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="btn btn-sm btn-outline-danger"
                  disabled={item.quantity <= 1} // Disabilita se la quantità è 1
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  // 4. LOGICA: Aumenta la quantità
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="btn btn-sm btn-outline-success"
                >
                  +
                </button>
              </div>

              {/* Totale riga e Rimuovi */}
              <div className="item-actions text-end">
                <p className="fw-bold mb-1">{formatCurrency(item.price * item.quantity)}</p>
                <button
                  // 5. LOGICA: Rimuovi l'articolo
                  onClick={() => removeItem(item.id)}
                  className="btn btn-danger p-1"
                >
                  Rimuovi
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* B. Area del Riepilogo Ordine (Totali) */}
        <div className="col-lg-4 cart-summary bg-light p-4 rounded border order-cart">
          <h2>Riepilogo Ordine</h2>

          <div className="d-flex justify-content-between my-2">
            <span>Subtotale:</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>

          <div className="d-flex justify-content-between mb-3 border-bottom pb-3">
            <span>Spedizione:</span>
            <span className={shipping === 0 ? 'text-success fw-bold' : ''}>
              {shipping === 0 ? 'Gratuita' : formatCurrency(shipping)}
            </span>
          </div>

          <div className="d-flex justify-content-between summary-total mb-4">
            <h3 className="mb-0">Totale:</h3>
            <h3 className="mb-0">{formatCurrency(total)}</h3>
          </div>

          <Link className="btn btn-success w-100 checkout-btn" to={`/checkout`}>
            Procedi all'acquisto ({formatCurrency(total)})
          </Link>
        </div>

      </div>
    </div>
  );
}

export default CartPage;