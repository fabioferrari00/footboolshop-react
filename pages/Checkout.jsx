import React, { useMemo, useState } from "react";
import axios from "axios";
import { useCart } from "../src/CartContext";
import emailjs from "@emailjs/browser"; // ⬅️ importa in cima

export default function CheckoutPage() {

  function getFormattedCartItems() {
    const LOCAL_STORAGE_KEY = 'shoppingCart';

    // 1️Recupero stringa salvata
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!stored) return []; // Nessun carrello salvato

    // 2️Converto la stringa in array di oggetti
    const cartItems = JSON.parse(stored);

    // 3️ Mappo i campi per rinominare le chiavi
    const formatted = cartItems.map(item => ({
      products_id: item.id,             // rinomina id
      product_name: item.name || item.product_name, // supporta entrambi
      quantity: item.quantity,
      price: item.price
    }));

    return formatted;
  }

  const items = getFormattedCartItems();

  const [form, setForm] = useState({
    user_name: "",
    user_surname: "",
    user_mail: "",
    user_phone: "",
    user_city: "",
    user_address: "",
  });


  //  Prodotti statici D A R E C U P E R A R E   D A C A R T !!!!!!!

  const total_price = useCart().total


  //    D A     R E C U P E R A R E   D A C A R T !!!!!!!

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  // Invio form tramite post su axios

  // ...

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      status: 1,
      total_price: Number(total_price.toFixed(2)),
      ...form,
      items,
    };

    setMessage(null);

    try {
      // 1️⃣ Invio ordine al backend
      const res = await axios.post("http://localhost:3000/orders/add-order", payload);
      setMessage({ type: "success", text: "Ordine inviato!" });

      // 2️⃣ Prepara i dati per l'email
      const items_list = items
        .map((it) => `${it.product_name} (x${it.quantity}) - €${(it.price * it.quantity).toFixed(2)}`)
        .join("\n");

      const emailData = {
        user_name: form.user_name,
        user_surname: form.user_surname,
        user_mail: form.user_mail,
        user_phone: form.user_phone,
        user_city: form.user_city,
        user_address: form.user_address,
        total_price: total_price.toFixed(2),
        items_list,
      };

      const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      await emailjs.send(serviceID, templateID, emailData, publicKey);

      console.log("✅ Email inviata con successo!");
    } catch (err) {
      console.error("Errore:", err);
      setMessage({ type: "error", text: "Errore nell'invio. Riprova." });
    }
  };


  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="display-6 fw-bold text-primary mt-2">Completa il tuo ordine</h1>
          <p className="text-muted">Inserisci i tuoi dati, rivedi il riepilogo e conferma.</p>
        </div>

        {/* Messaggi */}
        {message && (
          <div className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"} text-center`} role="alert">
            {message.text}
          </div>
        )}

        <div className="row g-4">
          {/* Form */}
          <div className="col-12 col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <h2 className="h5 mb-3">Dati cliente</h2>
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <Field label="Nome" name="user_name" value={form.user_name} onChange={handleChange} placeholder="Es. Alex" />
                    <Field label="Cognome" name="user_surname" value={form.user_surname} onChange={handleChange} placeholder="Es. Dessanai" />
                    <Field type="email" label="Email" name="user_mail" value={form.user_mail} onChange={handleChange} placeholder="esempio@mail.com" />
                    <Field label="Telefono" name="user_phone" value={form.user_phone} onChange={handleChange} placeholder="Es. +39 349 1234567" />
                    <Field label="Città" name="user_city" value={form.user_city} onChange={handleChange} placeholder="Es. Cagliari" />
                    <Field label="Indirizzo" name="user_address" value={form.user_address} onChange={handleChange} placeholder="Es. Via Roma 15" full />
                  </div>

                  <div className="d-flex gap-2 mt-4">
                    <button type="submit" className="btn btn-primary px-4">
                      Paga
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>



          {/* Riepilogo  dati D A R E C U P E R A R E*/}
          <div className="col-12 col-lg-4">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <h2 className="h5 mb-3">Riepilogo</h2>
                <ul className="list-group list-group-flush">
                  {items.map((it, idx) => (

                    <li key={idx} className="list-group-item d-flex justify-content-between align-items-start px-0">
                      <div className="me-3">
                        <div className="fw-semibold">{it.product_name}</div>
                        <small className="text-muted">Quantità: {it.quantity}</small>
                      </div>
                      <span className="fw-semibold text-primary">{(it.price * it.quantity).toFixed(2)} €</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 p-3 bg-body-tertiary rounded border">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-semibold">Totale</span>
                    <span className="fs-5 fw-bold text-primary">{total_price.toFixed(2)} €</span>
                  </div>
                </div>
                <small className="text-muted d-block mt-2">* Prodotti fissi per la demo. I dati cliente provengono dal form.</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//funzione per che crea oggetto 
function Field({ label, name, value, onChange, type = "text", placeholder, full = false }) {
  return (
    <div className={full ? "col-12" : "col-12 col-md-6"}>
      <label className="form-label">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="form-control"
      />
    </div>
  );
}
