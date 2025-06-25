import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import api from './api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    roles: [],
    user: null,
    isLoading: true, // Agregamos estado de carga
  });

  // Función para decodificar token
  const decodeToken = (token) => {
    try {
      const payload = JSON.parse(
        decodeURIComponent(
          atob(token.split('.')[1])
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        )
      );
      return payload;
    } catch (error) {
      console.error('Error decodificando token:', error);
      return null;
    }
  };

  // Función para configurar headers
  const setAuthHeaders = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
      delete api.defaults.headers.common['Authorization'];
    }
  };

  // Inicialización al cargar la aplicación
  useEffect(() => {
    const initAuth = () => {
      const token = localStorage.getItem('token');
      const roles = JSON.parse(localStorage.getItem('roles') || '[]');
      
      if (token) {
        const payload = decodeToken(token);
        if (payload) {
          // Verificar si el token no ha expirado
          const currentTime = Date.now() / 1000;
          if (payload.exp && payload.exp < currentTime) {
            // Token expirado
            logout();
          } else {
            setAuthHeaders(token);
            setAuth({
              token,
              roles,
              user: payload,
              isLoading: false,
            });
          }
        } else {
          logout();
        }
      } else {
        setAuth(prev => ({ ...prev, isLoading: false }));
      }
    };

    initAuth();
  }, []);

  const login = (token, roles) => {
    const payload = decodeToken(token);
    if (!payload) {
      throw new Error('Token inválido');
    }

    localStorage.setItem('token', token);
    localStorage.setItem('roles', JSON.stringify(roles));
    setAuthHeaders(token);
    
    setAuth({
      token,
      roles,
      user: payload,
      isLoading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    setAuthHeaders(null);
    setAuth({
      token: null,
      roles: [],
      user: null,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        login,
        logout,
        isAuthenticated: Boolean(auth.token && auth.user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};