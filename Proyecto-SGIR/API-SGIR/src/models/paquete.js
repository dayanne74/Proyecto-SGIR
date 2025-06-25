import mongoose from "mongoose";

const paqueteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    enum: ['paquete 1', 'paquete 2', 'paquete 3', 'paquete 4'],
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    required: true,
    trim: true
  },
  destino: {
    type: String,
    required: true,
    trim: true
  },
  actividad: {
    type: String,
    required: true,
    trim: true
  },
  numeroPersonas: {
    type: String,
    required: true,
    trim: true
  },
  duracion: {
    type: String,
    required: true,
    trim: true
  },
  precio: {
    type: Number,
    required: true,
    min: 0
  },
  transporte: {
    type: String,
    required: true,
    trim: true
  },
  comida: {
    type: String,
    required: true,
    trim: true
  },
  imagen: {
    type: String,
    default: ''
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  activo: {
    type: Boolean,
    default: true
  }
}, {
  collection: 'paquete'
});

export default mongoose.models.Paquete || mongoose.model("Paquete", paqueteSchema);
