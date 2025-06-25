import React from "react";
import logo from "../assets/logo.png";
import 'bootstrap/dist/css/bootstrap.min.css';

function Menus({ setPage }) {
  return (
    <nav className="custom-navbar navbar-expand-lg navbar-dark bg-dark py-3">
      <div className="custom-container d-flex justify-content-between align-items-center px-3">
        
        <a
          className="custom-navbar-brand d-flex align-items-center text-white text-decoration-none"
          onClick={() => setPage("home")}
          style={{ cursor: "pointer" }}
        >
          <img
            src={logo}
            alt="Logo Caminantes Por Colombia"
            width="4"  
            height="4"
            className="me-3"
          />
          <span className="h2 mb-0">Caminantes Por Colombia</span>
        </a>

        {/* Opciones de navegación */}
        <ul className="custom-navbar-nav d-flex mb-0">
          <li className="custom-nav-item me-4">
            <a
              className="custom-nav-link text-white text-decoration-none"
              onClick={() => setPage("home")}
              style={{ cursor: "pointer" }}
              aria-label="Ir a la página de inicio"
            >
              Inicio
            </a>
          </li>
          <li className="custom-nav-item me-4">
            <a
              className="custom-nav-link text-white text-decoration-none"
              onClick={() => setPage("hotels")}
              style={{ cursor: "pointer" }}
              aria-label="Ir a la página de hoteles"
            >
              Hoteles
            </a>
          </li>
          <li className="custom-nav-item me-4">
            <a
              className="custom-nav-link text-white text-decoration-none"
              onClick={() => setPage("crud-hotels")}
              style={{ cursor: "pointer" }}
              aria-label="Ir a la página CRUD de hoteles"
            >
              Crud
            </a>
          </li>
          <li className="custom-nav-item">
            <a
              className="custom-nav-link text-white text-decoration-none"
              onClick={() => setPage("destinations")}
              style={{ cursor: "pointer" }}
              aria-label="Ir a la página de destinos"
            >
              Destinos
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Menus;