import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserTie, FaMapMarkerAlt, FaRocket, FaFlag } from "react-icons/fa";
import './nosotros.css';

const SobreNosotros = () => {
  return (
    <>
      {/* Header (no se modifica) */}
      <header className="custom-header">
        <div className="custom-logo">
          <img src="../src/assets/logo.png" alt="Logo" />
        </div>
        <nav className="custom-nav">
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/servicios">Servicios</Link></li>
            <li><Link to="/registro">Registrarse</Link></li>
            <li><Link to="/Login">Inicio Sesion</Link></li>
            <li><Link to="/inicioContactos">Contactanos</Link></li>
          </ul>
        </nav>
      </header>

      {/* Contenedor general */}
      <div className="about-page-wrapper">
        <div className="about-page-container">
         
          {/* Tarjeta del gerente */}
          <div className="about-manager-card">
            <div className="about-manager-img">
              <img src="../src/assets/nosotros/leon.jpg" alt="Jose Leon" />
            </div>
            <div className="about-manager-info">
              <h1><FaUserTie className="about-icon" /> Jose Leon</h1>
              <p className="about-manager-title">Gerente General</p>
              <p className="about-manager-description">
                Experto en turismo y planificación de viajes, comprometido con ofrecer experiencias inolvidables.
              </p>
            </div>
          </div>

          {/* Sección de Misión y Visión */}
          <div className="about-mission-vision">
            <div className="about-mission">
              <h3><FaRocket className="about-icon" /> Nuestra Misión</h3>
              <p>Brindar experiencias de viaje seguras y emocionantes, conectando a nuestros clientes con la naturaleza.</p>
            </div>
            <div className="about-vision">
              <h3><FaFlag className="about-icon" /> Nuestra Visión</h3>
              <p>Ser líderes en turismo de aventura en Colombia, destacándonos por nuestro servicio y calidad.</p>
            </div>
          </div>

          {/* Sección del mapa */}
          <div className="about-map-container">
            <h3><FaMapMarkerAlt className="about-icon" /> Encuéntranos Aquí</h3>
            <div className="about-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.5487193937456!2d-74.1216984857422!3d4.609710593708278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f99a90fb31579%3A0x575a8760cb69774d!2sBosa%2C%20Bogot%C3%A1!5e0!3m2!1ses!2sco!4v1609261977060!5m2!1ses!2sco"
                width="100%"
                height="300"
                frameBorder="0"
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
                title="Mapa de ubicación"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SobreNosotros;