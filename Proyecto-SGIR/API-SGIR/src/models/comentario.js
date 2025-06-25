import mongoose from "mongoose";

const comentarioSchema = mongoose.Schema({
    nombreCompleto: {
        type: String,
        required: true,
    },
    
    valoracion: {
        type: String,
        required: true,
    },
    opinion: {
        type: String,
        required: true,
    },
});

export default mongoose.model("comentarios", comentarioSchema);
