import mongoose from 'mongoose';

const comidaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    categoria: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model('Comida', comidaSchema);