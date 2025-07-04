import Joi from 'joi';

const correo = Joi.string()
  .email()
  .required()
  .messages({
    "string.email": "El campo debe ser un correo electrónico válido.",
    "any.required": "El correo es un campo requerido."
  });

const contrasena = Joi.string()
  .min(6)
  .required()
  .messages({
    "string.base": "La contraseña debe ser un texto.",
    "string.empty": "La contraseña no puede estar vacía.",
    "string.min": "La contraseña debe tener al menos 6 caracteres.",
    "any.required": "La contraseña es un campo requerido."
  });

export const loginSchema = Joi.object({
  correo: correo,
  contrasena: contrasena
});
