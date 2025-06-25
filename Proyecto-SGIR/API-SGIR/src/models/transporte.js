import mongoose from 'mongoose';

const transporteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
    },
    capacidad: {
        type: Number,
        required: true,
        min: 1, // Debe ser al menos 1 pasajero
    },
    descripcion: {
        type: String,
        required: true,
        minlength: 10,
    },
    comodidades: {
        type: [String], // Array para listar diferentes comodidades
        required: true,
    },
    placa: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 10,
        match: /^[A-Z0-9-]+$/, // Patrón para validar la placa
    },
    categoria: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model('Transporte', transporteSchema);
