import express from 'express';
import { createTransporte, getTransportes, getTransporteById, deleteTransporte } from '../controllers/transporteControllers.js';
import { verifyToken, verifyRole } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Transportes
 *   description: Gestión de servicios de transporte
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
 *     Transporte:
 *       type: object
 *       properties:
 *         tipo:
 *           type: string
 *           enum: [avión, autobús, tren, barco, vehículo privado]
 *           example: "autobús"
 *           description: Tipo de transporte
 *         capacidad:
 *           type: integer
 *           minimum: 1
 *           example: 50
 *           description: Capacidad de pasajeros
 *         descripcion:
 *           type: string
 *           example: "Autobús ejecutivo con aire acondicionado"
 *           description: Descripción del servicio
 *         precioPorPersona:
 *           type: number
 *           format: float
 *           minimum: 0
 *           example: 25.99
 *           description: Precio por persona
 *         disponibilidad:
 *           type: boolean
 *           example: true
 *           description: Disponibilidad actual
 *         horario:
 *           type: string
 *           example: "Lunes a Viernes 8:00-18:00"
 *           description: Horario de servicio
 *         imagen:
 *           type: string
 *           format: uri
 *           example: "https://ejemplo.com/autobus.jpg"
 *           description: Imagen representativa
 *       required:
 *         - tipo
 *         - capacidad
 *         - precioPorPersona
 *         - disponibilidad
 */

/**
 * @swagger
 * /api/transporte:
 *   post:
 *     summary: Crea un nuevo servicio de transporte (Requiere autenticación y rol Administrador)
 *     tags: [Transportes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transporte'
 *     responses:
 *       201:
 *         description: Servicio de transporte creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transporte'
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido (rol no autorizado)
 */
router.post('/transporte', verifyToken, verifyRole(['administrador']), createTransporte);

/**
 * @swagger
 * /api/transporte:
 *   get:
 *     summary: Obtiene todos los servicios de transporte disponibles (Público)
 *     tags: [Transportes]
 *     responses:
 *       200:
 *         description: Lista de transportes disponibles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transporte'
 */
router.get('/transporte', getTransportes);



/**
 * @swagger
 * /api/transporte/{id}:
 *   put:
 *     summary: Actualiza un servicio de transporte por ID (Requiere autenticación y rol Administrador)
 *     tags: [Transportes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del servicio de transporte
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transporte'
 *     responses:
 *       200:
 *         description: Transporte actualizado exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido (rol no autorizado)
 *       404:
 *         description: Transporte no encontrado
 */
router.put('/transporte/:id', verifyToken, verifyRole(['administrador']), getTransporteById);

/**
 * @swagger
 * /api/transporte/{id}:
 *   delete:
 *     summary: Elimina un servicio de transporte por ID (Requiere autenticación y rol Administrador)
 *     tags: [Transportes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del servicio de transporte
 *     responses:
 *       200:
 *         description: Transporte eliminado exitosamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido (rol no autorizado)
 *       404:
 *         description: Transporte no encontrado
 */
router.delete('/transporte/:id', verifyToken, verifyRole(['administrador']), deleteTransporte);

export default router;
