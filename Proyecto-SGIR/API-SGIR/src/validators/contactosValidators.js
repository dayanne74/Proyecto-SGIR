import Joi from "joi";

const id = Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
        "string.pattern.base": "El campo ID debe ser un ObjectId válido de 24 caracteres hexadecimales.",
        "any.required": "El campo ID es requerido.",
    });

const nombreApellido = Joi.string()
    .min(3)
    .max(90)
    .required()
    .pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/)
    .messages({
        "string.base": "El nombre y apellido deben ser un texto.",
        "string.empty": "El nombre y apellido no pueden estar vacíos.",
        "string.min": "El nombre y apellido deben tener al menos 3 caracteres.",
        "string.max": "El nombre y apellido no pueden exceder los 90 caracteres.",
        "string.pattern.base": "El nombre y apellido solo pueden contener letras y espacios.",
        "any.required": "El campo nombre y apellido es requerido.",
    });

const correo = Joi.string()
    .email()
    .required()
    .messages({
        "string.base": "El correo debe ser un texto.",
        "string.email": "El correo debe ser un formato válido.",
        "any.required": "El campo correo es requerido.",
    });

const asunto = Joi.string()
    .min(5)
    .max(100)
    .required()
    .messages({
        "string.base": "El asunto debe ser un texto.",
        "string.empty": "El asunto no puede estar vacío.",
        "string.min": "El asunto debe tener al menos 5 caracteres.",
        "string.max": "El asunto no puede exceder los 100 caracteres.",
        "any.required": "El campo asunto es requerido.",
    });

const mensaje = Joi.string()
    .min(10)
    .required()
    .messages({
        "string.base": "El mensaje debe ser un texto.",
        "string.empty": "El mensaje no puede estar vacío.",
        "string.min": "El mensaje debe tener al menos 10 caracteres.",
        "any.required": "El campo mensaje es requerido.",
    });

const fecha = Joi.date() // Cambiado a 'fechaActual'
    .required()
    .messages({
        "date.base": "La fecha debe ser una fecha válida.",
        "any.required": "El campo fecha actual es requerido.", // Cambiado para mayor claridad
    });

const createContactoSchema = Joi.object({
    nombre_apellido: nombreApellido.required(),
    correo: correo.required(),
    asunto: asunto.required(),
    mensaje: mensaje.required(),
    fechaActual: fecha.required(),
});

const getContactoSchema = Joi.object({
    id: id.required(), 
});

const deleteContactoSchema = Joi.object({
    id: id.required(), 
});

export { createContactoSchema, getContactoSchema, deleteContactoSchema };