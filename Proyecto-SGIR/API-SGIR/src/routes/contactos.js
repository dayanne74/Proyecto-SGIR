import express from "express";
import { createContacto, getContacto, getContactoById, deleteContacto } from "../controllers/contactosControllers.js";
import { verifyToken, verifyRole } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Contactos
 *   description: Gestión de mensajes de contacto de clientes
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Contacto:
 *       type: object
 *       properties:
 *         nombre_apellido:
 *           type: string
 *           example: "Juan Pérez"
 *         correo:
 *           type: string
 *           format: email
 *           example: "juan@example.com"
 *         asunto:
 *           type: string
 *           example: "Consulta sobre reservas"
 *         mensaje:
 *           type: string
 *           example: "Quisiera saber sobre disponibilidad para diciembre"
 *         fechaActual:
 *           type: string
 *           format: date-time
 *           example: "2023-11-15T10:30:00Z"
 *       required:
 *         - nombre_apellido
 *         - correo
 *         - asunto
 *         - mensaje
 */

/**
 * @swagger
 * /api/contactos:
 *   post:
 *     summary: Crea un nuevo mensaje de contacto (Público)
 *     tags: [Contactos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contacto'
 *     responses:
 *       201:
 *         description: Mensaje enviado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contacto'
 *       400:
 *         description: Datos de entrada inválidos
 */
router.post("/", createContacto);

/**
 * @swagger
 * /api/contactos:
 *   get:
 *     summary: Obtiene todos los mensajes (Requiere autenticación y rol Administrador)
 *     tags: [Contactos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista completa de mensajes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contacto'
 *       401:
 *         description: No autorizado (token inválido o no proporcionado)
 *       403:
 *         description: Prohibido (rol no autorizado)
 */
router.get("/", verifyToken, verifyRole(['administrador']), getContacto);

/**
 * @swagger
 * /api/contactos/{id}:
 *   get:
 *     summary: Obtiene un mensaje específico por ID (Requiere autenticación y rol Administrador)
 *     tags: [Contactos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del mensaje
 *     responses:
 *       200:
 *         description: Información del mensaje
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contacto'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido
 *       404:
 *         description: Mensaje no encontrado
 */
router.get("/:id", verifyToken, verifyRole(['administrador']), getContactoById);

/**
 * @swagger
 * /api/contactos/{id}:
 *   delete:
 *     summary: Elimina un mensaje por ID (Requiere autenticación y rol Administrador)
 *     tags: [Contactos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del mensaje
 *     responses:
 *       200:
 *         description: Mensaje eliminado exitosamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido
 *       404:
 *         description: Mensaje no encontrado
 */
router.delete("/:id", verifyToken, verifyRole(['administrador']), deleteContacto);

export default router;