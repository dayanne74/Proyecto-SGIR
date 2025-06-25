import React from "react";
import "./presentacion.css";

const Presentation = ({ handlePageChange }) => {
  return (
    <div className="presentation-container">
      <div className="presentation-content">
        {/* Título y texto */}
        <div className="presentation-text">
          <h1>Bienvenido a la Sección de Hoteles</h1>
          <p>
            Explora los mejores hoteles y disfruta de una experiencia única en
            Colombia.
          </p>
        </div>

        {/* Botón para ver los hoteles */}
        <div className="presentation-button-container">
          <button
            onClick={() => handlePageChange("formulario-hotel")} // Usamos handlePageChange
            className="presentation-button"
          >
            Ver Hoteles
          </button>
        </div>
      </div>
    </div>
  );
};

export default Presentation;