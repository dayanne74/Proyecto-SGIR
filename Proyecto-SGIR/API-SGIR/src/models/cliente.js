import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const clienteSchema = new mongoose.Schema({
  numeroDocumento: { type: String, required: true, unique: true },  
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contrasena: { 
    type: String, 
    required: true,
    select: false // No se incluye en consultas por defecto
  },
  rol: {
    type: String,
    default: "Usuario",
    enum: ["Usuario", "Administrador"], 
  }
}, { versionKey: false }); 

clienteSchema.pre('save', async function (next) {
  if (!this.isModified('contrasena')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.contrasena = await bcrypt.hash(this.contrasena, salt);
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model("Cliente", clienteSchema);

