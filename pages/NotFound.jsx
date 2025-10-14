import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      className="container text-center d-flex flex-column justify-content-center align-items-center"
      style={{
        backgroundColor: "#f8f9fa",
        minHeight: "50vh",
        paddingBottom: "2rem",
      }}
    >
      {/* Immagine */}
      <img
        src="/fuorigioco.webp"
        alt="Fuorigioco"
        className="mb-3"
        style={{
          maxWidth: "230px",
          width: "75%",
          height: "auto",
          borderRadius: "12px",
          boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
          objectFit: "cover",
        }}
      />

      {/* Testo principale */}
      <h1 className="display-6 fw-bold text-secondary mb-1">404</h1>
      <p className="text-muted mb-4">
        Sei finito in fuorigioco... la pagina non esiste!
      </p>

      {/* Bottone Home */}
      <Link
        to="/"
        className="btn btn-lg fw-semibold rounded-pill px-4 py-2"
        style={{
          backgroundColor: "#20c997",
          border: "none",
          color: "#fff",
          boxShadow: "0 3px 8px rgba(32, 201, 151, 0.3)",
          transition: "all 0.2s ease-in-out",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#17a589")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#20c997")}
      >
        Torna alla Home
      </Link>
    </div>
  );
}
