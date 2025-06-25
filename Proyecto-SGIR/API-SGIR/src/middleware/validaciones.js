import { body, param, query, validationResult } from 'express-validator';
import validator from 'validator';

// Middleware para manejar errores de validación
export const manejarErroresValidacion = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Errores de validación',
      errores: errores.array()
    });
  }
  next();
};

// Sanitizar datos de entrada
export const sanitizarDatos = (req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = validator.escape(req.body[key].trim());
      }
    });
  }
  next();
};

// Validaciones para crear reserva
export const validarReserva = [
  // Datos personales
  body('nombre')
    .notEmpty()
    .withMessage('El nombre es requerido')
    .isLength({ min: 2, max: 50 })
    .withMessage('El nombre debe tener entre 2 y 50 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage('El nombre solo puede contener letras y espacios'),

  body('apellido')
    .notEmpty()
    .withMessage('El apellido es requerido')
    .isLength({ min: 2, max: 50 })
    .withMessage('El apellido debe tener entre 2 y 50 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage('El apellido solo puede contener letras y espacios'),

  body('email')
    .isEmail()
    .withMessage('Debe ser un email válido')
    .normalizeEmail(),

  body('telefono')
    .notEmpty()
    .withMessage('El teléfono es requerido')
    .matches(/^[+]?[\d\s\-\(\)]+$/)
    .withMessage('Formato de teléfono inválido')
    .isLength({ min: 7, max: 20 })
    .withMessage('El teléfono debe tener entre 7 y 20 caracteres'),

  body('documento')
    .notEmpty()
    .withMessage('El documento es requerido')
    .isLength({ min: 5, max: 20 })
    .withMessage('El documento debe tener entre 5 y 20 caracteres')
    .matches(/^[a-zA-Z0-9\-]+$/)
    .withMessage('El documento contiene caracteres inválidos'),

  // Datos de la reserva
  body('fechaReserva')
    .notEmpty()
    .withMessage('La fecha de reserva es requerida')
    .isISO8601()
    .withMessage('Formato de fecha inválido')
    .custom((value) => {
      const fecha = new Date(value);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      if (fecha < hoy) {
        throw new Error('La fecha de reserva no puede ser anterior a hoy');
      }
      return true;
    }),

  body('numeroPersonas')
    .optional()
    .isInt({ min: 1, max: 20 })
    .withMessage('El número de personas debe ser entre 1 y 20'),

  body('solicitudesEspeciales')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Las solicitudes especiales no pueden exceder 500 caracteres'),

  // Datos del servicio
  body('servicioId')
    .notEmpty()
    .withMessage('El ID del servicio es requerido')
    .isMongoId()
    .withMessage('ID de servicio inválido'),

  body('tipoServicio')
    .notEmpty()
    .withMessage('El tipo de servicio es requerido')
    .isIn(['excursion', 'hotel', 'paquete'])
    .withMessage('Tipo de servicio inválido'),

  // Datos de pago
  body('metodoPago')
    .notEmpty()
    .withMessage('El método de pago es requerido')
    .isIn(['efectivo', 'tarjeta', 'transferencia'])
    .withMessage('Método de pago inválido'),

  // Validaciones condicionales para tarjeta
  body('numeroTarjeta')
    .if(body('metodoPago').equals('tarjeta'))
    .notEmpty()
    .withMessage('El número de tarjeta es requerido')
    .matches(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/)
    .withMessage('Formato de tarjeta inválido'),

  body('fechaVencimiento')
    .if(body('metodoPago').equals('tarjeta'))
    .notEmpty()
    .withMessage('La fecha de vencimiento es requerida')
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/)
    .withMessage('Formato de fecha de vencimiento inválido (MM/AA)'),

  body('cvv')
    .if(body('metodoPago').equals('tarjeta'))
    .notEmpty()
    .withMessage('El CVV es requerido')
    .matches(/^\d{3,4}$/)
    .withMessage('El CVV debe tener 3 o 4 dígitos'),

  body('nombreTitular')
    .if(body('metodoPago').equals('tarjeta'))
    .notEmpty()
    .withMessage('El nombre del titular es requerido')
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre del titular debe tener entre 2 y 100 caracteres'),

  manejarErroresValidacion
];

// Validación para actualizar estado
export const validarActualizacionEstado = [
  param('id')
    .isMongoId()
    .withMessage('ID de reserva inválido'),

  body('estado')
    .notEmpty()
    .withMessage('El estado es requerido')
    .isIn(['pendiente', 'confirmada', 'cancelada', 'completada'])
    .withMessage('Estado inválido'),

  manejarErroresValidacion
];

// Validación para cancelar reserva
export const validarCancelacion = [
  param('id').optional().isMongoId().withMessage('ID de reserva inválido'),
  param('codigo').optional().isLength({ min: 10, max: 20 }).withMessage('Código de confirmación inválido'),
  
  body('motivo')
    .optional()
    .isLength({ max: 200 })
    .withMessage('El motivo no puede exceder 200 caracteres'),

  manejarErroresValidacion
];

// Validación para parámetros de consulta
export const validarParametrosConsulta = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('La página debe ser un número mayor a 0'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('El límite debe ser entre 1 y 100'),

  query('estado')
    .optional()
    .isIn(['pendiente', 'confirmada', 'cancelada', 'completada'])
    .withMessage('Estado inválido'),

  query('tipoServicio')
    .optional()
    .isIn(['excursion', 'hotel', 'paquete'])
    .withMessage('Tipo de servicio inválido'),

  query('fechaInicio')
    .optional()
    .isISO8601()
    .withMessage('Formato de fecha de inicio inválido'),

  query('fechaFin')
    .optional()
    .isISO8601()
    .withMessage('Formato de fecha de fin inválido'),

  manejarErroresValidacion
];

// Validación para código de confirmación
export const validarCodigoConfirmacion = [
  param('codigo')
    .notEmpty().withMessage('El código de confirmación es requerido')
    .isLength({ min: 7, max: 7 }).withMessage('Código de confirmación debe tener 7 caracteres')
    .matches(/^[A-Z]{3}\d{4}$/).withMessage('El código debe tener 3 letras mayúsculas y 4 dígitos, por ejemplo “ABC1234”'),
  manejarErroresValidacion
];
// Middleware de rate limiting para creación de reservas
export const limitarCreacionReservas = (req, res, next) => {
  // Implementar lógica de rate limiting específica para reservas
  // Por ejemplo, máximo 3 reservas por hora por IP
  next();
};
