import Joi from "joi";

// Creamos las validaciones para cada campo
const id = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .required()
  .messages({
    "string.pattern.base":
      "El campo ID debe ser un ObjectId válido de 24 caracteres hexadecimales.",
    "any.required": "El campo ID es requerido.",
  });

const nombreCompleto = Joi.string()
  .min(3)
  .max(180)
  .required()
  .pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/)
  .messages({
    "string.base": "El nombre completo debe ser un texto.",
    "string.empty": "El nombre completo no puede estar vacío.",
    "string.min": "El nombre completo debe tener al menos 3 caracteres.",
    "string.max": "El nombre completo no puede exceder los 180 caracteres.",
    "string.pattern.base": "El nombre completo solo puede contener letras y espacios.",
    "any.required": "El nombre completo es un campo requerido.",
  });



  const valoracion = Joi.string()
  .valid("1 estrella", "2 estrellas", "3 estrellas", "4 estrellas", "5 estrellas")
  .required()
  .messages({
    "string.base": "La valoración debe ser una cadena de texto.",
    "string.empty": "La valoración es un campo requerido.",
    "any.required": "La valoración es un campo requerido.",
    "any.only": "La valoración debe ser una de las siguientes opciones: 1 estrella, 2 estrellas, 3 estrellas, 4 estrellas, 5 estrellas.",
  });

const opinion = Joi.string()
  .min(3)
  .max(500)
  .messages({
    "string.base": "La opinión debe ser un texto.",
    "string.empty": "La opinión no puede estar vacía.",
    "string.min": "La opinión debe tener al menos 3 caracteres.",
    "string.max": "La opinión no puede exceder los 500 caracteres.",
  });

// Esquemas de validación
const createComentarioSchema = Joi.object({
  nombreCompleto: nombreCompleto.required(),
  valoracion: valoracion.required(),
  opinion: opinion,
}).unknown();

const updateComentarioSchema = Joi.object({
  nombreCompleto: nombreCompleto,
  valoracion: valoracion,
  opinion: opinion,
}).unknown();

const getComentarioSchema = Joi.object({
  id: id.required(),
}).unknown();

const deleteComentarioSchema = Joi.object({
  id: id.required(),
}).unknown();

export {
  createComentarioSchema,
  getComentarioSchema,
  updateComentarioSchema,
  deleteComentarioSchema,
};
