import { body } from 'express-validator';

export const createRules = [
  body('nombre').notEmpty().withMessage('Nombre obligatorio'),
  body('descripcion').notEmpty().withMessage('Descripción obligatoria'),
  body('destino').notEmpty().withMessage('Destino obligatorio'),
  body('actividad').notEmpty().withMessage('Actividad obligatoria'),
  body('numeroPersonas').notEmpty().withMessage('Número de personas obligatorio'),
  body('duracion').notEmpty().withMessage('Duración obligatoria'),
  body('precio').isFloat({ min: 0 }).withMessage('Precio debe ser mayor o igual a 0'),
  body('transporte').notEmpty().withMessage('Transporte obligatorio'),
  body('comida').notEmpty().withMessage('Comida obligatoria')
];
