import React from 'react';
import { Link } from 'react-router-dom';
import { 
    FaUserCog, FaUsers, FaBoxOpen, FaHiking, FaComments, FaClipboardList, 
    FaHome, FaConciergeBell, FaPlane, FaDatabase, FaEnvelope, FaCar 
} from 'react-icons/fa';
import './dashboardadmin.css';

const adminPage = () => {
    return (
        <div className="dashboard-container">
            {/* Menú lateral */}
            <aside className="sidebar">
                <ul className="menu">                                               
                    <li><Link to="/PaquetePage"><FaBoxOpen /> Paquetes</Link></li>
                    <li><Link to="/Excursiones"><FaHiking /> Excursiones</Link></li>
                    <li><Link to="/comentarioCRUD"><FaComments /> Comentarios</Link></li>
                    <li><Link to="/ListarContactos"><FaEnvelope /> Contacto</Link></li>
                    <li><Link to="/CrudHoteles"><FaHome /> Hoteles</Link></li>
                    <li><Link to="/ReservaCrud"><FaClipboardList /> Reservas</Link></li>
                    <li><Link to="/Transporte"><FaCar /> Transporte</Link></li>
                    <li><Link to="/clientesCRUD"><FaUsers />Usuarios</Link></li>                                    
                    
                </ul>
            </aside>

            {/* Contenido Principal */}
            <main className="main-content">
                {/* Sección de Bienvenida */}
                <div className="welcome-banner">
                    <h1>👋 ¡Bienvenido al Panel de administración!</h1>
                    <p>Aquí puedes gestionar Usuarios, paquetes turísticos, reservas, hoteles, transportes y mucho más.</p>
                </div>

                {/* Sección de Información */}
                <div className="info-section">
                    <h2>📌 ¿Qué puedes hacer en este panel?</h2>
                    <ul className="info-list">
                        <li>📋 Gestionar usuarios, reservas.</li>
                        <li>✈️ Crear y modificar paquetes turísticos.</li>
                        <li>🏨 administrar hoteles y transportes.</li>
                        <li>💬 Moderar y responder comentarios.</li>
                        <li>📊 Supervisar formularios de contacto.</li>
                    </ul>
                    <div className="logo-container">
                    <img src="../src/assets/logo.png" alt="Logo Empresa" />
                    </div>
                </div>

                
                
            </main>
        </div>
    );
};

export default adminPage;

