// src/models/usuario.js

import mongoose, { Schema } from "mongoose";

const Usuario = new Schema({
  nombreUsuario:   { type: String, required: true },
  apellidoUsuario: { type: String, required: true },
  numeroDocumento: { type: String, required: true, unique: true },
  correo:          { type: String, required: true, unique: true },
  // <-- aquí se llama "contrasena"
  contrasena:      { type: String, required: true },
  roles: [
    { type: Schema.Types.ObjectId, ref: "Rol" }
  ],
  estadoUsuario: {
    type: Boolean,
    default: true,
    required: true,
  },
  creadoEn: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Usuario || mongoose.model("Usuario", Usuario);
