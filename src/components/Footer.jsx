import React from 'react'

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className='d-flex flex-column'>
              <h4 className='text-white align-self-baseline style'>Indossa la Storia.<br />Vivi la Passione.</h4>
              <div id='legal'>
                <p className='text-white bold'>Sede legale: via Cicciawaska n°69 <br />
                Cerignola (FG)</p>

              </div>
            </div>
          </div>
           <div className="col-6">
             <div id='socials d-flex justify-content-end align-items-center'>
               <div class="container text-center">
                 <h2 class="mb-4 text-white">Seguici sui Social!</h2>
                <div class="social-icons">
                 <a href="#" class="social-icon facebook me-3">
                    <i class="fab fa-facebook-f fa-2x"></i></a>
                  <a href="#" class="social-icon instagram me-3">
                    <i class="fab fa-instagram fa-2x"></i></a>
                  <a href="#" class="social-icon twitter me-3">
                    <i class="fab fa-twitter fa-2x"></i></a>
                  <a href="#" class="social-icon youtube">
                    <i class="fab fa-youtube fa-2x"></i></a>
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