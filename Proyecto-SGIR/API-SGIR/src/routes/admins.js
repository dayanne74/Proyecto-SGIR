import express from 'express';
import { createAdmin, getAdmin, getAdminById, updateAdmin, deleteAdmin } from '../controllers/admincontrolador.js';
import { verifyToken, verifyRole } from "../middleware/authMiddleware.js";
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       properties:
 *         nombreCompleto:
 *           type: string
 *           description: Nombre completo del administrador
 *         correo: 
 *           type: string
 *           description: Correo electrónico del administrador
 *         nit:
 *           type: string
 *           description: NIT del administrador
 *         contraseña:
 *           type: string
 *           description: Contraseña del administrador
 *       required:
 *         - nombreCompleto
 *         - correo
 *         - nit
 *         - contraseña
 */

/**
 * @swagger
 * /api/admin:
 *   post:
 *     summary: Crea un nuevo administrador
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       200:
 *         description: Administrador creado exitosamente
 */
router.post('/admin',createAdmin);


/**
 * @swagger
 * /api/admin:
 *   get:
 *     summary: Obtiene todos los administradores
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Lista de administradores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Admin'
 */
router.get('/admin', verifyToken, verifyRole(['Admin']), getAdmin);

/**
 * @swagger
 * /api/admin/{id}:
 *   get:
 *     summary: Obtiene un administrador por ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del administrador
 *     responses:
 *       200:
 *         description: Información del administrador
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 */
router.get('/admin/:id', verifyToken, verifyRole(['Admin']), getAdminById);

/**
 * @swagger
 * /api/admin/{id}:
 *   put:
 *     summary: Actualiza un administrador por ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del administrador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       200:
 *         description: Administrador actualizado exitosamente
 */
router.put('/admin/:id', verifyToken, verifyRole(['Admin']), updateAdmin);

/**
 * @swagger
 * /api/admin/{id}:
 *   delete:
 *     summary: Elimina un administrador por ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del administrador
 *     responses:
 *       200:
 *         description: Administrador eliminado exitosamente
 *       404:
 *         description: Administrador no encontrado
 */
router.delete('/admin/:id', verifyToken, verifyRole(['Admin']), deleteAdmin);

export default router;
