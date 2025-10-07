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
          <h1 className='title' >Un ampio catalogo a tua Disposizione!</h1>
        </div>

      </div>
      <div className="row gy-3 my-4">
        <h2 className='section_team' >Inter</h2>
        {products.map((product) => {
          if (product.team_name == "Inter")
            return (
              <div className="col-12 col-md-6 col-lg-4  noDecoration" >
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
        })}
      </div>
      <div className="row gy-3  my-4">
        <h2 className='section_team' >Milan</h2>
        {products.map((product) => {
          if (product.team_name == "Milan")
            return (
              <div className="col-12 col-md-6 col-lg-4  noDecoration" >
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
        })}
      </div>
      <div className="row gy-3 my-4">
        <h2 className='section_team' >Roma</h2>
        {products.map((product) => {
          if (product.team_name == "Roma")
            return (
              <div className="col-12 col-md-6 col-lg-4  noDecoration" >
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
        })}
      </div>
      <div className="row gy-3 my-4">
        <h2 className='section_team' >Cagliari</h2>
        {products.map((product) => {
          if (product.team_name == "Cagliari")
            return (
              <div className="col-12 col-md-6 col-lg-4 noDecoration" >
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
        })}
      </div>
      <div className="row gy-3 my-4">
        <h2 className='section_team' >Juventus</h2>
        {products.map((product) => {
          if (product.team_name == "Juventus")
            return (
              <div className="col-12 col-md-6 col-lg-4 noDecoration " >
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
        })}
      </div>
      <div className="row gy-3 my-4">
        <h2 className='section_team'>Napoli</h2>
        {products.map((product) => {
          if (product.team_name == "Napoli")
            return (
              <div className="col-12 col-md-6 col-lg-4 noDecoration" >
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
        })}
      </div>
    </div>
  )
}

export default ProductsPage
