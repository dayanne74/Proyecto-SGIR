import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nombreUsuario: '',
    apellidoUsuario: '',
    numeroDocumento: '',
    correo: '',
    contrasena: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Configuración para evitar problemas CORS en desarrollo
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      };
      
      await axios.post('http://localhost:5000/api/autentificaciones/registro', formData, config);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrarse');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.registerContainer}>
      <div style={styles.registerWrapper}>
        <div style={styles.registerCard}>
          <div style={styles.registerHeader}>
            <h2 style={styles.registerTitle}>Registro de Usuario</h2>
            <p style={styles.registerSubtitle}>Crea una cuenta para comenzar</p>
          </div>
          
          <form onSubmit={handleSubmit} style={styles.registerForm}>
            {error && (
              <div style={styles.errorBox}>
                <AlertCircle size={20} />
                <p style={styles.errorText}>{error}</p>
              </div>
            )}
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Nombre</label>
              <input
                type="text"
                name="nombreUsuario"
                style={styles.inputField}
                placeholder="Ingresa tu nombre"
                value={formData.nombreUsuario}
                onChange={handleChange}
                required
              />
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Apellido</label>
              <input
                type="text"
                name="apellidoUsuario"
                style={styles.inputField}
                placeholder="Ingresa tu apellido"
                value={formData.apellidoUsuario}
                onChange={handleChange}
                required
              />
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Número de documento</label>
              <input
                type="text"
                name="numeroDocumento"
                style={styles.inputField}
                placeholder="Ingresa tu documento"
                value={formData.numeroDocumento}
                onChange={handleChange}
                required
              />
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Correo electrónico</label>
              <input
                type="email"
                name="correo"
                style={styles.inputField}
                placeholder="correo@ejemplo.com"
                value={formData.correo}
                onChange={handleChange}
                required
              />
            </div>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Contraseña</label>
              <input
                type="password"
                name="contrasena"
                style={styles.inputField}
                placeholder="Crea una contraseña segura"
                value={formData.contrasena}
                onChange={handleChange}
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              style={{
                ...styles.registerButton,
                ...(isLoading && styles.registerButtonDisabled)
              }}
            >
              {isLoading ? 'Registrando...' : 'Registrarse'}
            </button>
            
            <div style={styles.registerFooter}>
              <p style={styles.footerText}>
                ¿Ya tienes una cuenta?{' '}
                <a href="/login" style={styles.footerLink}>Inicia sesión</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Objeto de estilos (CSS-in-JS) sin usar la etiqueta style jsx
const styles = {
  registerContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '1rem'
  },
  registerWrapper: {
    width: '100%',
    maxWidth: '450px',
    padding: '0 1rem'
  },
  registerCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(59, 130, 246, 0.15)',
    overflow: 'hidden'
  },
  registerHeader: {
    background: 'linear-gradient(90deg, #3b82f6 0%, #1e40af 100%)',
    color: '#ffffff',
    padding: '1.5rem',
    textAlign: 'center'
  },
  registerTitle: {
    margin: 0,
    fontSize: '1.75rem',
    fontWeight: 600
  },
  registerSubtitle: {
    marginTop: '0.5rem',
    fontSize: '0.9rem',
    opacity: 0.85
  },
  registerForm: {
    padding: '1.5rem 2rem'
  },
  inputGroup: {
    position: 'relative',
    marginBottom: '1.25rem'
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.85rem',
    fontWeight: 500,
    color: '#1e293b'
  },
  inputField: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    fontSize: '0.95rem',
    color: '#1e293b',
    backgroundColor: '#f8fafc',
    outline: 'none',
    transition: 'border-color 0.3s ease'
  },
  errorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#fee2e2',
    border: '1px solid #fecaca',
    color: '#b91c1c',
    padding: '0.75rem',
    borderRadius: '8px',
    marginBottom: '1.25rem',
    fontSize: '0.9rem'
  },
  errorText: {
    margin: 0
  },
  registerButton: {
    width: '100%',
    background: 'linear-gradient(90deg, #2563eb 0%, #1e3a8a 100%)',
    color: '#ffffff',
    padding: '0.75rem',
    fontSize: '1rem',
    fontWeight: 500,
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '0.5rem'
  },
  registerButtonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed'
  },
  registerFooter: {
    marginTop: '1.5rem',
    textAlign: 'center',
    fontSize: '0.85rem',
    color: '#475569'
  },
  footerText: {
    margin: 0
  },
  footerLink: {
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: 500
  }
};

export default RegisterForm;