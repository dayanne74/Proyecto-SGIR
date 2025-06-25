import bcrypt from 'bcrypt';
import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  nombreCompleto: { 
    type: String, 
    required: true 
  },
  correo: { 
    type: String,
    required: true,
    unique: true 
  },
  nit: {
    type: String,
    required: true, 
    unique: true 
  },
  contrasena: {
    type: String,
    required: true,
    select: false // No se incluye en consultas por defecto
  },
  roles: {
    type: String,
    default: "Administrador",
    enum: ["Usuario", "Administrador"], 
  }
}, { versionKey: false });

AdminSchema.pre('save', async function (next) {
  if (!this.isModified('contrasena')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.contrasena = await bcrypt.hash(this.contrasena, salt);
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model("Admin", AdminSchema);
