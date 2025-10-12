import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SerieABanner({

  heightVh = 8,
  speedSec = 37,  // più alto = più lento
  gapRem = 2,
  logos,
}) {
  const defaultLogos = useMemo(
    () => [
      { name: "Inter", src: "/inter.png" },
      { name: "Milan", src: "/milan.png" },
      { name: "Juventus", src: "/juventus.png" },
      { name: "Napoli", src: "/napoli.png" },
      { name: "Roma", src: "/roma.png" },
      { name: "Lazio", src: "/lazio.png" },
      { name: "Atalanta", src: "/atalanta.png" },
      { name: "Fiorentina", src: "/fiorentina.png" },
      { name: "Bologna", src: "/bologna.png" },
      { name: "Torino", src: "/torino.png" },
      { name: "Genoa", src: "/genoa.png" },
      { name: "Udinese", src: "/udinese.png" },
      { name: "sassuolo", src: "/sassuolo.png" },
      { name: "Empoli", src: "/empoli.png" },
      { name: "Lecce", src: "/lecce.png" },
      { name: "Cagliari", src: "/cagliari.png" },
      { name: "Verona", src: "/verona.png" },
      { name: "Parma", src: "/parma.png" },
      { name: "Como", src: "/como.png" },
      { name: "Pisa", src: "/pisa.png" },
    ],
    []
  );
  const navigate = useNavigate();
  const data = logos?.length ? logos : defaultLogos;
  const [paused, setPaused] = useState(false);

  const handleClick = (teamName) => {
    // crea l'URL con query ?name=Squadra
    const query = `?name=${encodeURIComponent(teamName)}`;
    navigate(`/search${query}`);
  };

  return (
    <div
      className="serie-a-banner"
      style={{
        "--h": `${heightVh}vh`,
        "--speed": `${speedSec}s`,
        "--gap": `${gapRem}rem`,
      }}
    >
      <div className={`track ${paused ? "paused" : ""}`}>
        {/* Prima sequenza (100% larghezza) */}
        <ul className="sequence">
          {data.map((t, i) => (
            <React.Fragment key={t.name}>
              <li className="item">
                <button
                  className="badge"
                  onClick={() => handleClick(t.name)}
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                  aria-label={t.name}
                  title={t.name}
                >
                  <img src={t.src} alt={t.name} draggable="false" />
                </button>
              </li>
              {/* ✅ SEPARATORE: mostrato solo se non è l'ultimo */}
            </React.Fragment>
          ))}
        </ul>


        {/* Duplicato, stesso contenuto, per loop senza salto */}
        <ul className="sequence" aria-hidden="true">
          {data.map((t, i) => (
            <React.Fragment key={`${t.name}-dup-${i}`}>
              <li className="item">
                <button
                  className="badge"
                  onClick={() => handleClick(t.name)}
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                  aria-label={t.name}
                  title={t.name}
                  tabIndex={-1}
                >
                  <img src={t.src} alt="" aria-hidden="true" draggable="false" />
                </button>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>

      <style>{`
        .serie-a-banner {
          width: 100%;
          height: var(--h);
          overflow: hidden;
          position: relative;
          user-select: none;
          -webkit-user-select: none;
           -webkit-mask-image: linear-gradient(to right, transparent 0, black 4rem, black calc(100% - 4rem), transparent 100%);
  mask-image: linear-gradient(to right, transparent 0, black 4rem, black calc(100% - 4rem), transparent 100%);
        }

        /* Traccia che si muove da 0 a -100% (due sequenze = 200%) */
        .track {
          display: flex;
          width: 200%;
          height: 100%;
          animation: marquee var(--speed) linear infinite;
          will-change: transform;
        }
        .track.paused { animation-play-state: paused; }

        /* Ogni sequenza occupa il 100% della larghezza del banner */
        /* niente padding/margini alle sequenze */
        .sequence {
          flex: 0 0 100%;
          display: flex;
          align-items: center;
          gap: var(--gap);
          padding: 0;
          margin: 0;
          list-style: none;
          height: 100%;
        }

        /* gli item non devono avere margini impliciti */
        .sequence > .item { 
          flex: 0 0 auto;
          margin: 0;
        }

        /* annulla lo “spazio” tra la fine della 1ª e l’inizio della 2ª sequenza */
        .sequence + .sequence {
          margin-left: calc(var(--gap) * -1);
        }
        .badge {
          display: inline-grid;
          place-items: center;
          background: transparent;
          border: 0;
          padding: 0;
          cursor: pointer;
          outline: none;
          height: calc(var(--h) * 0.9);
          aspect-ratio: 1 / 1;
          border-radius: 9999px;
          transition: transform 160ms ease, filter 160ms ease;
        }

        .badge img {
          display: block;
          max-height: 80%;
          max-width: 80%;
          object-fit: contain;
          filter: drop-shadow(0 1px 2px rgba(0,0,0,.25));
          pointer-events: none;
        }

        .badge:hover,
        .badge:focus-visible {
          transform: scale(1.40);
          filter: brightness(1.05);
        }

        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-100%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .track { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
