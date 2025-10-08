import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import axios from 'axios';

// 1. CONFIGURAZIONE BASE DEL CONTEXT

// Crea il Context (il "Tabellone Centrale")
const CartContext = createContext();

// Chiave per il localStorage
const LOCAL_STORAGE_KEY = 'shoppingCart'

// Hook personalizzato per usare il Context (rende l'importazione più pulita)
export const useCart = () => {
  // Connette il componente al Tabellone e legge i valori
  return useContext(CartContext);
};

// 2. FUNZIONE DI CALCOLO DEI TOTALI

// Questa funzione calcola i totali ogni volta che il carrello cambia
const calculateTotals = (items) => {
  const SHIPPING_COST = 8.00;
  const FREE_SHIPPING_THRESHOLD = 50.00;

  // Calcola il Subtotale totale (Prezzo * Quantità per ogni articolo)
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Calcola le Spese di Spedizione (gratis sopra la soglia)
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;

  const total = subtotal + shipping;

  return { subtotal, shipping, total };
};


// 3. IL PROVIDER (GESTORE DELLO STATO)

export const CartProvider = ({ children }) => {
  // Funzione per leggere lo stato iniziale dal localStorage
  const getInitialCartItems = () => {
    const storedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
    // Se ci sono articoli salvati, li parsifica e li usa, altrimenti inizia con un array vuoto
    return storedItems ? JSON.parse(storedItems) : [];
  };

  // Stato principale del carrello - INIZIALIZZATO CON LA FUNZIONE CHE LEGGE IL LOCAL STORAGE
  const [cartItems, setCartItems] = useState(getInitialCartItems);

  // EFFETTO: Ogni volta che cartItems cambia, salva il nuovo stato nel localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
    console.log("Carrello salvato in localStorage:", cartItems);
  }, [cartItems]); // Si attiva ogni volta che cartItems viene aggiornato

  // --- FUNZIONI DI MANIPOLAZIONE DELLO STATO ---

  // Funzione per Aggiungere o Aggiornare un articolo
  const addItem = (product, quantity = 1) => {
    // 1. CONVERSIONI FUORI dallo setter (più pulito)
    const numericPrice = parseFloat(product.price);
    const numericQuantity = parseInt(quantity);

    // Usciamo immediatamente se i dati non sono validi.
    if (numericQuantity <= 0 || isNaN(numericPrice)) return;

    setCartItems(prevItems => {
      // 2. USO '==' OVUNQUE per ignorare la differenza tra stringa e numero nell'ID
      const existingItem = prevItems.find(item => item.id == product.id);

      if (existingItem) {
        // Se esiste, aggiorno la quantità
        return prevItems.map(item =>
          item.id == product.id
            ? { ...item, quantity: item.quantity + numericQuantity }
            : item
        );
      } else {
        // Se non esiste, aggiungo un nuovo articolo (con prezzo e quantità come numeri)
        return [
          ...prevItems,
          {
            ...product,
            price: numericPrice, // Prezzo salvato come NUMERO
            quantity: numericQuantity // Quantità salvata come NUMERO
          }
        ];
      }
    });
  };

  // Funzione per Rimuovere completamente un articolo (ad esempio, tramite un bottone 'X')
  const removeItem = (productId) => {
    setCartItems(prevItems =>
      // Uso il filter per restituire un nuovo array ESCLUDENDO l'articolo da rimuovere
      prevItems.filter(item => item.id != productId)
    );
  };

  // Funzione per Aggiornare la quantità (usata da bottoni '+' o '-')
  const updateQuantity = (productId, newQuantity) => {
    // Se la quantità arriva a zero o meno, rimuovo l'articolo
    if (newQuantity <= 0) {
      removeItem(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id == productId
          ? { ...item, quantity: newQuantity } // Aggiorno solo la quantità
          : item
      )
    );
  };

  // Calcolo i totali ogni volta che cartItems cambia
  const totals = useMemo(() => calculateTotals(cartItems), [cartItems]);

  // Oggetto che contiene tutti i dati e le funzioni da rendere disponibili
  const contextValue = {
    // Dati e totali
    items: cartItems,
    ...totals,
    // Funzioni
    addItem,
    removeItem,
    updateQuantity,
    // Qui si possono aggiungere altre funzioni come 'clearCart'
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};