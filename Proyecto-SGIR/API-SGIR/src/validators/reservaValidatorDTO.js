import Joi from 'joi';

// Esquema de validación para la creación de una reserva
export const createReservaSchema = Joi.object({
  
    tipoDocumento: Joi.string().required(),
    id_cliente: Joi.string().required(),
    fechaSalida: Joi.date().required(),
    fechaRegreso: Joi.date().required(),
    destino: Joi.string().required(),
    id_hotel: Joi.string().required(),
    id_paquete: Joi.string().required(),
    id_excursion: Joi.string().optional(),
    numeroContacto: Joi.string().required(),
    cantidadPersonas: Joi.number().integer().min(1).required(),
    transporte: Joi.string().required(),
    precioTotal: Joi.number().min(0).required(),
  });     


// Esquema de validación para la actualización de una reserva
const updateReservaSchema = Joi.object({
  tipoDocumento: Joi.string().valid('Tarjeta de Identidad', 'Cédula de Ciudadanía', 'Cédula de Extranjería', 'Pasaporte').optional(),
  cliente: Joi.string().optional(),                // ID de cliente opcional
  fechaSalida: Joi.date().greater('now').optional().messages({
    'date.greater': 'La fecha de salida debe ser una fecha futura.'
  }),
  fechaRegreso: Joi.date().greater(Joi.ref('fechaSalida')).optional().messages({
    'date.greater': 'La fecha de regreso debe ser posterior a la fecha de salida.'
  }),
  destino: Joi.string().optional(),                // Destino opcional
  hotel: Joi.string().optional(),                  // Hotel opcional
  paquete: Joi.string().optional(),                // Paquete opcional
  excursion: Joi.string().optional(),              // Excursión opcional
  numeroContacto: Joi.string().pattern(/^\d{10}$/).optional().messages({
    'string.pattern.base': 'El número de contacto debe tener 10 dígitos.'
  }),
  cantidadPersonas: Joi.number().min(1).optional(), // Cantidad de personas (mínimo 1)
  transporte: Joi.string().optional(),             // Transporte opcional
  precioTotal: Joi.number().min(0).optional(),     // Precio total (mínimo 0)
});

// Esquema de validación para la eliminación de una reserva
const deleteReservaSchema = Joi.object({
  id: Joi.string().hex().length(24).required()      // ID debe ser un ObjectId válido de MongoDB
});

// Esquema de validación para obtener una reserva por ID
const getReservaByIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required()      // ID debe ser un ObjectId válido de MongoDB
});

// Exportar todos los esquemas para usarlos en el controlador
export { deleteReservaSchema, getReservaByIdSchema, updateReservaSchema };
