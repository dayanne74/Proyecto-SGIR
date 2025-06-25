import express from "express";
import { login, registrar } from "../controllers/autenticación_controller.js";
import { verifyToken, verifyRole } from "../middleware/authMiddleware.js";
import Usuario from "../models/usuario.js";  

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         correo:
 *           type: string
 *           description: Correo electrónico del usuario
 *         contrasena:
 *           type: string
 *           description: Contraseña del usuario
 *         roles:
 *           type: string
 *           description: Rol del usuario (admin o Usuario)
 *       required:
 *         - correo
 *         - contrasena
 *         - roles
 *       example:
 *         correo: "admin@example.com"
 *         contrasena: "admin123"
 *         roles: "admin"
 */

/**
 * @swagger
 * /api/autentificaciones/login:
 *   post:
 *     summary: Inicia sesión para obtener un token JWT
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       400:
 *         description: Credenciales incorrectas
 */
router.post("/login", login);

/**
 * @swagger
 * /api/autentificaciones/registro:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreUsuario:
 *                 type: string
 *               apellidoUsuario:
 *                 type: string
 *               numeroDocumento:
 *                 type: string
 *               correo:
 *                 type: string
 *               contraseña:
 *                 type: string
 *               roles:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - nombreUsuario
 *               - apellidoUsuario
 *               - numeroDocumento
 *               - correo
 *               - contraseña
 *               - roles
 *     responses:
 *       201:
 *         description: Usuario registrado
 *       400:
 *         description: Error en el registro
 */
router.post("/registro", registrar);

/**
 * @swagger
 * /api/autentificaciones/perfil:
 *   get:
 *     summary: Obtiene el perfil del usuario (solo cliente)
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Perfil de usuario obtenido
 *       403:
 *         description: Acceso denegado
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/perfil", verifyToken, verifyRole(["cliente"]), async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.user.id).populate('roles');
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        console.error("Error al obtener perfil del usuario:", error);
        res.status(500).json({ message: "Error al obtener el perfil" });
    }
});
import { obtenerUsuarios } from '../controllers/autenticación_controller.js';

// …

// Ruta solo para Admin
router.get(
  "/usuarios",
  verifyToken,
  verifyRole(["administrador"]),
  obtenerUsuarios
);

export default router;
