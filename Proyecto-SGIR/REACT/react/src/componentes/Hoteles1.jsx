import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../presentacion.css"; // Aquí puedes agregar tus estilos
import axios from "axios"; // Usamos Axios para obtener los datos de la API

const Hoteles = () => {
  const [hoteles, setHoteles] = useState([]);

  useEffect(() => {
    // Obtén los hoteles desde la API
    axios.get("https://api.tu-dominio.com/hoteles") // Cambia esta URL a la de tu API
      .then(response => {
        setHoteles(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener los hoteles", error);
      });
  }, []);

  return (
    <div className="hoteles-container">
      <h1 className="hoteles-title">Nuestros Hoteles</h1>
      <div className="hoteles-grid">
        {hoteles.map((hotel) => (
          <div key={hotel.id} className="hotel-card">
            <img
              src={hotel.imagen || "/src/assets/default.jpg"}
              alt={hotel.nombre}
              className="hotel-card-image"
            />
            <div className="hotel-card-content">
              <h3 className="hotel-card-name">{hotel.nombre}</h3>
              <p className="hotel-card-description">{hotel.descripcion}</p>
              <p className="hotel-card-location">
                <strong>Ubicación:</strong> {hotel.lugar}
              </p>
              <p className="hotel-card-price">
                <strong>Precio:</strong> ${hotel.precio.toLocaleString()}
              </p>
              {/* Botón para ver detalles, con enlace a la página de detalles del hotel */}
              <Link to={`/hotel/${hotel.id}`} className="hotel-card-button">
                Ver Detalles
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hoteles;