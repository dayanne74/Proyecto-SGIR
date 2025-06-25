// src/controllers/autenticación_controller.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Usuario from "../models/usuario.js";

import Rol from '../models/rol.js';
import dotenv from 'dotenv';
dotenv.config();

export const login = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    // 1️⃣ Buscamos el usuario
    const usuario = await Usuario.findOne({ correo }).populate('roles');
    if (!usuario) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // 2️⃣ Fallback del hash: puede estar en contrasena o contrasenaHash
    const hashAlmacenado = usuario.contrasena || usuario.contrasenaHash;
    if (!hashAlmacenado) {
      return res.status(500).json({ message: 'Error interno: contraseña no almacenada correctamente' });
    }

    // 3️⃣ Comparamos la contraseña con el hash
    const isMatch = await bcrypt.compare(contrasena, hashAlmacenado);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // 4️⃣ Extraemos los roles
    const roles = usuario.roles.map(r => r.nombreRol);

    // 5️⃣ Firmamos el token con los datos y roles
    const token = jwt.sign(
      {
        id: usuario._id,
        nombre: usuario.nombreUsuario,
        apellido: usuario.apellidoUsuario,
        roles,
      },
      process.env.JWT_SECRET,
      { expiresIn: '12h' }
    );

    return res.json({ token });

  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};


export const registrar = async (req, res) => {
  try {
    const {
      nombreUsuario,
      apellidoUsuario,
      numeroDocumento,
      correo,
      contrasena,
    } = req.body;

    // 1️⃣ Validaciones básicas
    if (!contrasena) {
      return res.status(400).json({ message: 'La contraseña es requerida' });
    }
    const existe = await Usuario.findOne({ $or: [{ correo }, { numeroDocumento }] });
    if (existe) {
      return res.status(400).json({ message: 'Correo o documento ya registrado' });
    }

    // 2️⃣ Buscamos el rol "cliente"
    const rolCliente = await Rol.findOne({ nombreRol: 'cliente' });
    if (!rolCliente) {
      return res.status(500).json({ message: 'Rol cliente no está creado' });
    }

    // 3️⃣ Encriptamos la contraseña
    const hash = await bcrypt.hash(contrasena, 10);

    // 4️⃣ Creamos el usuario con el rol por defecto
    const nuevoUsuario = new Usuario({
      nombreUsuario,
      apellidoUsuario,
      numeroDocumento,
      correo,
      contrasena: hash,    // usamos siempre este campo
      roles: [rolCliente._id],
    });

    await nuevoUsuario.save();
    return res.status(201).json({ message: 'Usuario registrado correctamente' });

  } catch (error) {
    console.error('Error al registrar:', error);
    return res.status(500).json({ message: 'Error al registrar' });
  }
};
export const obtenerUsuarios = async (req, res) => {
    try {
      // Trae todos los usuarios y sus roles
      const usuarios = await Usuario.find().populate('roles', 'nombreRol');
      res.json(usuarios);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ message: 'Error al obtener usuarios' });
    }
  };