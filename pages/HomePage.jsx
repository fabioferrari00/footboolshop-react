import Jumbotron from '../src/components/Jumbotron'
import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useState, useEffect } from 'react';

const HomePage = () => {

  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    axios.get("http://localhost:3000/products").then((resp) => {
      setProducts(resp.data)
    })
  }

  useEffect(fetchProducts, [])


  return (
    <>
      <Jumbotron />
      <div className="container">
        <div className="row gy-3">
          <div className="col-12 d-flex justify-content-center my-4">
            <h2 className='title_section mt-5'>ARTICOLI PIU RECENTI</h2>
          </div>
          {products.map((product) => {
            if (product.arrival_date >= "2025-10-02")

              return (
                <div className="col-12 col-md-6 col-lg-4 noDecoration" key={product.id}>
                  <Link to={`/product/${product.slug}`} state={{
                    id: product.id
                  }} >
                    <div className="card " >
                      <img src={product.image_url} className="card-img-top" alt="Product 1" />

                      <div className="card-body">
                        <h5 className="text-decoration-none card-title">{product.name}</h5>
                        <p className="text-decoration-none card-text">{product.description}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              )
          })
          }
        </div>
        <div className="row mb-4">
          <div className="col-12 d-flex justify-content-center my-4">
            <h2 className='title_section mt-5'>ARTICOLI PER BAMBINI</h2>
          </div>
          {products.map((product) => {
            if (product.size == "XXS" || product.size == 36)

              return (
                <div className="col-12 col-md-6 col-lg-4 noDecoration" key={product.id}>
                  <Link to={`/product/${product.slug}`} state={{
                    id: product.id
                  }} >
                    <div className="card " >
                      <img src={product.image_url} className="card-img-top" alt="Product 1" />

                      <div className="card-body">
                        <h5 className="text-decoration-none card-title">{product.name}</h5>
                        <p className="text-decoration-none card-text">{product.description}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              )
          })
          }
        </div>
      </div>
    </>
  )
}
export default HomePage
