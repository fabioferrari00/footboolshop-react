import React from 'react'

const ContactsPage = () => {
  return (
    <div className="contact-page bg-light min-vh-100 py-5">
      <div className="container text-center">
        <h1 className="display-6 fw-bold text-primary mb-3">Contattaci</h1>
        <p className="text-muted mb-4">Siamo felici di sentirti, ma il sito è ancora in costruzione 🚧</p>

        <div className="card shadow-sm border-0 mx-auto" style={{ maxWidth: "600px" }}>
          <div className="card-body p-4">
            <form>
              <div className="mb-3 text-start">
                <label className="form-label">Nome</label>
                <input type="text" className="form-control" placeholder="Es. Fabio" disabled />
              </div>

              <div className="mb-3 text-start">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" placeholder="esempio@mail.com" disabled />
              </div>

              <div className="mb-3 text-start">
                <label className="form-label">Messaggio</label>
                <textarea className="form-control" rows="4" placeholder="Scrivi qui il tuo messaggio..." disabled></textarea>
              </div>

              <button type="button" className="btn btn-secondary w-100" disabled>
                Invia (non attivo)
              </button>
            </form>
          </div>
        </div>

        <div className="mt-4 text-muted">
          <small>🛠️ Il modulo sarà presto disponibile. Grazie per la pazienza!</small>
        </div>
      </div>
    </div>
  );
}

export default ContactsPage
