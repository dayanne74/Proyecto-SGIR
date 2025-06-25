import mongoose, { Schema } from "mongoose";

const RolSchema = new Schema({
    nombreRol: {
        type: String,
        required: true,
        unique: true
    }
});

const Rol = mongoose.model("Rol", RolSchema);
export default Rol;
