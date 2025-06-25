import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  MapPin,
  Clock,
  DollarSign,
  Car,
  Utensils,
  Activity,
  Users,
  Calendar,
  Phone,
  Mail,
  User,
  CreditCard,
  ArrowLeft,
  Check,
  AlertTriangle,
  Home,
  Package
} from 'lucide-react';
import './ReservaForm.css';

export default function ReservaForm() {
  const { token } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Obtener datos del servicio desde la navegación
  const serviceData = location.state?.excursion || location.state?.hotel || location.state?.paquete;
  const serviceType = location.state?.tipo || 'excursion';
  
  // Estados del formulario
  const [formData, setFormData] = useState({
    // Datos personales
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    documento: '',
    
    // Datos de la reserva
    fechaReserva: '',
    numeroPersonas: 1,
    solicitudesEspeciales: '',
    
    // Datos de pago
    metodoPago: 'efectivo',
    numeroTarjeta: '',
    fechaVencimiento: '',
    cvv: '',
    nombreTitular: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Redirigir si no hay datos del servicio
  useEffect(() => {
    if (!serviceData) {
      navigate('/ReservasGestion');
    }
  }, [serviceData, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    const reservaData = {
      ...formData,
      servicioId: serviceData._id,
      tipoServicio: serviceType,
      precioTotal: serviceData.precio * formData.numeroPersonas,
      servicio: {
        nombre: serviceData.nombre,
        tipo: serviceType,
        precio: serviceData.precio,
        imagen: serviceData.imagen,
        destino: serviceData.destino || serviceData.ubicacion,
        duracion: serviceData.duracion
      }
    };

      const response = await fetch('http://localhost:5000/api/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(reservaData)
      });

      if (!response.ok) {
        throw new Error('Error al crear la reserva');
      }

      const result = await response.json();
    const { reserva: nuevaReserva, codigoConfirmacion } = result.data;

    // Única navegación, con todos los datos
    navigate('/ConfirmationPage', {
      state: {
        reservaId: nuevaReserva._id,
        codigo: codigoConfirmacion
      }
    });
  } catch (err) {
    setError(err.message || 'Error al procesar la reserva');
  } finally {
    setLoading(false);
  }
};

  if (!serviceData) {
    return null;
  }

  const getServiceIcon = () => {
    switch (serviceType) {
      case 'hotel': return <Home className="service-type-icon" />;
      case 'paquete': return <Package className="service-type-icon" />;
      default: return <MapPin className="service-type-icon" />;
    }
  };

  const getServiceTitle = () => {
    switch (serviceType) {
      case 'hotel': return 'Reserva de Hotel';
      case 'paquete': return 'Reserva de Paquete';
      default: return 'Reserva de Excursión';
    }
  };

  if (success) {
    return (
      <div className="reservation-container">
        <div className="success-container">
          <div className="success-icon">
            <Check size={48} />
          </div>
          <h2>¡Reserva Exitosa!</h2>
          <p>Tu reserva ha sido procesada correctamente.</p>
          <p>Recibirás un email de confirmación pronto.</p>
          <button 
            onClick={() => navigate('/ReservasGestion')}
            className="success-button"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="reservation-container">
      <div className="reservation-header">
        <button 
          onClick={() => navigate(-1)} 
          className="back-button"
        >
          <ArrowLeft size={20} />
          Volver
        </button>
        <div className="header-content">
          {getServiceIcon()}
          <h1>{getServiceTitle()}</h1>
        </div>
      </div>

      <div className="reservation-content">
        {/* Resumen del servicio */}
        <div className="service-summary">
          <div className="summary-image">
            {serviceData.imagen ? (
              <img
                src={`http://localhost:5000/uploads/${serviceData.imagen}`}  // ✅ Ruta correcta
                alt={serviceData.nombre}
                className="summary-img"
              />
            ) : (
              <div className="summary-placeholder">
                {getServiceIcon()}
              </div>
            )}
          </div>
          
          <div className="summary-details">
            <h2>{serviceData.nombre}</h2>
            {serviceData.destino && (
              <div className="summary-item">
                <MapPin size={16} />
                <span>{serviceData.destino}</span>
              </div>
            )}
            {serviceData.ubicacion && (
              <div className="summary-item">
                <MapPin size={16} />
                <span>{serviceData.ubicacion}</span>
              </div>
            )}
            {serviceData.duracion && (
              <div className="summary-item">
                <Clock size={16} />
                <span>{serviceData.duracion}</span>
              </div>
            )}
            {serviceData.numeroPersonas && (
              <div className="summary-item">
                <Users size={16} />
                <span>{serviceData.numeroPersonas} personas</span>
              </div>
            )}
            {serviceData.numeroHabitaciones && (
              <div className="summary-item">
                <Home size={16} />
                <span>{serviceData.numeroHabitaciones} habitaciones</span>
              </div>
            )}
            <div className="summary-price">
              <DollarSign size={20} />
              <span>${serviceData.precio.toLocaleString()}</span>
              {serviceType !== 'hotel' && <small>por persona</small>}
            </div>
          </div>
        </div>

        {error && (
          <div className="error-message">
            <AlertTriangle size={20} />
            {error}
          </div>
        )}

        {/* Formulario de reserva */}
        <form onSubmit={handleSubmit} className="reservation-form">
          {/* Sección 1: Datos Personales */}
          <div className="form-section">
            <h3>
              <User size={20} />
              Datos Personales
            </h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Nombre *</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Apellido *</label>
                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Teléfono *</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group full-width">
                <label>Documento de Identidad *</label>
                <input
                  type="text"
                  name="documento"
                  value={formData.documento}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Sección 2: Detalles de la Reserva */}
          <div className="form-section">
            <h3>
              <Calendar size={20} />
              Detalles de la Reserva
            </h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Fecha de la Reserva *</label>
                <input
                  type="date"
                  name="fechaReserva"
                  value={formData.fechaReserva}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              {serviceType !== 'hotel' && (
                <div className="form-group">
                  <label>Número de Personas *</label>
                  <input
                    type="number"
                    name="numeroPersonas"
                    value={formData.numeroPersonas}
                    onChange={handleInputChange}
                    min="1"
                    max="20"
                    required
                  />
                </div>
              )}
              <div className="form-group full-width">
                <label>Solicitudes Especiales</label>
                <textarea
                  name="solicitudesEspeciales"
                  value={formData.solicitudesEspeciales}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Dietas especiales, necesidades médicas, etc."
                />
              </div>
            </div>
          </div>

          {/* Sección 3: Información de Pago */}
          <div className="form-section">
            <h3>
              <CreditCard size={20} />
              Información de Pago
            </h3>
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Método de Pago *</label>
                <select
                  name="metodoPago"
                  value={formData.metodoPago}
                  onChange={handleInputChange}
                  required
                >
                  <option value="efectivo">Efectivo</option>
                  <option value="tarjeta">Tarjeta de Crédito/Débito</option>
                  <option value="transferencia">Transferencia Bancaria</option>
                </select>
              </div>

              {formData.metodoPago === 'tarjeta' && (
                <>
                  <div className="form-group full-width">
                    <label>Nombre del Titular *</label>
                    <input
                      type="text"
                      name="nombreTitular"
                      value={formData.nombreTitular}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Número de Tarjeta *</label>
                    <input
                      type="text"
                      name="numeroTarjeta"
                      value={formData.numeroTarjeta}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Fecha de Vencimiento *</label>
                    <input
                      type="text"
                      name="fechaVencimiento"
                      value={formData.fechaVencimiento}
                      onChange={handleInputChange}
                      placeholder="MM/AA"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV *</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      maxLength="4"
                      required
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Resumen de precio */}
          <div className="price-summary">
            <div className="price-row">
              <span>Precio base:</span>
              <span>${serviceData.precio.toLocaleString()}</span>
            </div>
            {serviceType !== 'hotel' && formData.numeroPersonas > 1 && (
              <div className="price-row">
                <span>Personas ({formData.numeroPersonas}):</span>
                <span>${(serviceData.precio * formData.numeroPersonas).toLocaleString()}</span>
              </div>
            )}
            <div className="price-row total">
              <span>Total:</span>
              <span>${(serviceData.precio * (serviceType !== 'hotel' ? formData.numeroPersonas : 1)).toLocaleString()}</span>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="form-actions">
            <button 
              type="button" 
              onClick={() => navigate(-1)}
              className="cancel-button"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Procesando...' : 'Confirmar Reserva'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}