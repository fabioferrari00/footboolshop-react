import React from "react";
import "./Consigliati.css";

const Consigliati = () => {
  const images = [
    "https://store.inter.it/images/inter/products/small/IN24A01.webp",
    "https://store.inter.it/images/inter/products/large/IN25A05.webp",
    "https://www.nencinisport.it/images/width-def/background-def/format-def/end/articoli/nike_inter_stadium_home_20252026_jr_shorts_3231436_dettaglio_02_20250606104946.png",
    "https://img01.ztat.net/article/spp-media-p1/7e2ed94ee6ed41a8a454263f232d3b0e/fd1341cc6e184d74a58ec924e733d68c.jpg?imwidth=1800&filter=packshot",
    "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRwndiBl3b-MSOXhNLbN48kuz-PzQAB2lBkuunJIJx6GH7XlAz-sSRz5Y6YTLgvzBOAaH9SXcYmZIm46Js7IMq1UGMK9bngJaAMTzHgSTqFx8MgO7aahNjr"
  ];

  return (
    <div id="carouselExample" className="carousel slide mt-5" data-bs-interval="false">
      <div className="carousel-inner">
        {/* Primo gruppo */}
        <div className="carousel-item active">
          <div className="row">
            <div className="col-12 col-md-4">
              <img src={images[0]} className="d-block w-100 rounded" alt="img1" />
            </div>
            <div className="col-12 col-md-4 d-none d-md-block">
              <img src={images[1]} className="d-block w-100 rounded" alt="img2" />
            </div>
            <div className="col-12 col-md-4 d-none d-md-block">
              <img src={images[2]} className="d-block w-100 rounded" alt="img3" />
            </div>
          </div>
        </div>

        {/* Secondo gruppo */}
        <div className="carousel-item">
          <div className="row">
            <div className="col-12 col-md-4">
              <img src={images[3]} className="d-block w-100 rounded" alt="img4" />
            </div>
            <div className="col-12 col-md-4 d-none d-md-block">
              <img src={images[4]} className="d-block w-100 rounded" alt="img5" />
            </div>
            <div className="col-12 col-md-4 d-none d-md-block"></div>
          </div>
        </div>
      </div>

      {/* Controlli */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
        <span className="visually-hidden">Precedente</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
        <span className="visually-hidden">Successivo</span>
      </button>
    </div>
  );
};

export default Consigliati;