import Rol from "../models/rol.js";

export const crearRolesPredeterminados = async () => {
    try {
        const roladministrador = await Rol.findOne({ nombreRol: "administrador" });
        if (!roladministrador) {
            await new Rol({ nombreRol: "administrador" }).save();
            console.log("Rol administrador creado");
        }

        const rolcliente = await Rol.findOne({ nombreRol: "cliente" });
        if (!rolcliente) {
            await new Rol({ nombreRol: "cliente" }).save();
            console.log("Rol cliente creado");
        }

        console.log("Verificación de roles completada.");
    } catch (error) {
        console.error("Error creando roles:", error);
    }
};