import React from "react";
import './footer.css'
function Footer() {
  return (
    <footer className="footer-container">
      <section className="footer-top d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="social-text me-5 d-none d-lg-block">
          <span>Conoce nuestras Redes Sociales</span>
        </div>
        <div className="social-links">
          <a
            href="https://www.facebook.com/p/Caminantes-Por-Colombia-100049091809294/?locale=es_LA"
            className="social-icon facebook-icon"
            aria-label="Facebook"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://www.tiktok.com/@leoncaminantes"
            className="social-icon tiktok-icon"
            aria-label="Tiktok"
          >
            <i className="fab fa-tiktok"></i>
          </a>
          <a
            href="https://www.instagram.com/caminantespor_colombia/"
            className="social-icon instagram-icon"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#!" className="social-icon github-icon" aria-label="GitHub">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </section>

      <section>
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="footer-heading">
                <i className="fas fa-gem me-3"></i>Caminantes Por Colombia
              </h6>
              <p className="footer-description">
                En Caminantes por Colombia ofrecemos experiencias extraordinarias
                a través de caminatas escolares, excursiones, campamentos y
                deportes extremos. Diseñamos programas que combinan aventura,
                educación y diversión para personas de todas las edades.
              </p>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="footer-heading">Servicios</h6>
              <p>
                <a href="#!" className="footer-link">
                  Hotel
                </a>
              </p>
              <p>
                <a href="#!" className="footer-link">
                  Excursiones
                </a>
              </p>
              <p>
                <a href="#!" className="footer-link">
                  Paquetes Turísticos
                </a>
              </p>
            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="footer-heading">Políticas</h6>
              <p>
                <a
                  onClick={() => setPage("terminos-de-uso")}
                  className="footer-link"
                >
                  Términos de Uso
                </a>
              </p>
              <p>
                <a
                  onClick={() => setPage("politica-privacidad")}
                  className="footer-link"
                >
                  Política de Privacidad
                </a>
              </p>
              <p>
                <a
                  onClick={() => setPage("ayuda")}
                  className="footer-link"
                >
                  Ayuda
                </a>
              </p>
            </div>
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="footer-heading">Contacto</h6>
              <p className="contact-info">
                <i className="fas fa-home me-3"></i> Calle 65 No.79 C-04 Sur Bosa
                Centro
              </p>
              <p className="contact-info">
                <i className="fas fa-envelope me-3"></i>
                caminanteporcolombia@gmail.com
              </p>
              <p className="contact-info">
                <i className="fas fa-phone me-3"></i> + 57 312 2567578
              </p>
              <p className="contact-info">
                <i className="fas fa-print me-3"></i> + 57 321 9090547
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="footer-bottom text-center p-4">
        © 2023 Copyright:
        <a className="footer-link" href="">
          Caminantes Por Colombia
        </a>
      </div>
    </footer>
  );
}

export default Footer;