import Joi from 'joi';

// Validación de ID (ObjectId)
const id = Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
        "string.pattern.base": "El campo ID debe ser un ObjectId válido de 24 caracteres hexadecimales.",
        "any.required": "El campo ID es requerido.",
    });

// Validación de número de documento (solo números)
const numeroDocumento = Joi.string()
    .pattern(/^[0-9]+$/) // Solo números
    .required()
    .messages({
        "string.pattern.base": "El número de documento solo debe contener números.",
        "string.base": "El número de documento debe ser un texto.",
        "string.empty": "El número de documento no puede estar vacío.",
        "any.required": "El campo número de documento es requerido.",
    });

// Validación de nombre
const nombre = Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
        "string.base": "El nombre debe ser un texto.",
        "string.empty": "El nombre no puede estar vacío.",
        "string.min": "El nombre debe tener al menos 3 caracteres.",
        "string.max": "El nombre no puede exceder los 100 caracteres.",
        "any.required": "El campo nombre es requerido.",
    });

// Validación de apellido
const apellido = Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
        "string.base": "El apellido debe ser un texto.",
        "string.empty": "El apellido no puede estar vacío.",
        "string.min": "El apellido debe tener al menos 3 caracteres.",
        "string.max": "El apellido no puede exceder los 100 caracteres.",
        "any.required": "El campo apellido es requerido.",
    });

// Validación de correo electrónico (debe ser válido)
const correo = Joi.string()
    .email({ tlds: { allow: true } }) // Verifica dominios válidos
    .required()
    .messages({
        "string.email": "El correo debe ser un email válido con un dominio correcto.",
        "string.empty": "El correo no puede estar vacío.",
        "any.required": "El campo correo es requerido.",
    });

// Validación de contraseña (mínimo 6 caracteres, incluye números y letras)
const contrasena = Joi.string()
    .min(6)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/) // Al menos una letra y un número
    .required()
    .messages({
        "string.base": "La contraseña debe ser un texto.",
        "string.empty": "La contraseña no puede estar vacía.",
        "string.min": "La contraseña debe tener al menos 6 caracteres.",
        "string.pattern.base": 
            "La contraseña debe incluir al menos una letra y un número, y tener mínimo 6 caracteres.",
        "any.required": 
            "El campo contraseña es requerido.",
    });

// Esquema para crear cliente
const createClienteSchema = Joi.object({
    numeroDocumento: numeroDocumento,
    nombre: nombre,
    apellido: apellido,
    correo: correo,
    contrasena: contrasena,
});

// Esquema para actualizar cliente
const updateClienteSchema = Joi.object({
    numeroDocumento: numeroDocumento.optional(),
    nombre: nombre.optional(),
    apellido: apellido.optional(),
    correo: correo.optional(),
    contrasena: contrasena.optional(),
});

// Esquema para obtener cliente por ID
const getClienteSchema = Joi.object({
    id: id,
});

// Esquema para eliminar cliente por ID
const deleteClienteSchema = Joi.object({
    id: id,
});

export { createClienteSchema, updateClienteSchema, getClienteSchema, deleteClienteSchema };
