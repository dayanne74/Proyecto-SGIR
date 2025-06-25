import comentarioSchema from '../models/comentario.js';
import {validatorHandler} from "../middleware/validator.handler.js"
import {
  createComentarioSchema,
  getComentarioSchema,
  updateComentarioSchema,
  deleteComentarioSchema,
} from "../validators/comentariosValidarDTO.js";

// Crear comentario
export const crearcomentario = [
  validatorHandler(createComentarioSchema, "body"),
  async (req, res) => {
    const comentario = new comentarioSchema(req.body);
    await comentario
      .save()
      .then((data) => res.status(201).json(data))
      .catch((error) => res.status(500).json({ message: error.message }));
  },
];

// Obtener todos los comentarios
export const obtenercomentario = (req, resp) => {
  comentarioSchema
    .find()
    .then((data) => resp.json(data))
    .catch((error) => resp.status(500).json({ message: error.message }));
};

// Consultar un comentario por ID
export const consultarcomentario = [
  validatorHandler(getComentarioSchema, "params"),
  async (req, resp) => {
    const { id } = req.params; // extraigo el id del comentario
    try {
      const comentario = await comentarioSchema.findById(id);
      if (!comentario) {
        return resp.status(404).json({
          message: "Comentario no encontrado",
        });
      }
      resp.json(comentario);
    } catch (error) {
      resp.status(500).json({
        message: error.message,
      });
    }
  },
];

// Actualizar comentario
export const actualizarcomentario = [
  validatorHandler(getComentarioSchema, "params"),
  validatorHandler(updateComentarioSchema, "body"),
  async (req, resp) => {
    const { id } = req.params;
    const { nombreCompleto, valoracion, opinion } = req.body;

    try {
      const actualizarcomentario = await comentarioSchema.updateOne(
        { _id: id },
        { $set: { nombreCompleto, valoracion, opinion } }
      );

      if (actualizarcomentario.matchedCount === 0) {
        return resp.status(404).json({ message: "Comentario no encontrado" });
      }

      resp.status(200).json({ message: "Comentario actualizado correctamente" });
    } catch (error) {
      resp.status(500).json({ message: error.message });
    }
  },
];

// Borrar comentario
export const borrarcomentario = [
  validatorHandler(deleteComentarioSchema, "params"),
  async (req, resp) => {
    const { id } = req.params;
    try {
      const result = await comentarioSchema.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        return resp.status(404).json({ message: "Comentario no encontrado" });
      }
      resp.status(200).json({ message: "Comentario eliminado correctamente" });
    } catch (error) {
      resp.status(500).json({ message: error.message });
    }
  },
];