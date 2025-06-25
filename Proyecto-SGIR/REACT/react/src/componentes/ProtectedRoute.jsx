import React from 'react';
import { Navigate } from 'react-router-dom';
import AccessDenied from '../paginas/AccesoDenegado/AccesoDenegado';
import { useAuth } from '../contexts/AuthContext'; 
// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, roles } = useAuth();  // ✅ Hook DENTRO del componente

  if (!token) {
    console.log('🔒 No autenticado. Redirigiendo a Login...');
    return <Navigate to="/Login" replace />;
  }

  const hasAccess = allowedRoles.some(role => roles.includes(role));
  if (!hasAccess) {
    console.log('⛔ Acceso denegado. Rol no autorizado.');
    return <AccessDenied />;
  }

  return children;
};

export default ProtectedRoute;
