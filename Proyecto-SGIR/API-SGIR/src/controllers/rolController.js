import Rol from "../models/Rol.js";

// Crear un nuevo rol
const createRol = (req, res) => {
    const { nombre, descripcion } = req.body;
    const nuevoRol = new Rol({ nombre, descripcion });
    nuevoRol
        .save()
        .then((data) => res.status(201).json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
};

// Obtener todos los roles
const getRoles = (req, res) => {
    Rol
        .find()
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
};

// Consultar un rol por ID
const consultRol = (req, res) => {
    const { id } = req.params;
    Rol
        .findById(id)
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(404).json({ message: "Rol no encontrado" }));
};

// Actualizar un rol
const updateRol = (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    Rol
        .findByIdAndUpdate(id, { nombre, descripcion }, { new: true })
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
};

// Eliminar un rol
const deleteRol = (req, res) => {
    const { id } = req.params;
    Rol
        .findByIdAndDelete(id)
        .then((data) => res.status(200).json({ message: "Rol eliminado exitosamente", data }))
        .catch((error) => res.status(500).json({ message: error.message }));
};

export {
    createRol,
    getRoles,
    consultRol,
    updateRol,
    deleteRol
};
