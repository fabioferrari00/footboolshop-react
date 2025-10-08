import React from 'react'
import { Link } from 'react-router-dom'

const Card_Prod = (product) => {
  return (
    <div className="col-12 col-md-6 col-lg-4  noDecoration">
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
}


export default Card_Prod
