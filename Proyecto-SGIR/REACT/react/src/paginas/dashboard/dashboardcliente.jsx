import React from 'react';
import { Link } from 'react-router-dom';
import './dashboardadmin.css'; // Agrega estilos personalizados aquí

const ClientePage = () => {
    return (
        <header className="admin-header">
            <div className="logo-container">
                <img src="../src/assets/logo.png" alt="Logo Empresa" className="logo" />
                <h1 className="company-name">Caminantes Por Colombia</h1>
            </div>
            <nav className="nav-links">
                <Link to="/contacto" className="nav-button">contacto</Link>
                <Link to="/" className="nav-button">Paquetes</Link>
                <Link to="/" className="nav-button">Hoteles</Link>
                <Link to="/contacto" className="nav-button">Contacto</Link>
            </nav>
        </header>
    );
};

export default ClientePage;