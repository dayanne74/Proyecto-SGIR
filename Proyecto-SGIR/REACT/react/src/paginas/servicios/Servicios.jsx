import React, { useState } from 'react';
import { MapPin, Clock, Users, Star, Wifi, Car, Utensils, Coffee, Mountain, Camera, Plane, Ship } from 'lucide-react';
import './ServicesPage.css';

// Componente Link simulado para el menú
const Link = ({ to, children }) => (
  <a href={to} className="services-nav-link">
    {children}
  </a>
);

const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 1,
      category: 'hoteles',
      title: 'Hoteles de Lujo',
      shortDesc: 'Experiencias exclusivas en los mejores hoteles',
      icon: <Star className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      fullDesc: 'Disfruta de una experiencia única en nuestros hoteles de 5 estrellas. Cada propiedad ha sido cuidadosamente seleccionada por su excepcional servicio, ubicación privilegiada y amenidades de lujo. Desde suites con vista al mar hasta villas privadas en montañas, ofrecemos alojamientos que superan las expectativas más exigentes.',
      features: ['Servicio de conserjería 24/7', 'Spa y centro de bienestar', 'Restaurantes gourmet', 'Piscinas infinity', 'Servicio de habitaciones premium'],
      price: 'Desde $299/noche',
      duration: 'Estadías flexibles'
    },
    {
      id: 2,
      category: 'hoteles',
      title: 'Hoteles Boutique',
      shortDesc: 'Alojamientos únicos con personalidad propia',
      icon: <Coffee className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      fullDesc: 'Descubre hoteles boutique con carácter distintivo, donde cada rincón cuenta una historia. Estos establecimientos íntimos combinan diseño contemporáneo con elementos locales, creando atmósferas únicas que reflejan la cultura y tradición de cada destino.',
      features: ['Diseño arquitectónico único', 'Decoración temática local', 'Atención personalizada', 'Experiencias culturales', 'Gastronomía regional'],
      price: 'Desde $189/noche',
      duration: 'Mínimo 2 noches'
    },
    {
      id: 3,
      category: 'paquetes',
      title: 'Paquetes Románticos',
      shortDesc: 'Escapadas perfectas para parejas',
      icon: <Users className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c825?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      fullDesc: 'Crea recuerdos inolvidables con tu pareja en destinos románticos cuidadosamente seleccionados. Nuestros paquetes incluyen experiencias íntimas como cenas privadas en la playa, tratamientos de spa en pareja, y actividades diseñadas para fortalecer vínculos y crear momentos mágicos.',
      features: ['Cenas románticas privadas', 'Tratamientos de spa en pareja', 'Habitaciones con vista panorámica', 'Champagne de bienvenida', 'Fotografía profesional'],
      price: 'Desde $899/pareja',
      duration: '3-5 días'
    },
    {
      id: 4,
      category: 'paquetes',
      title: 'Paquetes Familiares',
      shortDesc: 'Diversión garantizada para toda la familia',
      icon: <Users className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      fullDesc: 'Vacaciones diseñadas para que cada miembro de la familia tenga su momento especial. Desde actividades para niños supervisadas por profesionales hasta excursiones educativas que combinan diversión y aprendizaje, garantizamos experiencias memorables para todas las edades.',
      features: ['Club infantil con animadores', 'Actividades para adolescentes', 'Piscinas para niños', 'Menús especiales para niños', 'Entretenimiento nocturno familiar'],
      price: 'Desde $599/familia',
      duration: '4-7 días'
    },
    {
      id: 5,
      category: 'excursiones',
      title: 'Aventuras en Montaña',
      shortDesc: 'Explora paisajes espectaculares',
      icon: <Mountain className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1464822759844-d150065c142f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      fullDesc: 'Conquista las cimas más impresionantes y descubre la belleza natural en su estado más puro. Nuestras excursiones de montaña están diseñadas para diferentes niveles de experiencia, desde caminatas suaves hasta ascensos desafiantes, siempre con guías expertos y equipo de seguridad completo.',
      features: ['Guías certificados en montañismo', 'Equipo de seguridad incluido', 'Rutas para todos los niveles', 'Fotografía de paisajes', 'Comidas campestres'],
      price: 'Desde $129/persona',
      duration: '1 día completo'
    },
    {
      id: 6,
      category: 'excursiones',
      title: 'Tours Culturales',
      shortDesc: 'Sumérgete en la cultura local',
      icon: <Camera className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73142?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      fullDesc: 'Descubre la riqueza cultural de cada destino a través de experiencias auténticas. Visita sitios históricos, museos, mercados locales y talleres artesanales. Nuestros guías locales te compartirán historias fascinantes y te conectarán con las tradiciones más profundas de cada lugar.',
      features: ['Guías locales expertos', 'Visitas a sitios históricos', 'Talleres artesanales', 'Degustación gastronómica', 'Interacción con comunidades'],
      price: 'Desde $89/persona',
      duration: '4-6 horas'
    }
  ];

  const categories = [
    { id: 'todos', name: 'Todos los Servicios', icon: <Star className="w-5 h-5" /> },
    { id: 'hoteles', name: 'Hoteles', icon: <Utensils className="w-5 h-5" /> },
    { id: 'paquetes', name: 'Paquetes', icon: <Plane className="w-5 h-5" /> },
    { id: 'excursiones', name: 'Excursiones', icon: <Mountain className="w-5 h-5" /> }
  ];

  const [activeCategory, setActiveCategory] = useState('todos');

  const filteredServices = activeCategory === 'todos' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  const openModal = (service) => {
    setSelectedService(service);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedService(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <div className="services-page">
      {/* Header */}
      <header className="services-header">
        <div className="services-container">
          <div className="services-header-content">
            <div className="services-logo-section">
              <h1 className="services-logo-text">Caminantes Por Colombia</h1>
            </div>
            
            <nav className="custom-nav">
              <ul className="services-nav-list">
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/nosotros">Nosotros</Link></li>
                <li><Link to="/servicios">Servicios</Link></li>
                <li><Link to="/registro">Registrarse</Link></li>
                <li><Link to="/Login">Inicio Sesión</Link></li>
                <li><Link to="/inicioContactos">Contáctanos</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="services-hero">
        <div className="services-hero-overlay"></div>
        <div className="services-hero-content">
          <h2 className="services-hero-title">
            Nuestros Servicios
          </h2>
          <p className="services-hero-subtitle">
            Descubre experiencias únicas que transformarán tus viajes en recuerdos inolvidables
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="services-filter-section">
        <div className="services-container">
          <div className="services-filter-buttons">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`services-filter-btn ${
                  activeCategory === category.id ? 'services-filter-btn-active' : ''
                }`}
              >
                {category.icon}
                <span className="services-filter-text">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="services-grid-section">
        <div className="services-container">
          <div className="services-grid">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="services-card"
                onClick={() => openModal(service)}
              >
                <div className="services-card-image">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="services-image"
                  />
                  <div className="services-card-icon">
                    <div className="services-icon-wrapper">
                      {service.icon}
                    </div>
                  </div>
                </div>
                
                <div className="services-card-content">
                  <h3 className="services-card-title">
                    {service.title}
                  </h3>
                  <p className="services-card-desc">
                    {service.shortDesc}
                  </p>
                  <div className="services-card-footer">
                    <span className="services-price">
                      {service.price}
                    </span>
                    <span className="services-duration">
                      <Clock className="services-clock-icon" />
                      {service.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedService && (
        <div className="services-modal">
          <div className="services-modal-content">
            <div className="services-modal-image">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="services-modal-img"
              />
              <button
                onClick={closeModal}
                className="services-modal-close"
              >
                <span className="services-close-x">×</span>
              </button>
            </div>
            
            <div className="services-modal-body">
              <div className="services-modal-header">
                <div className="services-modal-icon">
                  {selectedService.icon}
                </div>
                <h3 className="services-modal-title">
                  {selectedService.title}
                </h3>
              </div>
              
              <p className="services-modal-desc">
                {selectedService.fullDesc}
              </p>
              
              <div className="services-modal-grid">
                <div className="services-features-section">
                  <h4 className="services-features-title">
                    Características incluidas:
                  </h4>
                  <ul className="services-features-list">
                    {selectedService.features.map((feature, index) => (
                      <li key={index} className="services-feature-item">
                        <div className="services-feature-dot"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="services-details-section">
                  <h4 className="services-details-title">
                    Detalles del servicio:
                  </h4>
                  <div className="services-details-content">
                    <div className="services-detail-row">
                      <span className="services-detail-label">Precio:</span>
                      <span className="services-detail-price">
                        {selectedService.price}
                      </span>
                    </div>
                    <div className="services-detail-row">
                      <span className="services-detail-label">Duración:</span>
                      <span className="services-detail-duration">
                        {selectedService.duration}
                      </span>
                    </div>
                  </div>
                  
                  <button className="services-reserve-btn">
                    Reservar Ahora
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="services-footer">
        <div className="services-container">
          <div className="services-footer-grid">
            <div className="services-footer-brand">
              <div className="services-footer-logo">
                <div className="services-footer-logo-icon">
                  <Plane className="services-footer-plane" />
                </div>
                <h3 className="services-footer-brand-name">TravelLux</h3>
              </div>
              <p className="services-footer-desc">
                Creando experiencias de viaje inolvidables desde 2020.
              </p>
            </div>
            
            <div className="services-footer-section">
              <h4 className="services-footer-title">Servicios</h4>
              <ul className="services-footer-list">
                <li>Hoteles de Lujo</li>
                <li>Paquetes Turísticos</li>
                <li>Excursiones</li>
                <li>Asesoría Personalizada</li>
              </ul>
            </div>
            
            <div className="services-footer-section">
              <h4 className="services-footer-title">Contacto</h4>
              <ul className="services-footer-list">
                <li>+1 (555) 123-4567</li>
                <li>info@travellux.com</li>
                <li>123 Travel Street</li>
                <li>Adventure City, AC 12345</li>
              </ul>
            </div>
            
            <div className="services-footer-section">
              <h4 className="services-footer-title">Síguenos</h4>
              <div className="services-social-links">
                <div className="services-social-icon services-social-facebook">
                  <span className="services-social-text">f</span>
                </div>
                <div className="services-social-icon services-social-twitter">
                  <span className="services-social-text">t</span>
                </div>
                <div className="services-social-icon services-social-instagram">
                  <span className="services-social-text">i</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="services-footer-bottom">
            <p className="services-footer-copyright">&copy; 2025 TravelLux. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServicesPage;