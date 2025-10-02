import React from 'react';
import { Link, NavLink } from 'react-router-dom';


const Header = () => {
  return (
    <header>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 d-flex justify-content-between me-3 mt-3">
            <img className='logo' src="./public/footboolshop_logo.png" alt="Logo" />
            <NavLink>
              <Link to="/">Home</Link>
              <Link to="/products">Prodotti</Link>
              <Link to="/contacts">Contatti</Link>
              <Link to="/about_us">Chi siamo</Link>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
