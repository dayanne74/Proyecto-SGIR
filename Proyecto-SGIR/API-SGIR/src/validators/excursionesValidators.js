import { body } from 'express-validator';

export const createRules = [
  body('nombre').notEmpty().withMessage('Nombre obligatorio'),
  body('descripcion').notEmpty().withMessage('Descripción obligatoria'),
  body('destino').notEmpty().withMessage('Destino obligatorio'),
  body('precio').isFloat({ min: 0 }).withMessage('Precio debe ser >= 0'),
  body('duracion').notEmpty().withMessage('Duración obligatoria'),
  body('transporte').notEmpty().withMessage('Transporte obligatorio'),
  body('comida').notEmpty().withMessage('Comida obligatoria'),
  body('actividad').notEmpty().withMessage('Actividad obligatoria'),
];
