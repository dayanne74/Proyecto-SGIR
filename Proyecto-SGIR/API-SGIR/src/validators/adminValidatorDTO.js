import Joi from "joi";

// Definición del ID
const id = Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/) // Valida un ObjectId de MongoDB
    .required()
    .messages({
        "string.pattern.base": "El campo ID debe ser un ObjectId válido de 24 caracteres hexadecimales.",
        "any.required": "El campo ID es requerido.",
    });

// Definición del nombre completo
const nombreCompleto = Joi.string()
  .min(3)
  .max(100)
  .pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/)
  .required()
  .messages({
    "string.base": "El nombre completo debe ser un texto.",
    "string.empty": "El nombre completo no puede estar vacío.",
    "string.min": "El nombre completo debe tener al menos 3 caracteres.",
    "string.max": "El nombre completo no puede exceder los 100 caracteres.",
    "string.pattern.base": "El nombre completo solo puede contener letras y espacios.",
    "any.required": "El nombre completo es un campo requerido.",
  });

// Definición del correo electrónico
const correo = Joi.string()
  .email()
  .required()
  .messages({
    "string.email": "El correo debe ser una dirección de correo electrónico válida.",
    "string.empty": "El correo no puede estar vacío.",
    "any.required": "El correo es un campo requerido.",
  });

// Definición del NIT
const nit = Joi.string()
  .pattern(/^\d+$/)
  .min(6)
  .max(15)
  .required()
  .messages({
    "string.pattern.base": "El NIT solo puede contener números.",
    "string.empty": "El NIT no puede estar vacío.",
    "string.min": "El NIT debe tener al menos 6 caracteres.",
    "string.max": "El NIT no puede exceder los 15 caracteres.",
    "any.required": "El NIT es un campo requerido.",
  });

// Definición de la contraseña
const contrasena = Joi.string()
  .min(8)
  .max(30)
  .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/)
  .required()
  .messages({
    "string.base": "La contraseña debe ser un texto.",
    "string.empty": "La contraseña no puede estar vacía.",
    "string.min": "La contraseña debe tener al menos 8 caracteres.",
    "string.max": "La contraseña no puede exceder los 30 caracteres.",
    "string.pattern.base": "La contraseña debe contener al menos una letra y un número.",
    "any.required": "La contraseña es un campo requerido.",
  });

// Esquema para crear un administrador
const createAdminSchema = Joi.object({
  nombreCompleto: nombreCompleto.required(),
  correo: correo.required(),
  nit: nit.required(),
  contrasena: contrasena.required(),
});

// Esquema para actualizar un administrador
const updateAdminSchema = Joi.object({
  _id: id.required(),
  nombreCompleto: nombreCompleto.optional(),
  correo: correo.optional(),
  nit: nit.optional(),
  contraseña: contrasena.optional(),
});

// Esquema para obtener un administrador por ID
const getAdminSchema = Joi.object({
  id: id, // Valida el parámetro ID
});

// Esquema para eliminar un administrador por ID
const deleteAdminSchema = Joi.object({
  id: id.required(),
});

export { createAdminSchema, updateAdminSchema, getAdminSchema, deleteAdminSchema };
