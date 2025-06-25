import mongoose from 'mongoose';

const excursionSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  descripcion: { type: String, required: true },
  destino: { type: String, required: true },
  precio: { type: Number, required: true, min: 0 },
  duracion: { type: String, required: true },
  transporte: { type: String, required: true },
  comida: { type: String, required: true },
  actividad: { type: String, required: true },
  imagen: { type: String, default: '' },
  fechaCreacion: { type: Date, default: Date.now },
  activo: { type: Boolean, default: true }
}, { collection: 'excursion' });

export default mongoose.models.Excursion || mongoose.model('Excursion', excursionSchema);
