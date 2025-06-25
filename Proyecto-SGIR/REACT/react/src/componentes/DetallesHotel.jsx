import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { FaWifi, FaSwimmer, FaConciergeBell, FaUtensils } from "react-icons/fa";
import axios from "axios"; // Usamos Axios para obtener los datos de la API
import "../componentes/hotelesdec.css"; // Aquí puedes agregar tus estilos

const DetallesHotel = () => {
  const [hotel, setHotel] = useState(null);
  const { id } = useParams(); // Obtenemos el id del hotel desde la URL
  const history = useHistory();

  useEffect(() => {
    // Obtener los detalles del hotel con el id desde la API
    axios.get(`http://localhost:5000/api/hotels/${id}`) // Cambia esta URL a la de tu API
      .then(response => {
        setHotel(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener los detalles del hotel", error);
      });
  }, [id]);

  const handleBack = () => {
    history.push("/hoteles"); // Redirige de vuelta a la lista de hoteles
  };

  const handleReserve = () => {
    console.log("Reserva realizada");
    // Aquí puedes manejar la lógica de la reserva, redirigiendo o abriendo un modal
  };

  if (!hotel) {
    return <div>Cargando...</div>; // Cargando mientras se obtienen los datos
  }

  return (
    <div className="detalles-hotel-container">
      {/* Imagen Principal */}
      <div className="detalles-hotel-header">
        <img
          src={hotel.imagen}
          className="detalles-hotel-image"
          alt="Imagen del Hotel"
        />
        <h1 className="detalles-hotel-title">{hotel.nombre}</h1>
      </div>

      {/* Descripción */}
      <div className="detalles-hotel-description">
        <p>{hotel.descripcion}</p>
      </div>

      {/* Información del Hotel y Servicios */}
      <div className="detalles-hotel-info-services">
        {/* Información del Hotel */}
        <div className="detalles-hotel-info">
          <p><strong>Ubicación:</strong> {hotel.lugar}</p>
          <p><strong>Precio por noche:</strong> ${hotel.precio.toLocaleString()}</p>
        </div>

        {/* Servicios Destacados */}
        <div className="detalles-hotel-services">
          <h2>Servicios Destacados</h2>
          <ul className="services-list">
            {hotel.servicios.includes('WiFi') && <li><FaWifi className="service-icon" /> Wi-Fi gratuito</li>}
            {hotel.servicios.includes('Piscina') && <li><FaSwimmer className="service-icon" /> Piscina frente al mar</li>}
            {hotel.servicios.includes('Concierge') && <li><FaConciergeBell className="service-icon" /> Atención al cliente 24/7</li>}
            {hotel.servicios.includes('Restaurante') && <li><FaUtensils className="service-icon" /> Restaurante gourmet</li>}
          </ul>
        </div>
      </div>

      {/* Galería de Imágenes */}
      <div className="detalles-hotel-gallery">
        <h2>Galería</h2>
        <div className="gallery-grid">
          {hotel.galeria.map((img, index) => (
            <img key={index} src={img} alt={`Imagen ${index + 1}`} />
          ))}
        </div>
      </div>

      <div className="detalles-hotel-reservar">
        <button onClick={handleBack} className="volver-button">
          Volver a Hoteles
        </button>
        <button onClick={handleReserve} className="reservar-button">
          Reservar Ahora
        </button>
      </div>
    </div>
  );
};

export default DetallesHotel;