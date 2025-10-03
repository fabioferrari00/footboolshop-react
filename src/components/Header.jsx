import React from 'react';
import { Link, NavLink } from 'react-router-dom';


const Header = () => {
  return (
    <header>

      <NavLink>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <div className='w-150'>
              <img className='logo' src="/footboolshop_logo.png" alt="Logo" />
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <NavLink className="navbar-nav">
                <Link className="nav-item nav-link" aria-current="page" to={`/`}>Home</Link>
                <Link className="nav-item nav-link" to={`/products`}>Prodotti</Link>
                <Link className="nav-item nav-link" to={`/contacts`}>Contatti</Link>
                <Link className="nav-item nav-link" to={`/about_us`}>Chi siamo</Link>
              </NavLink>
            </div>
          </div>
        </nav>
      </NavLink>

    </header>
  )
}

export default Header
