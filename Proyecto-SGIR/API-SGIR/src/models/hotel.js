import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  ubicacion: { type: String, required: true, trim: true },
  numeroHabitaciones: { type: Number, required: true, min: 0 },
  numeroPersonas: { type: Number, required: true, min: 0 },
  comida: { type: String, required: true, trim: true },
  precio: { type: Number, required: true, min: 0 },
  categoria: { type: String, enum: ['baja', 'media'], required: true },
  imagen: { type: String, default: '' },
  fechaCreacion: { type: Date, default: Date.now },
  activo: { type: Boolean, default: true }
}, { collection: 'hotel' });

export default mongoose.models.Hotel || mongoose.model('Hotel', hotelSchema);
