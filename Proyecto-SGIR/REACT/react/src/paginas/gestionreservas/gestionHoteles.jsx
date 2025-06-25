// Componente para gestión de hoteles del lado del usuario, basado en PaquetesGestion

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  MapPin,
  BedDouble,
  DollarSign,
  Activity,
  Globe,
  Menu,
  X,
  Search,
  XCircle,
  Phone,
  Mail
} from 'lucide-react';


function NavigationMenu({ activeSection, setActiveSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { id: 'excursiones', label: 'Excursiones', icon: MapPin, path: '/cliente/ReservasGestion' },
    { id: 'paquetes', label: 'Paquetes', icon: Globe, path: '/PaquetesGestion' },
    { id: 'hoteles', label: 'Hoteles', icon: Activity, path: '/HotelesUsuario' }
  ];

  const handleMenuClick = (id, path) => {
    setActiveSection(id);
    navigate(path);
    setIsOpen(false);
  };

  return (
    <nav className="nav-agencia-container">
      <div className="nav-agencia-content">
        <div className="nav-agencia-brand">
          <span className="nav-agencia-logo" />
          <span className="nav-agencia-title">Caminantes Por Colombia</span>
        </div>
        <div className="nav-agencia-desktop">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id, item.path)}
                className={`nav-agencia-item ${activeSection === item.id ? 'nav-agencia-active' : ''}`}
              >
                <Icon className="nav-agencia-icon" />
                {item.label}
              </button>
            );
          })}
        </div>
        <button className="nav-agencia-mobile-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      {isOpen && (
        <div className="nav-agencia-mobile-menu">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id, item.path)}
                className={`nav-agencia-mobile-item ${activeSection === item.id ? 'nav-agencia-mobile-active' : ''}`}
              >
                <Icon className="nav-agencia-mobile-icon" />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}

function FiltroHoteles({ onFiltrar }) {
  const [ciudad, setCiudad] = useState('');
  const handleBuscar = () => onFiltrar(ciudad.trim());
  const handleLimpiar = () => {
    setCiudad('');
    onFiltrar('');
  };

  return (
    <div className="agencia-filters-wrapper">
      <div className="agencia-search-container">
        <div className="agencia-search-box">
          <Search className="agencia-search-icon" />
          <input
            type="text"
            placeholder="Buscar ciudad..."
            value={ciudad}
            onChange={e => setCiudad(e.target.value)}
            className="agencia-search-input"
          />
          {ciudad && <XCircle className="agencia-clear-icon" onClick={handleLimpiar} />}
        </div>
        <button onClick={handleBuscar} className="agencia-search-button">Buscar</button>
      </div>
    </div>
  );
}

// Tarjeta visual de hotel - Ahora clickeable como los paquetes
// Tarjeta visual de hotel - Corregida para cargar imágenes
function HotelCard({ hotel, onReservar }) {
  const handleCardClick = () => {
    onReservar(hotel);
  };

  const getImageUrl = (imagen) => {
    if (!imagen) return null;
    
    // Si la imagen ya es una URL completa, usarla tal como está
    if (imagen.startsWith('http://') || imagen.startsWith('https://')) {
      return imagen;
    }
    
    // Si es solo el nombre del archivo, construir la URL completa
    // Asegúrate de que esta URL coincida con tu servidor backend
    return `http://localhost:5000/uploads/${imagen}`;
  };

  return (
    <div 
      className="agencia-excursion-card agencia-excursion-card-clickable" 
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      <div className="agencia-card-image-container">
        {hotel.imagen ? (
          <img 
            src={getImageUrl(hotel.imagen)} 
            alt={hotel.nombre} 
            className="agencia-card-image"
            onError={(e) => {
              // Fallback en caso de error al cargar la imagen
              console.log('Error cargando imagen del hotel:', hotel.imagen);
              e.target.style.display = 'none';
              // Mostrar el placeholder si existe
              if (e.target.nextElementSibling) {
                e.target.nextElementSibling.style.display = 'flex';
              }
            }}
            onLoad={() => {
              console.log('Imagen del hotel cargada exitosamente:', hotel.imagen);
            }}
          />
        ) : null}
        
        {/* Placeholder que se muestra si no hay imagen o si falla la carga */}
        <div 
          className="agencia-card-placeholder" 
          style={{ display: hotel.imagen ? 'none' : 'flex' }}
        >
          <BedDouble className="agencia-placeholder-icon" />
        </div>
        
        <div className="agencia-card-overlay">
          <span className="agencia-card-price">Desde ${hotel.precio.toLocaleString()}</span>
        </div>
      </div>

      <div className="agencia-card-content">
        <h3 className="agencia-card-title">{hotel.nombre}</h3>
        <div className="agencia-card-destination">
          <MapPin className="agencia-destination-icon" />
          <span>{hotel.ubicacion}</span>
        </div>
        <p className="agencia-card-description">{hotel.descripcion || 'Hotel cómodo y acogedor'}</p>
        
        <div className="agencia-card-details">
          <div className="agencia-detail-item">
            <DollarSign className="agencia-detail-icon" />
            <span className="agencia-detail-text">Precio: ${hotel.precio.toLocaleString()}</span>
          </div>
          <div className="agencia-detail-item">
            <BedDouble className="agencia-detail-icon" />
            <span className="agencia-detail-text">{hotel.numeroHabitaciones} habitaciones</span>
          </div>
          <div className="agencia-detail-item">
            <Activity className="agencia-detail-icon" />
            <span className="agencia-detail-text">Capacidad: {hotel.numeroPersonas} personas</span>
          </div>
          {hotel.categoria && (
            <div className="agencia-detail-item">
              <span className="agencia-detail-text">⭐ {hotel.categoria}</span>
            </div>
          )}
          {hotel.comida && (
            <div className="agencia-detail-item">
              <span className="agencia-detail-text">🍽️ {hotel.comida}</span>
            </div>
          )}
        </div>

        {/* Indicador visual de que es clickeable */}
        <div className="agencia-card-action-hint">
          <span className="agencia-action-text"></span>
        </div>
      </div>
    </div>
  );
}

export default function HotelesUsuario() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('hoteles');
  const [hoteles, setHoteles] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) cargarHoteles();
  }, [token]);

  const cargarHoteles = async () => {
    setCargando(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:5000/api/hoteles', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      setHoteles(data);
    } catch (err) {
      console.error('Error al cargar hoteles:', err);
      setError('No se pudo cargar los hoteles.');
    } finally {
      setCargando(false);
    }
  };

  const filtrarHoteles = async ciudad => {
    setCargando(true);
    setError(null);
    try {
      const endpoint = ciudad 
        ? `http://localhost:5000/api/hoteles?ciudad=${encodeURIComponent(ciudad)}` 
        : 'http://localhost:5000/api/hoteles';
      const res = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      setHoteles(data);
    } catch (err) {
      console.error('Error al filtrar hoteles:', err);
      setError('No se pudo filtrar los hoteles.');
    } finally {
      setCargando(false);
    }
  };

  // Función para manejar la reserva desde las tarjetas de hoteles
  const handleReservarHotel = (hotel) => {
    // Pasar la información del hotel al formulario de reserva
    navigate('/ReservaForm', { 
      state: { 
        hotel: hotel,
        tipo: 'hotel'
      } 
    });
  };

  return (
    <div className="agencia-app-container">
      <NavigationMenu activeSection={activeSection} setActiveSection={setActiveSection} />

      <header className="agencia-header">
        <div className="agencia-header-content">
          <h1 className="agencia-main-title">Hoteles en Colombia</h1>
          <p className="agencia-subtitle">Encuentra tu hospedaje ideal</p>
        </div>
      </header>

      <main className="agencia-main-content">
        <FiltroHoteles onFiltrar={filtrarHoteles} />

        {cargando && (
          <div className="agencia-loading-container">
            <div className="agencia-loading-spinner"></div>
            <p className="agencia-loading-text">Cargando hoteles...</p>
          </div>
        )}

        {error && (
          <div className="agencia-error-container">
            <p className="agencia-error-message">{error}</p>
          </div>
        )}

        {!cargando && !error && hoteles.length === 0 && (
          <div className="agencia-empty-state">
            <BedDouble className="agencia-empty-icon" />
            <p className="agencia-empty-message">No hay hoteles disponibles</p>
            <p className="agencia-empty-subtitle">Intenta con otra ciudad o revisa más tarde</p>
          </div>
        )}

        <div className="agencia-excursions-grid">
          {hoteles.map(h => (
            <HotelCard 
              key={h._id} 
              hotel={h} 
              onReservar={handleReservarHotel}
            />
          ))}
        </div>
      </main>

      <footer className="agencia-footer">
        <div className="agencia-footer-content">
          <div className="agencia-footer-info">
            <h3 className="agencia-footer-title">Caminantes Por Colombia</h3>
            <p className="agencia-footer-description">Tu compañía de confianza para explorar Colombia</p>
          </div>
          <div className="agencia-footer-contact">
            <div className="agencia-contact-item">
              <Phone className="agencia-contact-icon" />
              <span>+57 3122567578</span>
            </div>
            <div className="agencia-contact-item">
              <Mail className="agencia-contact-icon" />
              <span>CaminantesPorColombia@gmail.com</span>
            </div>
          </div>
          <p className="agencia-footer-text">
            &copy; {new Date().getFullYear()} Caminantes Por Colombia - Tu aventura comienza aquí
          </p>
        </div>
      </footer>
    </div>
  );
}