import React from "react";
import { Link } from "react-router-dom";

const Jumbotron = () => {
  return (
    <div className="hero-section text-white">
      <div>
        <h1 className="hero-title">IL CALCIO &Eacute; QUI. </h1>
        <p className="hero-subtitle">indossa la tua passione</p>
        <Link className="hero-btn" to={`/products`}>Acquista Subito!</Link>
      </div>
    </div>
  );
};


export default Jumbotron;