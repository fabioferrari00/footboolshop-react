import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Consigliati from '../src/components/Consigliati';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';




const DetailProductPage = () => {
  const [product, setProduct] = useState({});


  //recupero slug
  const { slug } = useParams();


  const fetchProduct = () => {
    axios.get(`http://localhost:3000/products/${slug}`).then((resp) => {
      setProduct(resp.data)
      console.log(resp.data)
    })
  }

  useEffect(fetchProduct, [slug])


  return (
    <div className="container my-5">
      <div className="row g-4">
        <div className="col-md-6">
          <img src={product.image_url} alt={product.name} className='img-fluid rounded product-image' />
        </div>
        {/*dettagi prodotto*/}
        <div className="col-md-6">
          <div className="d-flex">
            <h1>{product.name}</h1>
            <Link to={`/products/${slug}/edit`}><i className='fas fa-edit'></i></Link>
          </div>
          <h2 className='text-success'>{`€ ${product.price}`}</h2>
          <p>{product.description}</p>
          <p>{`Squadra: ${product.team_name}`}</p>
          <p>{`Taglia: ${product.size}`}</p>


          <div className='mt-4'>
            <button className='btn btn-primary me-2'>Aggiungi al carrellino</button>
            
          </div>
        </div>
      </div>
      <Consigliati team={product.team_name} excludeId={product.id} />
    </div>
  )
}

export default DetailProductPage
