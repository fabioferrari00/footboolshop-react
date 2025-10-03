import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

const DetailProductPage = () => {
  //detaglio statico del prodotto 
  const prodotto = {

    nome: "Maglia Home Inter 2025",
    prezzo: "€89,90",
    descrizione: "Maglia ufficiale da gara Inter 2025 in tessuto tecnico traspirante con dettagli ricamati.",
    immagine: "https://calcioitalia.com/media/cache/sylius_shop_product_large_thumbnail/71/53/65d1bc5be82a13bb5919c82b3927.jpeg",
    dettagli: [
      "Tessuto tecnico traspirante",
      "Taglie disponibili: S, M, L, XL",
      "100% poliestere",
    ]
  }
  return (
    <div className="container my-5">
      <div className="row g-4">
        <div className="col-md-6">
          <img src={prodotto.immagine} alt={prodotto.nome} className='img-fluid rounded' />
        </div>
        {/*dettagi prodotto*/}
        <div className="col-md-6">
          <h1>{prodotto.nome}</h1>
          <h2 className='text-success'>{prodotto.prezzo}</h2>
          <p>{prodotto.descrizione}</p>

          <h4>detagli:</h4>
          <ul>
            {prodotto.dettagli.map((dett, index) => (
              <li key={index}>{dett}</li>
            ))}
          </ul>
          <div className='mt-4'>
            <button className='btn btn-primary me-2'>Aggiungi al carrello</button>
            <button className='btn btn-primary me-2'>Preferiti</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailProductPage
