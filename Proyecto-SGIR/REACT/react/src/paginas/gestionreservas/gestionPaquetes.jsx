import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  MapPin,
  Clock,
  DollarSign,
  BedDouble,
  Utensils,
  Activity,
  Globe,
  Menu,
  X,
  Search,
  XCircle,
  Phone,
  Mail
} from 'lucide-react';
//import './paquetesGestion.css';

// Navegación profesional
function NavigationMenu({ activeSection, setActiveSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { id: 'excursiones', label: 'Excursiones', icon: MapPin, path: '/cliente/ReservasGestion' },
    { id: 'paquetes', label: 'Paquetes', icon: Globe, path: '/PaquetesGestion' },
    { id: 'hoteles', label: 'Hoteles', icon: Activity, path: '/HotelesGestion' }
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

// Filtros de paquetes
function FiltrosPaquetes({ onFiltrar }) {
  const [destino, setDestino] = useState('');

  const handleBuscar = () => onFiltrar(destino.trim());
  const handleLimpiar = () => {
    setDestino('');
    onFiltrar('');
  };

  return (
    <div className="agencia-filters-wrapper">
      <div className="agencia-search-container">
        <div className="agencia-search-box">
          <Search className="agencia-search-icon" />
          <input
            type="text"
            placeholder="Buscar destino..."
            value={destino}
            onChange={e => setDestino(e.target.value)}
            className="agencia-search-input"
          />
          {destino && <XCircle className="agencia-clear-icon" onClick={handleLimpiar} />}
        </div>
        <button onClick={handleBuscar} className="agencia-search-button">
          Buscar
        </button>
      </div>
    </div>
  );
}

// Tarjeta visual de paquete - Ahora clickeable
function PaqueteCard({ paquete, onReservar }) {
  const handleCardClick = () => {
    onReservar(paquete);
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
        {paquete.imagen ? (
          <img
            src={getImageUrl(paquete.imagen)}
            alt={paquete.nombre}
            className="agencia-card-image"
            onError={(e) => {
              // Fallback en caso de error al cargar la imagen
              console.log('Error cargando imagen:', paquete.imagen); // ✅ Corregido: paquete.imagen
              e.target.style.display = 'none';
              // Mostrar el placeholder si existe
              if (e.target.nextElementSibling) {
                e.target.nextElementSibling.style.display = 'flex';
              }
            }}
            onLoad={() => {
              console.log('Imagen cargada exitosamente:', paquete.imagen); // ✅ Corregido: paquete.imagen
            }}
          />
        ) : null}
        
        {/* Placeholder que se muestra si no hay imagen o si falla la carga */}
        <div 
          className="agencia-card-placeholder" 
          style={{ display: paquete.imagen ? 'none' : 'flex' }}
        >
          <Globe className="agencia-placeholder-icon" />
        </div>
        
        <div className="agencia-card-overlay">
          <span className="agencia-card-price">
            ${paquete.precio.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="agencia-card-content">
        <h3 className="agencia-card-title">{paquete.nombre}</h3>
        <div className="agencia-card-destination">
          <MapPin className="agencia-destination-icon" />
          <span>{paquete.destino}</span>
        </div>
        <p className="agencia-card-description">{paquete.descripcion}</p>

        <div className="agencia-card-details">
          <div className="agencia-detail-item">
            <Clock className="agencia-detail-icon" />
            <span className="agencia-detail-text">{paquete.duracion}</span>
          </div>
          <div className="agencia-detail-item">
            <BedDouble className="agencia-detail-icon" />
            <span className="agencia-detail-text">{paquete.alojamiento}</span>
          </div>
          <div className="agencia-detail-item">
            <Utensils className="agencia-detail-icon" />
            <span className="agencia-detail-text">{paquete.comida}</span>
          </div>
          <div className="agencia-detail-item">
            <Activity className="agencia-detail-icon" />
            <span className="agencia-detail-text">{paquete.actividad}</span>
          </div>
        </div>

        {/* Indicador visual de que es clickeable */}
        <div className="agencia-card-action-hint">
          <span className="agencia-action-text"></span>
        </div>
      </div>
    </div>
  );
}

// Vista principal de gestión de paquetes
export default function PaquetesGestion() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('paquetes');
  const [paquetes, setPaquetes] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) cargarPaquetes();
  }, [token]);

  const cargarPaquetes = async () => {
    setCargando(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:5000/api/paquetes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      setPaquetes(data);
    } catch (err) {
      console.error('Error al cargar paquetes:', err);
      setError('No se pudo cargar los paquetes.');
    } finally {
      setCargando(false);
    }
  };

  const filtrarPaquetes = async destino => {
    setCargando(true);
    setError(null);
    try {
      const endpoint = destino
        ? `http://localhost:5000/api/paquetes?destino=${encodeURIComponent(destino)}`
        : 'http://localhost:5000/api/paquetes';
      const res = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      setPaquetes(data);
    } catch (err) {
      console.error('Error al filtrar paquetes:', err);
      setError('No se pudo filtrar los paquetes.');
    } finally {
      setCargando(false);
    }
  };

  // Función para manejar la reserva desde las tarjetas de paquetes
  const handleReservarPaquete = (paquete) => {
    // Pasar la información del paquete al formulario de reserva
    navigate('/ReservaForm', { 
      state: { 
        paquete: paquete,
        tipo: 'paquete'
      } 
    });
  };

  return (
    <div className="agencia-app-container">
      <NavigationMenu activeSection={activeSection} setActiveSection={setActiveSection} />

      <header className="agencia-header">
        <div className="agencia-header-content">
          <h1 className="agencia-main-title">Paquetes Colombia</h1>
          <p className="agencia-subtitle">Elige tu paquete ideal</p>
        </div>
      </header>

      <main className="agencia-main-content">
        <FiltrosPaquetes onFiltrar={filtrarPaquetes} />

        {cargando && (
          <div className="agencia-loading-container">
            <div className="agencia-loading-spinner"></div>
            <p className="agencia-loading-text">Cargando paquetes...</p>
          </div>
        )}

        {error && (
          <div className="agencia-error-container">
            <p className="agencia-error-message">{error}</p>
          </div>
        )}

        {!cargando && !error && paquetes.length === 0 && (
          <div className="agencia-empty-state">
            <Globe className="agencia-empty-icon" />
            <p className="agencia-empty-message">No hay paquetes disponibles</p>
            <p className="agencia-empty-subtitle">Intenta con otro destino o revisa más tarde</p>
          </div>
        )}

        <div className="agencia-excursions-grid">
          {paquetes.map(p => (
            <PaqueteCard 
              key={p._id} 
              paquete={p} 
              onReservar={handleReservarPaquete}
            />
          ))}
        </div>
      </main>

      <footer className="agencia-footer">
        <div className="agencia-footer-content">
          <div className="agencia-footer-info">
            <h3 className="agencia-footer-title">Caminantes Por Colombia</h3>
            <p className="agencia-footer-description">
              Tu compañía de confianza para explorar Colombia
            </p>
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