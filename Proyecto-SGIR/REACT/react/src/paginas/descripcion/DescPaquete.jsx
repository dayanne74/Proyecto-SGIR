import React from 'react';
import './DescPaquete.css';
import paqueteImage from '../../assets/destinos/pack3.jpeg';
import { Link } from 'react-router-dom';

const PaqueteDesc = () => {
    return (
        <div className="paquete-wrapper">
            <div className="paquete-container">
                {/* Sección de la imagen */}
                <div className="paquete-image">
                    <img src={paqueteImage} alt="Paquete Turístico" />
                    <div className="paquete-overlay">
                        <h1 className="paquete-title">Paquetes Turísticos </h1>
                    </div>
                </div>

                {/* Sección de la descripción */}
                <div className="paquete-content">
                    <h2 className="paquete-heading">Explora Colombia con todo incluido</h2>
                    <p className="paquete-description">
                        Disfruta de un viaje completo sin preocupaciones. Nuestros paquetes turísticos incluyen alojamiento,
                        transporte, alimentación y actividades para que vivas una experiencia inolvidable.
                    </p>
                    <p className="paquete-description">
                        Diseñamos itinerarios para todos los gustos, desde aventuras en la naturaleza hasta escapadas urbanas.
                        Viaja con comodidad y seguridad mientras descubres los destinos más fascinantes de Colombia.
                    </p>
                <Link to="/sesion" className="hotel-button">
                  Reservar Ahora
                </Link>
                </div>
            </div>
        </div>
    );
};

export default PaqueteDesc;
