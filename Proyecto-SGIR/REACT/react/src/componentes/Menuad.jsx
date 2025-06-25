import React from 'react';
import './Header.css'; // Asegúrate de agregar los estilos necesarios en este archivo

const Header = ({ setPage }) => {
    return (
        <header className="header-container">
            <div className="logo-container">
                <img src="../src/assets/logo.png" alt="Logo" className="logo" />
            </div>
            <nav className="nav-links">
                <ul>
                    <li><a href="#" onClick={() => setPage('hotelform')}>Hoteles</a></li>
                    <li><a href="#" onClick={() => setPage('comentario')}>Comentario</a></li>
                    <li><a href="#" onClick={() => setPage('contacto')}>Contacto</a></li>
                    <li><a href="#" onClick={() => setPage('paquetes')}>Paquetes</a></li>
                    <li><a href="#" onClick={() => setPage('admin')}>Administrador</a></li>
                    <li><a href="#" onClick={() => setPage('reservas')}>Reservas</a></li>
                    <li><a href="#" onClick={() => setPage('cliente')}>Cliente</a></li>
                    <li><a href="#" onClick={() => setPage('excursion')}>Excursión</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;