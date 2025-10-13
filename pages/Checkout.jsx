import React, { useMemo, useState } from "react";
import axios from "axios";
import { useCart } from "../src/CartContext";
import emailjs from "@emailjs/browser";

export default function CheckoutPage() {
  const [errors, setErrors] = useState({});

  function getFormattedCartItems() {
    const LOCAL_STORAGE_KEY = "shoppingCart";
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!stored) return [];
    const cartItems = JSON.parse(stored);
    return cartItems.map((item) => ({
      products_id: item.id,
      product_name: item.name || item.product_name,
      quantity: item.quantity,
      price: item.price,
    }));
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

  // --- SCONTO: stati e util ---
  const { total: cartTotal } = useCart(); // totale dal carrello
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(null); // { code, type: 'percent'|'fixed', value, name }
  const [checkingDiscount, setCheckingDiscount] = useState(false);
  const [discountMsg, setDiscountMsg] = useState(null);

  const round2 = (n) => Math.round(Number(n) * 100) / 100;
  const total_price = useMemo(() => round2(cartTotal || 0), [cartTotal]);

  const discountedTotal = useMemo(() => {
    if (!discount) return total_price;
    if (discount.type === "percent") return round2(total_price * (1 - discount.value / 100));
    if (discount.type === "fixed") return Math.max(0, round2(total_price - discount.value));
    return total_price;
  }, [total_price, discount]);

  const discountAmount = useMemo(() => round2(total_price - discountedTotal), [total_price, discountedTotal]);

  // Verifica codice sconto leggendo TUTTA la lista /discounts
  const handleCheckDiscount = async () => {
    setDiscountMsg(null);
    setCheckingDiscount(true);

    try {
      const { data } = await axios.get("http://localhost:3000/discounts");
      // data = [{ id, name, value:"0.20", start_date, end_date }, ...]
      const now = new Date();

      const found = (data || []).find((d) => {
        if (!d?.name) return false;
        const sameCode = d.name.trim().toLowerCase() === discountCode.trim().toLowerCase();
        const startOk = !d.start_date || new Date(d.start_date) <= now;
        const endOk = !d.end_date || new Date(d.end_date) >= now;
        return sameCode && startOk && endOk;
      });

      if (!found) {
        setDiscount(null);
        setDiscountMsg({ type: "danger", text: "Codice non valido o scaduto." });
        return;
      }

      // value "0.20" -> 20 (percento)
      const fraction = Number(found.value);
      const percent = Math.round(fraction * 10000) / 100;

      setDiscount({
        code: found.name,
        name: found.name,
        type: "percent",
        value: percent,
      });

      setDiscountMsg({ type: "success", text: "Codice applicato correttamente." });
    } catch (e) {
      setDiscount(null);
      setDiscountMsg({ type: "danger", text: "Errore nella verifica del codice." });
    } finally {
      setCheckingDiscount(false);
    }
  };

  const handleRemoveDiscount = () => {
    setDiscount(null);
    setDiscountMsg(null);
    setDiscountCode("");
  };

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  // Invio form tramite post su axios
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔍 Controllo campi vuoti
    const newErrors = {};
    Object.entries(form).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = "Campo obbligatorio";
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setMessage(null);

    // Payload con sconto
    const payload = {
      status: 1,
      total_price: total_price, // totale pieno
      final_price: discountedTotal, // totale dopo sconto
      discount_code: discount?.code || null,
      discount_type: discount?.type || null,
      discount_value: discount?.value || null,
      ...form,
      items,
    };

    try {
      await axios.post("http://localhost:3000/orders/add-order", payload);
      setMessage({
        type: "success",
        text:
          "Grazie per aver acquistato da noi! Ordine ricevuto, controlla la tua mail per gli aggiornamenti della spedizione.",
      });

      // Svuota il carrello dal localStorage
      localStorage.removeItem("shoppingCart");

      //Prepara i dati per l'email
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
        total_price: discountedTotal.toFixed(2), // invia il totale finale
        items_list,
        discount_code: discount?.code || "",
      };

      // Invia al cliente (nuovo template)
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CUSTOMER,
        emailData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
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
          <div
            className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"} text-center`}
            role="alert"
          >
            {message.text}
          </div>
        )}

        {/* Mostra form e riepilogo solo se l'ordine NON è stato inviato */}
        {message?.type !== "success" && (
          <div className="row g-4">
            {/* Form */}
            <div className="col-12 col-lg-8">
              <div className="card shadow-sm border-0">
                <div className="card-body p-4">
                  <h2 className="h5 mb-3">Dati cliente</h2>

                  {/* CODICE SCONTO */}
                  <div className="mb-4">
                    <label className="form-label">Codice sconto</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Seguici su Snstagram per ottenere un codice sconto "
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        disabled={!!discount}
                      />
                      {!discount ? (
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={handleCheckDiscount}
                          disabled={!discountCode.trim() || checkingDiscount}
                        >
                          {checkingDiscount ? "Controllo..." : "Controlla"}
                        </button>
                      ) : (
                        <button type="button" className="btn btn-outline-secondary" onClick={handleRemoveDiscount}>
                          Rimuovi
                        </button>
                      )}
                    </div>
                    {discountMsg && (
                      <div
                        className={`mt-2 small alert py-2 px-3 ${discountMsg.type === "success" ? "alert-success" : "alert-danger"
                          }`}
                      >
                        {discountMsg.text}
                      </div>
                    )}
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <Field
                        label="Nome"
                        name="user_name"
                        value={form.user_name}
                        onChange={handleChange}
                        placeholder="Es. Alex"
                        error={errors.user_name}
                      />
                      <Field
                        label="Cognome"
                        name="user_surname"
                        value={form.user_surname}
                        onChange={handleChange}
                        placeholder="Es. Dessanai"
                        error={errors.user_surname}
                      />
                      <Field
                        type="email"
                        label="Email"
                        name="user_mail"
                        value={form.user_mail}
                        onChange={handleChange}
                        placeholder="esempio@mail.com"
                        error={errors.user_mail}
                      />
                      <Field
                        label="Telefono"
                        name="user_phone"
                        value={form.user_phone}
                        onChange={handleChange}
                        placeholder="Es. +39 349 1234567"
                        error={errors.user_phone}
                      />
                      <Field
                        label="Città"
                        name="user_city"
                        value={form.user_city}
                        onChange={handleChange}
                        placeholder="Es. Cagliari"
                        error={errors.user_city}
                      />
                      <Field
                        label="Indirizzo"
                        name="user_address"
                        value={form.user_address}
                        onChange={handleChange}
                        placeholder="Es. Via Roma 15"
                        full
                        error={errors.user_address}
                      />
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

            {/* Riepilogo */}
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
                        <span className="fw-semibold text-primary">
                          {(it.price * it.quantity).toFixed(2)} €
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3 p-3 bg-body-tertiary rounded border">
                    <div className="d-flex justify-content-between">
                      <span className="fw-semibold">Subtotale</span>
                      <span className="fw-semibold">{total_price.toFixed(2)} €</span>
                    </div>

                    {discount && (
                      <div className="d-flex justify-content-between mt-2">
                        <span className="text-success">
                          Sconto {discount.name} {discount.type === "percent" ? `(-${discount.value}%)` : ""}
                        </span>
                        <span className="text-success">- {discountAmount.toFixed(2)} €</span>
                      </div>
                    )}

                    <hr className="my-2" />
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fs-6 fw-bold">Totale</span>
                      <span className="fs-5 fw-bold text-primary">{discountedTotal.toFixed(2)} €</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* fine riepilogo */}
          </div>
        )}
      </div>
    </div>
  );
}

// Campo riutilizzabile
function Field({ label, name, value, onChange, type = "text", placeholder, full = false, error }) {
  return (
    <div className={full ? "col-12" : "col-12 col-md-6"}>
      <label className="form-label">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`form-control ${error ? "is-invalid" : ""}`}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}
