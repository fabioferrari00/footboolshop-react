import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container text-center py-5">
      <h1 className="display-5 fw-bold">404</h1>
      <p className="lead text-muted mb-4">Pagina non trovata.</p>
      <Link
        to="/"
        className="btn btn-lg fw-semibold rounded-pill px-4 py-2"
        style={{
          backgroundColor: "#20c997",   // verde acqua
          border: "none",
          color: "#fff",
          boxShadow: "0 3px 8px rgba(32, 201, 151, 0.3)",
          transition: "all 0.2s ease-in-out",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#17a589")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#20c997")}
      >
        Torna alla Home
      </Link>    </div>
  );
}