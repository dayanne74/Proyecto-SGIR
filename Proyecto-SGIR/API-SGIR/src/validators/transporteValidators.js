import Joi from 'joi';

// Validación para el ID
const id = Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
        "string.pattern.base": "El campo ID debe ser un ObjectId válido de 24 caracteres hexadecimales.",
        "any.required": "El campo ID es requerido.",
    });

// Validación para el nombre del transporte
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

// Validación para la descripción del transporte
const descripcion = Joi.string()
    .min(10)
    .required()
    .messages({
        "string.base": "La descripción debe ser un texto.",
        "string.empty": "La descripción no puede estar vacía.",
        "string.min": "La descripción debe tener al menos 10 caracteres.",
        "any.required": "El campo descripción es requerido.",
    });

// Validación para la capacidad del transporte
const capacidad = Joi.number()
    .integer()
    .min(1) // Debe ser al menos 1 pasajero
    .required()
    .messages({
        "number.base": "La capacidad debe ser un número entero.",
        "number.min": "La capacidad debe ser al menos 1.",
        "any.required": "El campo capacidad es requerido.",
    });

// Validación para la placa del vehículo
const placa = Joi.string()
    .pattern(/^[A-Z0-9-]+$/) // Ejemplo de patrón, ajusta según las reglas locales
    .min(6)
    .max(10)
    .required()
    .messages({
        "string.base": "La placa debe ser un texto.",
        "string.empty": "La placa no puede estar vacía.",
        "string.pattern.base": "La placa debe contener solo letras mayúsculas y números, y puede incluir guiones.",
        "string.min": "La placa debe tener al menos 6 caracteres.",
        "string.max": "La placa no puede exceder los 10 caracteres.",
        "any.required": "El campo placa es requerido.",
    });

// Validación para las comodidades
const comodidades = Joi.array()
    .items(Joi.string().min(3).max(50)) // Cada comodidad debe ser un string entre 3 y 50 caracteres
    .required()
    .messages({
        "array.base": "Las comodidades deben ser un array de textos.",
        "any.required": "El campo comodidades es requerido.",
    });

// Validación para la categoría del transporte
const categoria = Joi.string()
    .required()
    .messages({
        "string.base": "La categoría debe ser un texto.",
        "any.required": "El campo categoría es requerido.",
    });

// Esquema de creación de transporte
const createTransporteSchema = Joi.object({
    nombre: nombre.required(),
    capacidad: capacidad.required(),
    descripcion: descripcion.required(),
    comodidades: comodidades.required(),
    placa: placa.required(),
    categoria: categoria.required(),
});

// Esquema para obtener transporte por ID
const getTransporteSchema = Joi.object({
    id: id.required(),
});

// Esquema para eliminar transporte por ID
const deleteTransporteSchema = Joi.object({
    id: id.required(),
});

// Exportar los esquemas
export { createTransporteSchema, getTransporteSchema, deleteTransporteSchema };
