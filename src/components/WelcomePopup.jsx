import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import axios from "axios";

// chiave per localStorage
const LS_KEY = "welcome_seen_v1";

export default function WelcomePopup({ onSubmit }) {
  // stati principali
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const API_BASE = "http://localhost:3000";

  // stato toast
  const [toast, setToast] = useState({
    visible: false,
    type: "success", // "success" | "error" | "info"
    message: "",
  });

  function showToast(type, message) {
    setToast({ visible: true, type, message });
    setTimeout(() => {
      setToast((t) => ({ ...t, visible: false }));
    }, 2500);
  }

  // helper per salvare i dati dell'utente
  async function saveUser({ name, mail }) {
    const res = await axios.post(`${API_BASE}/users`, { name, mail });
    return res.data;
  }

  // mostra il popup solo se non è già stato visto
  useEffect(() => {
    const seen = localStorage.getItem(LS_KEY);
    if (!seen) setVisible(true);
  }, []);

  // validazione base
  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Inserisci il tuo nome";
    if (!mail.trim()) e.mail = "Inserisci la tua email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) e.mail = "Email non valida";
    if (!termsAccepted) e.terms = "Devi accettare i Termini e Condizioni";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // chiude e salva nel localStorage
  const closeForever = () => {
    localStorage.setItem(LS_KEY, "1");
    setVisible(false);
  };

  // invio form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1) valida subito
    if (!validate()) return;

    // 2) salva su DB
    try {
      await saveUser({ name: name.trim(), mail: mail.trim() });
    } catch (err) {
      console.error("Errore salvataggio utente:", err);
      showToast("error", "Errore nel salvataggio, riprova più tardi.");
      return; // interrompe: niente email se non salviamo
    }

    // 3) callback esterna opzionale
    onSubmit?.({ name: name.trim(), mail: mail.trim(), date: new Date().toISOString() });

    // 4) invio email
    const templateParams = { name: name.trim(), mail: mail.trim() };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID_WELCOME,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          // Mostra toast e CHIUDI SUBITO il popup
          showToast("success", "Email inviata! Controlla la posta.");
          closeForever();
          // (opzionale) reset campi
          setName("");
          setMail("");
          setTermsAccepted(false);
          setErrors({});
        },
        (err) => {
          console.error("Errore invio email:", err);
          showToast("error", "Errore nell'invio dell'email, riprova più tardi.");
        }
      );
  };

  // annulla = chiudi e salva come visto
  const handleCancel = () => {
    closeForever();
  };

  return (
    <>
      {/* TOAST - sempre renderizzato, anche se il popup è chiuso */}
      {toast.visible && (
        <div
          role="status"
          aria-live="polite"
          className="position-fixed bottom-0 start-50 translate-middle-x mb-4 px-4 py-3 rounded-3 shadow d-flex align-items-center gap-2"
          style={{
            zIndex: 3000,
            minWidth: "280px",
            background:
              toast.type === "error"
                ? "#dc3545"
                : toast.type === "success"
                  ? "#198754"
                  : "#0d6efd",
            color: "#fff",
          }}
        >
          <strong className="me-1">
            {toast.type === "error" ? "Errore" : toast.type === "success" ? "Fatto" : "Info"}
          </strong>
          <span className="flex-grow-1">{toast.message}</span>
          <button
            type="button"
            className="btn-close btn-close-white ms-2"
            aria-label="Chiudi"
            onClick={() => setToast((t) => ({ ...t, visible: false }))}
          />
        </div>
      )}

      {/* POPUP */}
      {visible && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ background: "rgba(0,0,0,0.55)", zIndex: 2000 }}
        >
          <div className="bg-white rounded-4 shadow p-4" style={{ width: "min(92vw, 520px)" }}>
            <h3 className="mb-3">Benvenuto/a! 👋</h3>
            <p className="text-secondary mb-4">
              Occasione unica. Alla prima visita su FootBoolShop puoi ottenere uno sconto del 20% sul
              primo ordine. Inserisci la mail e riceverai subito un codice.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              {/* campo nome */}
              <div className="mb-3">
                <label className="form-label">
                  Nome <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Es. Alex"
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              {/* campo email */}
              <div className="mb-3">
                <label className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  name="mail"
                  className={`form-control ${errors.mail ? "is-invalid" : ""}`}
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                  placeholder="esempio@email.com"
                />
                {errors.mail && <div className="invalid-feedback">{errors.mail}</div>}
              </div>

              {/* checkbox obbligatoria */}
              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className={`form-check-input ${errors.terms ? "is-invalid" : ""}`}
                  id="termsCheck"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="termsCheck">
                  Accetto i Termini e Condizioni <span className="text-danger">*</span>
                </label>
                {errors.terms && <div className="invalid-feedback">{errors.terms}</div>}
              </div>

              {/* info privacy */}
              <p className="small text-muted mb-4">I tuoi dati saranno trattati in conformità al GDPR.</p>

              {/* bottoni */}
              <div className="d-flex gap-2 justify-content-end">
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  Annulla
                </button>
                <button type="submit" className="btn btn-primary">
                  Invia
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
