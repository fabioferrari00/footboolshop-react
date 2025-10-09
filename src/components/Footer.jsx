import React from 'react'

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className='d-flex flex-column'>
              <h2 className='text-white style motivational'>Indossa la Storia.<br />Vivi la Passione.</h2>
              <div id='legal'>
                <p className='text-white bold address'>Sede legale: via Cicciawaska n°69 <br />
                  Cerignola (FG)</p>

              </div>
            </div>
          </div>
          <div className="col-6">
            <div id='socials d-flex justify-content-end align-items-center'>
              <div className="container text-center">
                <h2 className="mb-4 text-white socials">Seguici sui Social!</h2>
                <div className="social-icons">
                  <a href="#" className="social-icon facebook me-3">
                    <i className="fab fa-facebook-f fa-2x"></i></a>
                  <a href="#" className="social-icon instagram me-3">
                    <i className="fab fa-instagram fa-2x"></i></a>
                  <a href="#" className="social-icon twitter me-3">
                    <i className="fab fa-twitter fa-2x"></i></a>
                  <a href="#" className="social-icon youtube">
                    <i className="fab fa-youtube fa-2x"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer