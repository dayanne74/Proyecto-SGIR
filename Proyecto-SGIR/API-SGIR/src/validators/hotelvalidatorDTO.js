import { body } from 'express-validator';

export const hotelCreateRules = [
  body('nombre')
    .notEmpty().withMessage('Nombre obligatorio')
    .isLength({ min: 3, max: 90 }).withMessage('Nombre debe tener entre 3 y 90 caracteres')
    .matches(/^[\w\sáéíóúÁÉÍÓÚñÑ.,-]+$/i).withMessage('El nombre solo puede contener letras, números y espacios'),


  body('ubicacion')
    .notEmpty().withMessage('Ubicación obligatoria')
    .isLength({ min: 3, max: 90 }).withMessage('Ubicación debe tener entre 3 y 90 caracteres'),

  // Número de habitaciones: espera solo dígitos
body('numeroHabitaciones')
  .notEmpty().withMessage('El número de habitaciones es requerido')
  .matches(/^\d+$/).withMessage('Debe ser un número entre 1 y 1000')
  .custom(n => {
    const num = parseInt(n, 10);
    if (num < 1 || num > 1000) {
      throw new Error('El número de habitaciones debe ser entre 1 y 1000.');
    }
    return true;
  }),

// Número de personas: idem, solo dígitos
body('numeroPersonas')
  .notEmpty().withMessage('Número de personas obligatorio')
  .matches(/^\d+$/).withMessage('Debe ser un número entre 1 y 1000')
  .custom(n => {
    const num = parseInt(n, 10);
    if (num < 1 || num > 1000) {
      throw new Error('El número de personas debe ser entre 1 y 1000.');
    }
    return true;
  }),


  body('comida')
    .notEmpty().withMessage('Comida obligatoria')
    .isIn(['incluida', 'no incluida']).withMessage("La comida debe ser 'incluida' o 'no incluida'"),

  body('precio')
    .notEmpty().withMessage('Precio obligatorio')
    .isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),

  body('categoria')
    .notEmpty().withMessage('Categoría obligatoria')
    .isIn(['baja', 'media']).withMessage("La categoría debe ser 'baja' o 'media'"),
];
