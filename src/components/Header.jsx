import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <header className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid d-flex justify-content-between">
        <div className='d-flex align-items-center'>
          <Link to={`/`}>
            <img className='logo' src="/footboolshop_logo.png" alt="Logo" />
          </Link>
          <h2>FootBoolShop</h2>
        </div>
        <div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav">
              <Link className="nav-item nav-link" aria-current="page" to={`/`}>Home</Link>
              <Link className="nav-item nav-link" to={`/products`}>Prodotti</Link>
              <Link className="nav-item nav-link" to={`/favorites`}>
              <FontAwesomeIcon icon={faHeart} style={{ color: 'red', marginRight: '5px' }} />
               Preferiti </Link>
              <Link className="nav-item nav-link" to={`/contacts`}>Contatti</Link>
              <Link className="nav-item nav-link" to={`/about_us`}>Chi siamo</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
