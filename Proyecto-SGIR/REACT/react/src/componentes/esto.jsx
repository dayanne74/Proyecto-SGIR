import React from 'react';
import './styles.css';
import imgmedellin from '/src/assets/reservas/Medellin-caja.jpg';
import imgcartagena from '/src/assets/reservas/cartagena-caja.jpg';
import imgsanandres from '/src/assets/reservas/sanandres-caja.jpg';
import imgcafetero from '/src/assets/reservas/cafetero-caja.jpg';
import imgmarta from '/src/assets/reservas/marta-caja.jpg';
import imgcali from '/src/assets/reservas/cali-caja.jpg';

import '@fortawesome/fontawesome-free/css/all.min.css'; // Si decides seguir utilizando los iconos de FontAwesome

function PaquetesEspeciales() {
  return (
    <div className="container my-5"style={{ fontFamily: 'Lato, sans-serif' }}>
      <h2 className="text-center">Lugares Preferidos</h2>

      {/* Carrusel de Bootstrap */}
      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel"style={{ fontFamily: 'Lato, sans-serif' }}>
        <div className="carousel-inner">
          {/* Primer item del carrusel */}
          <div className="carousel-item active">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              <div className="col">
                <div className="card">
                  <img src={imgmedellin} className="card-img-top" alt="Destino 1" />
                  <div className="card-body">
                    <h5 className="card-title">Medellín</h5>
                    <p className="card-text">Disfruta de la ciudad de la eterna primavera.</p>
                    <div className="card-footer bg-transparent border-0 text-center">
                        <button className="btn btn-primary">
                            <i className="fas fa-umbrella-beach me-2"></i> Ver Más
                        </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <img src={imgcartagena} className="card-img-top" alt="Destino 2" />
                  <div className="card-body">
                    <h5 className="card-title">Cartagena</h5>
                    <p className="card-text">Explora las playas y la historia de Cartagena.</p>
                    <div className="card-footer bg-transparent border-0 text-center">
                        <button className="btn btn-primary">
                            <i className="fas fa-plane-departure me-2"></i> Ver Más
                        </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <img src={imgsanandres} className="card-img-top" alt="Destino 3" />
                  <div className="card-body">
                    <h5 className="card-title">San Andrés</h5>
                    <p className="card-text">Relájate en las aguas cristalinas de San Andrés.</p>
                    <div className="card-footer bg-transparent border-0 text-center">
                        <button className="btn btn-primary">
                            <i className="fa-solid fa-bus"></i> Ver Más
                            
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Segundo item del carrusel */}
          <div className="carousel-item">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              <div className="col">
                <div className="card">
                  <img src={imgcafetero} className="card-img-top" alt="Destino 4" />
                  <div className="card-body">
                    <h5 className="card-title">Eje Cafetero</h5>
                    <p className="card-text">Disfruta de la magia de la región cafetera.</p>
                    <div className="card-footer bg-transparent border-0 text-center">
                        <button className="btn btn-primary">
                            <i className="fa-solid fa-tree"></i> Ver Más
                            
                        </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <img src={imgmarta} className="card-img-top" alt="Destino 5" />
                  <div className="card-body">
                    <h5 className="card-title">Santa Marta</h5>
                    <p className="card-text">Vive la historia y la playa en Santa Marta.</p>
                    <div className="card-footer bg-transparent border-0 text-center">
                        <button className="btn btn-primary">
                            <i className="fa-solid fa-sun"></i> Ver Más
                            
                        </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <img src={imgcali} className="card-img-top" alt="Destino 6" />
                  <div className="card-body">
                    <h5 className="card-title">Cali</h5>
                    <p className="card-text">Siente el ritmo de la salsa en Cali.</p>
                    <div className="card-footer bg-transparent border-0 text-center">
                        <button className="btn btn-primary">
                            <i className="fa-solid fa-map-location-dot"></i> Ver Más
                           
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controles de navegación (flechas) */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Fechas disponibles debajo de las tarjetas */}
      
    </div>
  );
}

export default PaquetesEspeciales;