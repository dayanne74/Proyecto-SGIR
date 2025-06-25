import mongoose from 'mongoose';

const reservaSchema = new mongoose.Schema({
  // Datos personales del cliente
  nombre: { type: String, required: true, trim: true },
  apellido: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  telefono: { type: String, required: true, trim: true },
  documento: { type: String, required: true, trim: true },
  
  // Datos de la reserva
  fechaReserva: { type: Date, required: true },
  numeroPersonas: { type: Number, required: true, min: 1, default: 1 },
  solicitudesEspeciales: { type: String, default: '', trim: true },
  
  // Información del servicio reservado
  servicioId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'tipoServicio' },
  tipoServicio: { type: String, required: true, enum: ['excursion','hotel','paquete'] },
  servicio: {
    nombre: { type: String, required: true },
    tipo: { type: String, required: true },
    precio: { type: Number, required: true }
  },
  
  // Información de pago
  metodoPago: { type: String, required: true, enum: ['efectivo','tarjeta','transferencia'], default: 'efectivo' },
  numeroTarjeta: { type: String, default: '' },
  fechaVencimiento: { type: String, default: '' },
  cvv: { type: String, default: '' },
  nombreTitular: { type: String, default: '' },
  
  // Cálculos de precio
  precioUnitario: { type: Number, required: true, min: 0 },
  precioTotal: { type: Number, required: true, min: 0 },
  
  // Estado de la reserva
  estado: { type: String, enum: ['pendiente','confirmada','cancelada','completada'], default: 'pendiente' },
  
  // Información del usuario que realizó la reserva (si está autenticado)
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', default: null },
  
  // Código de confirmación único
  codigoConfirmacion: { type: String, unique: true, required: true },
  
  // Fechas de auditoría
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date, default: Date.now }
}, {
  collection: 'reservas'
});

// Índices para optimizar consultas
reservaSchema.index({ codigoConfirmacion: 1 });
reservaSchema.index({ email: 1 });
reservaSchema.index({ fechaReserva: 1 });
reservaSchema.index({ estado: 1 });
reservaSchema.index({ tipoServicio: 1 });

// Middleware para actualizar fechaActualizacion
reservaSchema.pre('save', function(next) {
  this.fechaActualizacion = new Date();
  next();
});

// Generar código de confirmación
reservaSchema.methods.generarCodigoConfirmacion = function() {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2,8).toUpperCase();
  return `${this.tipoServicio.substring(0,3).toUpperCase()}-${timestamp.slice(-6)}-${random}`;
};

// Virtual nombreCompleto
reservaSchema.virtual('nombreCompleto').get(function() {
  return `${this.nombre} ${this.apellido}`;
});
reservaSchema.virtual('servicioInfo', {
  ref: function() {
    switch(this.tipoServicio) {
      case 'excursion': return 'Excursion';
      case 'hotel':     return 'Hotel';
      default:          return 'Paquete';
    }
  },
  localField: 'servicioId',
  foreignField: '_id',
  justOne: true
});
// Incluir virtuals en JSON
reservaSchema.set('toJSON', { virtuals: true });
reservaSchema.set('toObject', { virtuals: true });

export default mongoose.models.Reserva || mongoose.model('Reserva', reservaSchema);
