import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { useFavorites } from '../src/components/FavoritesContext';

const ProductsPage = () => {

  const [products, setProducts] = useState([]);
  const { favorites, toggleFavorite } = useFavorites();

  
  

  const fetchProducts = () => {
    axios.get("http://localhost:3000/products").then((resp) => {
      setProducts(resp.data)
    })
  }
  useEffect(() => {
  fetchProducts();
  
}, []);


  


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
              <div  key={product.id} className="col-12 col-md-6 col-lg-4  noDecoration" >
                <Link to={`/product/${product.slug}`} state={{
                  id: product.id
                }} >
                  <div className="card " >
                    <img src={product.image_url} className="card-img-top" alt="Product 1" />

                    <div className="card-body">
                      <h5 className="text-decoration-none card-title">{product.name}</h5>
                      <p className="text-decoration-none card-text">{product.description}</p>
                    </div>
                    <div className="card-footer text-end">
                      <button
                        className="btn btn-link p-0"
                        onClick={(e) => {
                          e.preventDefault(); 
                          toggleFavorite(product.id);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={solidHeart}
                          style={{ color: favorites.includes(product.id) ? 'red' : 'gray' }}
                        />
                      </button>
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
              <div  key={product.id} className="col-12 col-md-6 col-lg-4  noDecoration" >
                <Link to={`/product/${product.slug}`} state={{
                  id: product.id
                }} >
                  <div className="card " >
                    <img src={product.image_url} className="card-img-top" alt="Product 1" />

                    <div className="card-body">
                      <h5 className="text-decoration-none card-title">{product.name}</h5>
                      <p className="text-decoration-none card-text">{product.description}</p>
                    </div>
                    <div className="card-footer text-end">
                      <button
                        className="btn btn-link p-0"
                        onClick={(e) => {
                          e.preventDefault(); 
                          toggleFavorite(product.id);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={solidHeart}
                          style={{ color: favorites.includes(product.id) ? 'red' : 'gray' }}
                        />
                      </button>
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
              <div  key={product.id} className="col-12 col-md-6 col-lg-4  noDecoration" >
                <Link to={`/product/${product.slug}`} state={{
                  id: product.id
                }} >
                  <div className="card " >
                    <img src={product.image_url} className="card-img-top" alt="Product 1" />

                    <div className="card-body">
                      <h5 className="text-decoration-none card-title">{product.name}</h5>
                      <p className="text-decoration-none card-text">{product.description}</p>
                    </div>
                    <div className="card-footer text-end">
                      <button
                        className="btn btn-link p-0"
                        onClick={(e) => {
                          e.preventDefault(); 
                          toggleFavorite(product.id);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={solidHeart}
                          style={{ color: favorites.includes(product.id) ? 'red' : 'gray' }}
                        />
                      </button>
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
              <div  key={product.id} className="col-12 col-md-6 col-lg-4 noDecoration" >
                <Link to={`/product/${product.slug}`} state={{
                  id: product.id
                }} >
                  <div className="card " >
                    <img src={product.image_url} className="card-img-top" alt="Product 1" />

                    <div className="card-body">
                      <h5 className="text-decoration-none card-title">{product.name}</h5>
                      <p className="text-decoration-none card-text">{product.description}</p>
                    </div>
                    <div className="card-footer text-end">
                      <button
                        className="btn btn-link p-0"
                        onClick={(e) => {
                          e.preventDefault(); 
                          toggleFavorite(product.id);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={solidHeart}
                          style={{ color: favorites.includes(product.id) ? 'red' : 'gray' }}
                        />
                      </button>
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
              <div  key={product.id} className="col-12 col-md-6 col-lg-4 noDecoration " >
                <Link to={`/product/${product.slug}`} state={{
                  id: product.id
                }} >
                  <div className="card " >
                    <img src={product.image_url} className="card-img-top" alt="Product 1" />

                    <div className="card-body">
                      <h5 className="text-decoration-none card-title">{product.name}</h5>
                      <p className="text-decoration-none card-text">{product.description}</p>
                    </div>
                    <div className="card-footer text-end">
                      <button
                        className="btn btn-link p-0"
                        onClick={(e) => {
                          e.preventDefault(); 
                          toggleFavorite(product.id);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={solidHeart}
                          style={{ color: favorites.includes(product.id) ? 'red' : 'gray' }}
                        />
                      </button>
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
              <div  key={product.id} className="col-12 col-md-6 col-lg-4 noDecoration" >
                <Link to={`/product/${product.slug}`} state={{
                  id: product.id
                }} >
                  <div className="card " >
                    <img src={product.image_url} className="card-img-top" alt="Product 1" />

                    <div className="card-body">
                      <h5 className="text-decoration-none card-title">{product.name}</h5>
                      <p className="text-decoration-none card-text">{product.description}</p>
                    </div>
                    <div className="card-footer text-end">
                      <button
                        className="btn btn-link p-0"
                        onClick={(e) => {
                          e.preventDefault(); 
                          toggleFavorite(product.id);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={solidHeart}
                          style={{ color: favorites.includes(product.id) ? 'red' : 'gray' }}
                        />
                      </button>
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
