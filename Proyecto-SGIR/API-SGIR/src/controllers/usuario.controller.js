import Usuario from "../models/usuario.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Crear nuevo cliente
export const crearcliente = async (req, res) => {
  try {
    const { nombre, apellido, correo, usuario, contrasena } = req.body;

    // Validación básica
    if (!nombre || !apellido || !correo || !usuario || !contrasena) {
      return res.status(400).json({ success: false, message: "Todos los campos son obligatorios." });
    }

    // Verificar si ya existe el correo o usuario
    const existeCorreo = await Usuario.findOne({ correo });
    const existeUsuario = await Usuario.findOne({ nombreUsuario: usuario });

    if (existeCorreo || existeUsuario) {
      return res.status(400).json({
        success: false,
        message: "El correo o nombre de usuario ya están registrados."
      });
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const nuevoUsuario = new Usuario({
      nombreUsuario: usuario,
      apellidoUsuario: apellido,
      correo,
      contrasena: hashedPassword,
      roles: [], // Puedes asignar por defecto un rol si es necesario
    });

    await nuevoUsuario.save();

    res.status(201).json({ success: true, message: "Cliente registrado exitosamente." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al crear el cliente", error });
  }
};

// Obtener todos los clientes
export const obtenerClientes = async (req, res) => {
  try {
    const clientes = await Usuario.find().populate("roles");
    res.status(200).json({ success: true, data: clientes });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al obtener los clientes", error });
  }
};

// Obtener cliente por ID
export const obtenerClientePorId = async (req, res) => {
  try {
    const cliente = await Usuario.findById(req.params.id).populate("roles");
    if (!cliente) {
      return res.status(404).json({ success: false, message: "Cliente no encontrado" });
    }
    res.status(200).json({ success: true, data: cliente });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al buscar el cliente", error });
  }
};

// Actualizar cliente
export const actualizarcliente = async (req, res) => {
  try {
    const { contrasena, ...datosActualizados } = req.body;

    if (contrasena) {
      datosActualizados.contrasena = await bcrypt.hash(contrasena, 10);
    }

    const clienteActualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      datosActualizados,
      { new: true, runValidators: true }
    );

    if (!clienteActualizado) {
      return res.status(404).json({ success: false, message: "Cliente no encontrado" });
    }

    res.status(200).json({ success: true, data: clienteActualizado });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al actualizar el cliente", error });
  }
};

// Eliminar cliente (lógica suave)
export const borrarcliente = async (req, res) => {
  try {
    const cliente = await Usuario.findByIdAndUpdate(
      req.params.id,
      { estadoUsuario: false },
      { new: true }
    );

    if (!cliente) {
      return res.status(404).json({ success: false, message: "Cliente no encontrado" });
    }

    res.status(200).json({ success: true, message: "Cliente desactivado correctamente", cliente });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al eliminar el cliente", error });
  }
};
export const activarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      { estadoUsuario: true },
      { new: true }
    );

    if (!usuario) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }

    res.status(200).json({ success: true, message: "Usuario activado correctamente", usuario });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al activar el usuario", error });
  }
};
