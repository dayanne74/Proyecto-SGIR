import React from 'react';
import './Dashboard.css';
import LoginForm from '../inicio/Login';

const DashboardAdmin = () => {
  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-content">
        <div className="admin-section">
          <img src="../src/assets/logo.png" className="logo-image" alt="Logo" />
          <h1 className="section-title">Administrador</h1>
          <p className="section-description">Accede al panel de administración para gestionar servicios, usuarios y más.</p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;

