import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

const Card_Prod = (product) => {
  return (
    <div className="col-12 col-md-6 col-lg-4  noDecoration" key={product.id} >

      <Link to={`/product/${product.slug}`} state={{ id: product.id }} >
        <div className="card " >
          <img src={product.image_url} className="card-img-top" alt="Product 1" />
          <div className="card-body">
            <h5 className="text-decoration-none card-title">{product.name}</h5>
            <p className="text-decoration-none card-text">{product.description}</p>
            <span>{product.price}€</span>
          </div>
          <div className="card-footer text-end">
            <button className="btn btn-link p-0" onClick={(e) => { e.preventDefault(); }}>
              <FontAwesomeIcon icon={solidHeart} />

            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}


export default Card_Prod
