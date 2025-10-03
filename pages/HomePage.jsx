import Jumbotron from '../src/components/Jumbotron'
import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
      <Jumbotron />
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex justify-content-center my-4">
            <h2>ARTICOLI PIU RECENTI</h2>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <Link to={`/product/:id`}>
              <div className="card ">
                <img src="https://calcioitalia.com/media/cache/sylius_shop_product_large_thumbnail/71/53/65d1bc5be82a13bb5919c82b3927.jpeg" className="card-img-top" alt="Product 1" />

                <div className="card-body">
                  <h5 className="text-decoration-none card-title">Maglia Inter</h5>
                  <p className="text-decoration-none card-text">La maglia più brutta della storia.</p>
                  <a href="#" className="btn btn-primary">Aggiungi Al Carrello</a>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card">
              <img src="https://calcioitalia.com/media/cache/sylius_shop_product_large_thumbnail/1c/76/801e75123c83d43cdcdc15f20b78.jpeg" className="card-img-top" alt="Product 1" />
              <div className="card-body">
                <h5 className="card-title">Scarpe da Calcio</h5>
                <p className="card-text">Le migliori scarpe per il tuo gioco.</p>
                <a href="#" className="btn btn-primary">Aggiungi Al Carrello</a>
              </div>
            </div>

          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card">
              <img src="https://calcioitalia.com/media/cache/sylius_shop_product_large_thumbnail/1c/76/801e75123c83d43cdcdc15f20b78.jpeg" className="card-img-top" alt="Product 1" />
              <div className="card-body">
                <h5 className="card-title">Scarpe da Calcio</h5>
                <p className="card-text">Le migliori scarpe per il tuo gioco.</p>
                <a href="#" className="btn btn-primary">Aggiungi Al Carrello</a>
              </div>
            </div>

          </div>

        </div>
        <div className="row mb-4">
          <div className="col-12 d-flex justify-content-center my-4">
            <h2>ARTICOLI A CASO</h2>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card">
              <img src="https://calcioitalia.com/media/cache/sylius_shop_product_large_thumbnail/1c/76/801e75123c83d43cdcdc15f20b78.jpeg" className="card-img-top" alt="Product 1" />
              <div className="card-body">
                <h5 className="card-title">Scarpe da Calcio</h5>
                <p className="card-text">Le migliori scarpe per il tuo gioco.</p>
                <a href="#" className="btn btn-primary">Aggiungi Al Carrello</a>
              </div>
            </div>

          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card">
              <img src="https://calcioitalia.com/media/cache/sylius_shop_product_large_thumbnail/1c/76/801e75123c83d43cdcdc15f20b78.jpeg" className="card-img-top" alt="Product 1" />
              <div className="card-body">
                <h5 className="card-title">Scarpe da Calcio</h5>
                <p className="card-text">Le migliori scarpe per il tuo gioco.</p>
                <a href="#" className="btn btn-primary">Aggiungi Al Carrello</a>
              </div>
            </div>

          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card">
              <img src="https://calcioitalia.com/media/cache/sylius_shop_product_large_thumbnail/1c/76/801e75123c83d43cdcdc15f20b78.jpeg" className="card-img-top" alt="Product 1" />
              <div className="card-body">
                <h5 className="card-title">Scarpe da Calcio</h5>
                <p className="card-text">Le migliori scarpe per il tuo gioco.</p>
                <a href="#" className="btn btn-primary">Aggiungi Al Carrello</a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div >
  )
}

export default HomePage
