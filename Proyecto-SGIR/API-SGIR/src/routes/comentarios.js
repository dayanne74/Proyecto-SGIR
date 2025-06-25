import express from "express";
import {
  crearcomentario,
  obtenercomentario,
  consultarcomentario,
  actualizarcomentario,
  borrarcomentario,
} from "../controllers/controladorCom.js";
import { verifyToken, verifyRole } from "../middleware/authMiddleware.js";
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 * 
 *     Comentario:
 *       type: object
 *       properties:
 *         nombreCompleto:
 *           type: string
 *           description: Nombre completo de la persona que realiza el comentario
 *         comentario:
 *           type: string
 *           description: Contenido del comentario
 *         valoracion:
 *           type: integer
 *           description: Valoración dada en una escala (por ejemplo, 1 a 5)
 *         opinion:
 *           type: string
 *           description: Opinión adicional del usuario
 *       required:
 *         - nombreCompleto
 *         - comentario
 *         - valoracion
 *         - opinion
 *       example:
 *         nombreCompleto: "Maria Gomez"
 *         comentario: "Servicio excelente y rápido."
 *         valoracion: 5
 *         opinion: "Muy recomendable."
 */

/**
 * @swagger
 * /api/comentarios:
 *   post:
 *     summary: Crea un nuevo comentario
 *     tags: [comentarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comentario'
 *     responses:
 *       200:
 *         description: Comentario creado exitosamente
 */
router.post("/", verifyToken, crearcomentario);

/**
 * @swagger
 * /api/comentarios:
 *   get:
 *     summary: Obtiene todos los comentarios
 *     tags: [comentarios]
 *     responses:
 *       200:
 *         description: Lista de comentarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comentario'
 */
router.get("/", obtenercomentario);

/**
 * @swagger
 * /api/comentarios/{id}:
 *   get:
 *     summary: Obtiene un comentario por ID
 *     tags: [comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del comentario
 *     responses:
 *       200:
 *         description: Información del comentario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comentario'
 */
router.get("/:id", consultarcomentario);

/**
 * @swagger
 * /api/comentarios/{id}:
 *   put:
 *     summary: Actualiza un comentario por ID
 *     tags: [comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del comentario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comentario'
 *     responses:
 *       200:
 *         description: Comentario actualizado
 */
router.put("/:id", verifyToken, verifyRole(['administrador', 'cliente']), actualizarcomentario);

/**
 * @swagger
 * /api/comentarios/{id}:
 *   delete:
 *     summary: Elimina un comentario por ID
 *     tags: [comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del comentario
 *     responses:
 *       200:
 *         description: Comentario eliminado
 *       404:
 *         description: Comentario no encontrado
 */
router.delete("/:id", verifyToken, verifyRole(['administrador', 'cliente']), borrarcomentario);

export default router;
