import React from 'react';
import './DescHotel.css';
import { Link } from 'react-router-dom';
import hotelImage from '../../assets/hoteles/hotel_casablanca.jpg';

const HotelDesc = () => {
    return (
        <div className="hotel-wrapper">
            <div className="hotel-container">
                {/* Imagen con overlay */}
                <div className="hotel-image">
                    <img src={hotelImage} alt="Hotel de Lujo" />
                    <div className="hotel-overlay">
                        <h1 className="hotel-title">Hospédate con Elegancia</h1>
                    </div>
                </div>

                {/* Descripción del hotel */}
                <div className="hotel-content">
                    <h2 className="hotel-heading">Encuentra tu Hotel Ideal</h2>
                    <p className="hotel-description">
                        Disfruta de una estancia inigualable en los mejores hoteles de Colombia.
                        Habitaciones de lujo, vistas impresionantes y servicios de primera clase te esperan.
                    </p>
                    <p className="hotel-description">
                        Relájate en spas, disfruta de gastronomía gourmet y accede a experiencias exclusivas.
                        Encuentra el alojamiento perfecto para tus vacaciones o viajes de negocios.
                    </p>
                    <Link to="/sesion" className="hotel-button">
                        Reservar Ahora
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HotelDesc;
