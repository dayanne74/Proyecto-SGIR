import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  MapPin,
  Clock,
  DollarSign,
  Users,
  Calendar,
  CheckCircle,
  CreditCard,
  User,
  Phone,
  Mail,
  FileText,
  Home,
  Package
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './ConfirmationPage.css';

export default function ConfirmationPage() {
  const { token } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const printRef = useRef();

  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Obtener ID de reserva y código de confirmación
  const reservaId = location.state?.reservaId;
  const codigoConfirmacion = location.state?.codigo;
console.log('Fetching reservation:', reservaId, 'with token:', token);
if (!reservaId) console.warn('¡No hay reservaId!');
if (!token)  console.warn('¡No hay token!');
  useEffect(() => {
  if (!reservaId || !codigoConfirmacion) {
    navigate('/ReservasGestion');
    return;
  }

  console.log('Fetching reservation:', reservaId, 'token:', token);

  // ConfirmationPage.jsx → en useEffect
const fetchReservationDetails = async () => {
  try {
    // Usamos el código, no el ID
    const res = await fetch(
      `http://localhost:5000/api/reservas/consulta/${codigoConfirmacion}`
    );
    if (!res.ok) throw new Error(`Error ${res.status}`);
    const { data } = await res.json();
    setReservation(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


     

  fetchReservationDetails();
}, [reservaId, codigoConfirmacion, token, navigate]);

  const getServiceIcon = (tipo) => {
    switch (tipo) {
      case 'hotel': return <Home className="service-icon" />;
      case 'paquete': return <Package className="service-icon" />;
      default: return <MapPin className="service-icon" />;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };
  const handleDownloadPdf = async () => {
    if (!printRef.current) return;
    // Opcional: mostrar spinner mientras se genera
    const canvas = await html2canvas(printRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    let heightLeft = pdfHeight;
    let position = 0;
    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
    heightLeft -= pdf.internal.pageSize.getHeight();
    while (heightLeft > 0) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
    }
    pdf.save(`reserva_${codigoConfirmacion}.pdf`);
  };
  if (loading) {
    return (
      <div className="confirmation-container">
        <div className="loading-spinner"></div>
        <p>Cargando detalles de tu reserva...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="confirmation-container">
        <div className="error-message">
          <h2>Error al cargar la reserva</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/cliente/ReservasGestion')}>
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  if (!reservation) {
    return null;
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-header">
        <div className="header-content">
          <CheckCircle size={48} className="success-icon" />
          <h1>¡Reserva Confirmada!</h1>
          <p className="confirmation-code">
            Código de confirmación: <strong>{codigoConfirmacion}</strong>
          </p>
          <p className="confirmation-message">
            Hemos enviado un correo electrónico con los detalles de tu reserva
          </p>
        </div>
      </div>

      <div className="reservation-details">
        {/* Sección: Detalles del Servicio */}
        <div className="detail-section">
          <h2>
            {getServiceIcon(reservation.tipoServicio)}
            Detalles del Servicio
          </h2>
          
          <div className="detail-card">
            <div className="service-image">
              {reservation.servicio.imagen ? (
                <img
                  src={`/uploads/${reservation.servicio.imagen}`}
                  alt={reservation.servicio.nombre}
                />
              ) : (
                <div className="image-placeholder">
                  {getServiceIcon(reservation.tipoServicio)}
                </div>
              )}
            </div>
            
            <div className="service-info">
              <h3>{reservation.servicio.nombre}</h3>
              
              <div className="detail-row">
                <Calendar size={18} />
                <span>Fecha de reserva: {formatDate(reservation.fechaReserva)}</span>
              </div>
              
              <div className="detail-row">
                <Users size={18} />
                <span>
                  {reservation.tipoServicio === 'hotel' 
                    ? `Habitaciones: ${reservation.numeroPersonas}` 
                    : `Personas: ${reservation.numeroPersonas}`}
                </span>
              </div>
              
              <div className="detail-row">
                <DollarSign size={18} />
                <span>Precio unitario: ${reservation.servicio.precio.toLocaleString()}</span>
              </div>
              
              <div className="detail-row">
                <CreditCard size={18} />
                <span>Total pagado: ${reservation.precioTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sección: Información Personal */}
        <div className="detail-section">
          <h2>
            <User size={24} />
            Información Personal
          </h2>
          
          <div className="detail-grid">
            <div className="detail-item">
              <User size={18} />
              <div>
                <h4>Nombre completo</h4>
                <p>{reservation.nombre} {reservation.apellido}</p>
              </div>
            </div>
            
            <div className="detail-item">
              <Mail size={18} />
              <div>
                <h4>Email</h4>
                <p>{reservation.email}</p>
              </div>
            </div>
            
            <div className="detail-item">
              <Phone size={18} />
              <div>
                <h4>Teléfono</h4>
                <p>{reservation.telefono}</p>
              </div>
            </div>
            
            <div className="detail-item">
              <FileText size={18} />
              <div>
                <h4>Documento de identidad</h4>
                <p>{reservation.documento}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sección: Detalles de Pago */}
        <div className="detail-section">
          <h2>
            <CreditCard size={24} />
            Información de Pago
          </h2>
          
          <div className="payment-details">
            <div className="detail-row">
              <span>Método de pago:</span>
              <span className="payment-method">
                {reservation.metodoPago === 'efectivo' ? 'Efectivo' : 
                 reservation.metodoPago === 'tarjeta' ? 'Tarjeta de Crédito/Débito' : 
                 'Transferencia Bancaria'}
              </span>
            </div>
            
            {reservation.metodoPago === 'tarjeta' && (
              <>
                <div className="detail-row">
                  <span>Tarjeta:</span>
                  <span>**** **** **** {reservation.numeroTarjeta.slice(-4)}</span>
                </div>
                <div className="detail-row">
                  <span>Titular:</span>
                  <span>{reservation.nombreTitular}</span>
                </div>
              </>
            )}
            
            <div className="detail-row">
              <span>Estado de pago:</span>
              <span className="payment-status confirmed">Confirmado</span>
            </div>
          </div>
        </div>

        {/* Sección: Solicitudes Especiales */}
        {reservation.solicitudesEspeciales && (
          <div className="detail-section">
            <h2>Solicitudes Especiales</h2>
            <div className="special-requests">
              <p>{reservation.solicitudesEspeciales}</p>
            </div>
          </div>
        )}
        <div className="reservation-details" ref={printRef}>
        {/* ... todo el contenido tal cual ... */}
        <div className="detail-section">
          <h2>{getServiceIcon(reservation.tipoServicio)} Detalles del Servicio</h2>
          <div className="detail-card">
            <div className="service-image">
              {reservation.servicio.imagen ? (
                <img
                  src={`/uploads/${reservation.servicio.imagen}`}
                  alt={reservation.servicio.nombre}
                />
              ) : (
                <div className="image-placeholder">
                  {getServiceIcon(reservation.tipoServicio)}
                </div>
              )}
            </div>
            <div className="service-info">
              <h3>{reservation.servicio.nombre}</h3>
              <div className="detail-row">
                <Calendar size={18} />
                <span>Fecha de reserva: {formatDate(reservation.fechaReserva)}</span>
              </div>
              <div className="detail-row">
                <Users size={18} />
                <span>
                  {reservation.tipoServicio === 'hotel'
                    ? `Habitaciones: ${reservation.numeroPersonas}`
                    : `Personas: ${reservation.numeroPersonas}`}
                </span>
              </div>
              <div className="detail-row">
                <DollarSign size={18} />
                <span>Precio unitario: ${reservation.servicio.precio.toLocaleString()}</span>
              </div>
              <div className="detail-row">
                <CreditCard size={18} />
                <span>Total pagado: ${reservation.precioTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="detail-section">
          <h2><User size={24} /> Información Personal</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <User size={18} />
              <div>
                <h4>Nombre completo</h4>
                <p>{reservation.nombre} {reservation.apellido}</p>
              </div>
            </div>
            <div className="detail-item">
              <Mail size={18} />
              <div>
                <h4>Email</h4>
                <p>{reservation.email}</p>
              </div>
            </div>
            <div className="detail-item">
              <Phone size={18} />
              <div>
                <h4>Teléfono</h4>
                <p>{reservation.telefono}</p>
              </div>
            </div>
            <div className="detail-item">
              <FileText size={18} />
              <div>
                <h4>Documento de identidad</h4>
                <p>{reservation.documento}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="detail-section">
          <h2><CreditCard size={24} /> Información de Pago</h2>
          <div className="payment-details">
            <div className="detail-row">
              <span>Método de pago:</span>
              <span className="payment-method">
                {reservation.metodoPago === 'efectivo' ? 'Efectivo'
                 : reservation.metodoPago === 'tarjeta' ? 'Tarjeta de Crédito/Débito'
                 : 'Transferencia Bancaria'}
              </span>
            </div>
            {reservation.metodoPago === 'tarjeta' && (
              <>
                <div className="detail-row">
                  <span>Tarjeta:</span>
                  <span>**** **** **** {reservation.numeroTarjeta.slice(-4)}</span>
                </div>
                <div className="detail-row">
                  <span>Titular:</span>
                  <span>{reservation.nombreTitular}</span>
                </div>
              </>
            )}
            <div className="detail-row">
              <span>Estado de pago:</span>
              <span className="payment-status confirmed">Confirmado</span>
            </div>
          </div>
        </div>
        {reservation.solicitudesEspeciales && (
          <div className="detail-section">
            <h2>Solicitudes Especiales</h2>
            <div className="special-requests">
              <p>{reservation.solicitudesEspeciales}</p>
            </div>
          </div>
        )}
      </div>
        {/* Botón de acción */}
        <div className="confirmation-actions">
          <button 
            onClick={() => navigate('/cliente/ReservasGestion')}
            className="home-button"
          >
            Volver al inicio
          </button>
          <button 
            onClick={() => window.print()}
            className="print-button"
          >
            Imprimir comprobante
          </button>
          <button
          onClick={handleDownloadPdf}
          className="download-button"
        >
          Descargar como PDF
        </button>
        </div>
      </div>
    </div>
  );
}