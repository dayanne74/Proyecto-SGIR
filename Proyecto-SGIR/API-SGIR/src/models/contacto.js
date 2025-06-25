import mongoose from "mongoose";

const contactoSchema = mongoose.Schema({
    nombre_apellido: {
        type: String, 
        required: true,
    },
    correo: {
        type: String, 
        required: true,
        match: /.+\@.+\..+/ // Validación básica para correos electrónicos
    },
    asunto: {
        type: String, 
        required: true,
    },
    mensaje: {
        type: String, 
        required: true,
    },
    fechaActual: {
        type: Date, 
        required: true,
        default: Date.now // Establecer la fecha actual por defecto
    },
});

export default mongoose.model('Contacto', contactoSchema);