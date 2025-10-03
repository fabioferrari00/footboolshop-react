import React from 'react';
import { Link, NavLink } from 'react-router-dom';


const Header = () => {
  return (
    <header>
      <div className="container-fluid">
        <div className="row">
          <div className="header-btns col-12 d-flex justify-content-between me-3 mt-3">
            <img className='logo' src="./public/footboolshop_logo.png" alt="Logo" />
            <NavLink>
              <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                  <a class="navbar-brand" href="#">Navbar</a>
                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">Features</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">Pricing</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
