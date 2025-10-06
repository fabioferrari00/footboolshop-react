import React from "react";
import "./Consigliati.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Consigliati = ({ team, excludeId }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (!team) return;
    setLoading(true);
    setErr(null);
    axios
      .get("http://localhost:3000/products")
      .then((r) => {
        const related = r.data.filter(
          (p) => p.team_name === team && p.id !== excludeId
        );
        setItems(related);
      })
      .catch((e) => setErr(e?.message || "Errore"))
      .finally(() => setLoading(false));
  }, [team, excludeId]);

  // gruppi da 2 per slide
  const chunk = (arr, size) =>
    arr.reduce((acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]), []);
  const slides = chunk(items, 2);

  if (!team || loading || err || !items.length) {
    return null; // mantieni la pagina pulita se non c'è nulla da mostrare
  }

  return (
    <section className="related-wrap mt-5">
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
        <h3 className="related-title m-0">Articoli correlati</h3>
        <span className="related-badge">Altri {team}</span>
      </div>

      <div id="carouselRelated" className="carousel slide" data-bs-interval="false">
        {/* Indicatori (puntini) solo se più di una slide */}
        {slides.length > 1 && (
          <div className="carousel-indicators">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                data-bs-target="#carouselRelated"
                data-bs-slide-to={i}
                className={i === 0 ? "active" : ""}
                aria-current={i === 0 ? "true" : "false"}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        )}

        <div className="carousel-inner">
          {slides.map((group, idx) => (
            <div key={idx} className={`carousel-item ${idx === 0 ? "active" : ""}`}>
              <div className="row g-3">
                {group.map((p) => (
                  <div key={p.id} className="col-12 col-md-6">
                    <Link
                      to={`/product/${p.slug}`}
                      state={{ id: p.id }}
                      className="text-decoration-none"
                    >
                      <div className="related-card shadow-sm">
                        <div className="ratio ratio-4x3 related-imgwrap">
                          <img
                            src={p.image_url}
                            className="w-100 h-100 rounded-top object-fit-contain"
                            alt={p.name}
                            loading="lazy"
                          />
                        </div>
                        <div className="product-caption px-3 py-2">
                          <div className="caption-name">{p.name}</div>
                          {p.price != null && (
                            <div className="caption-price">€ {Number(p.price).toFixed(2)}</div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
                {group.length < 2 && <div className="col-12 col-md-6 d-none d-md-block" />}
              </div>
            </div>
          ))}
        </div>

        {/* Controlli */}
        {slides.length > 1 && (
          <>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselRelated"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" />
              <span className="visually-hidden">Precedente</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselRelated"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" />
              <span className="visually-hidden">Successivo</span>
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default Consigliati;
