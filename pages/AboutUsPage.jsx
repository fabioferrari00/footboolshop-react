import React from "react";

const AboutUsPage = () => {
  return (
    <div className="about-page bg-light min-vh-100 py-5">
      <div className="container text-center">
        <h1 className="display-5 fw-bold text-primary mb-4">Chi siamo</h1>
        <p className="lead text-muted mb-5">
          Siamo <strong>Fabio</strong>, <strong>Alexandru</strong>, <strong>Sol</strong>, <strong>Sergio</strong> e <strong>Manuel</strong>:
          un gruppo di sviluppatori appassionati che lavorano insieme a un progetto ambizioso.
          È una bella sfida, ma anche un’esperienza entusiasmante che ci sta facendo crescere ogni giorno 💪
        </p>


        <p className="mt-5 text-muted">
          🚀 Insieme stiamo costruendo qualcosa di grande, un passo alla volta.
        </p>
      </div>
    </div>
  );
};

export default AboutUsPage;