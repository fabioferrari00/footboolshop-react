import Jumbotron from '../src/components/Jumbotron'
import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { useFavorites } from "../src/components/FavoritesContext";

import Card_Prod from '../src/components/Card_Prod';
const HomePage = () => {

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
                <Card_Prod
                  key={product.id}
                  {...product} />
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
                <Card_Prod
                  key={product.id}
                  {...product} />
              )
          })
          }
        </div>
      </div>

    </>
  )
}
export default HomePage
