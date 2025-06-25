import express from 'express';
import { createComida, getComida, getComidaById, deleteComida } from '../controllers/comidaControllers.js';
import { verifyToken, verifyRole } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comidas
 *   description: Gestión de platillos y menús
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
 *     Comida:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           example: "Pizza Margarita"
 *         descripcion:
 *           type: string
 *           example: "Pizza clásica con salsa de tomate, mozzarella y albahaca"
 *         precio:
 *           type: number
 *           format: float
 *           example: 12.99
 *         categoria:
 *           type: string
 *           enum: [entrada, principal, postre, bebida]
 *           example: "principal"
 *         disponibilidad:
 *           type: boolean
 *           example: true
 *         imagen:
 *           type: string
 *           format: uri
 *           example: "https://ejemplo.com/pizza.jpg"
 *       required:
 *         - nombre
 *         - precio
 *         - categoria
 */

/**
 * @swagger
 * /comida:
 *   post:
 *     summary: Crear un nuevo platillo (Requiere autenticación y rol Administrador)
 *     tags: [Comidas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comida'
 *     responses:
 *       201:
 *         description: Platillo creado exitosamente
 *       401:
 *         description: No autorizado (token inválido o no proporcionado)
 *       403:
 *         description: Prohibido (rol no autorizado)
 */
router.post('/comida', verifyToken, verifyRole(['Administrador']), createComida);

/**
 * @swagger
 * /comida:
 *   get:
 *     summary: Obtener todos los platillos disponibles (Público)
 *     tags: [Comidas]
 *     responses:
 *       200:
 *         description: Lista de platillos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comida'
 */
router.get('/comida', getComida);

/**
 * @swagger
 * /comida/{id}:
 *   get:
 *     summary: Obtener un platillo por ID (Público)
 *     tags: [Comidas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del platillo
 *     responses:
 *       200:
 *         description: Detalles del platillo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comida'
 *       404:
 *         description: Platillo no encontrado
 */
router.get('/comida/:id', getComidaById);

/**
 * @swagger
 * /comida/{id}:
 *   delete:
 *     summary: Eliminar un platillo (Requiere autenticación y rol Administrador)
 *     tags: [Comidas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del platillo a eliminar
 *     responses:
 *       200:
 *         description: Platillo eliminado correctamente
 *       401:
 *         description: No autorizado (token inválido o no proporcionado)
 *       403:
 *         description: Prohibido (rol no autorizado)
 *       404:
 *         description: Platillo no encontrado
 */
router.delete('/comida/:id', verifyToken, verifyRole(['Administrador']), deleteComida);

export default router;