import React from 'react';
import { Link, NavLink } from 'react-router-dom';


const Header = () => {
  return (
    <header>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 d-flex justify-content-between">
            <h1>Logo</h1>
            <NavLink>
              <Link to="/">Home</Link>
              <Link to="products">Prodotti</Link>
              <Link to="contacts">Contatti</Link>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
