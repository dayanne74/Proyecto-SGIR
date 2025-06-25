import React from 'react';
import './DescExcursion.css';
import { Link } from 'react-router-dom';
import excursionImage from '../../assets/descripcion/caption.jpg';

const ExcursionDesc = () => {
    return (
        <div className="excursion-wrapper">
            <div className="excursion-container">
                {/* Sección de la imagen */}
                <div className="excursion-image">
                    <img src={excursionImage} alt="Excursión en Colombia" />
                    <div className="excursion-overlay">
                        <h1 className="excursion-title">Excursión en Colombia</h1>
                    </div>
                </div>

                {/* Sección de la descripción */}
                <div className="excursion-content">
                    <h2 className="excursion-heading">Vive una experiencia única</h2>
                    <p className="excursion-description">
                        Descubre los paisajes naturales más impresionantes de Colombia con nuestras excursiones organizadas.
                        Explora senderos ecológicos, visita reservas naturales y sumérgete en la biodiversidad del país con
                        guías especializados.
                    </p>
                    <p className="excursion-description">
                        Ofrecemos rutas diseñadas para todos los niveles, desde caminatas suaves hasta recorridos más exigentes.
                        Disfruta de un ambiente seguro y bien planificado, ideal para viajeros que buscan una conexión auténtica
                        con la naturaleza.
                    </p>
                    <Link to="/sesion" className="hotel-button">
                        Reservar Ahora
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ExcursionDesc;
