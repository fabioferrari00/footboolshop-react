import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useState, useEffect } from 'react';

const ProductsPage = () => {

  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    axios.get("http://localhost:3000/products").then((resp) => {
      setProducts(resp.data)
    })
  }

  useEffect(fetchProducts, [])

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex justify-content-center my-4">
          <h1>Un ampio catalogo a tua Disposizione!</h1>
        </div>

      </div>
      <div className="row gy-3">
        {products.map((product) => {

          return (
            <div className="col-12 col-md-6 col-lg-4" >
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
  )
}

export default ProductsPage
