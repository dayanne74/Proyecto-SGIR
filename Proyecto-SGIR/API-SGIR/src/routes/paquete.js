import { Router } from 'express';
import {
  obtenerPaquetes,
  obtenerPaquetePorId,
  crearPaquete,
  actualizarPaquete,
  eliminarPaquete,
  buscarPaquetePorDestino,
  filtrarPaquetePorEstado
} from '../controllers/paquetecontrolador.js';

import upload from '../middleware/upload.js';
import { createRules } from '../validators/paquetevalidatorDTO.js';
import { validationResult } from 'express-validator';
import { verifyToken, verifyRole } from '../middleware/authMiddleware.js';

const router = Router();

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

router.get('/', verifyToken, verifyRole(['administrador', 'cliente']), obtenerPaquetes);

router.post(
  '/',
  verifyToken,
  verifyRole(['administrador']),
  upload.single('imagen'),
  createRules,
  handleValidation,
  crearPaquete
);

router.put(
  '/:id',
  verifyToken,
  verifyRole(['administrador']),
  upload.single('imagen'),
  createRules,
  handleValidation,
  actualizarPaquete
);

router.get('/buscar', verifyToken, verifyRole(['administrador', 'cliente']), buscarPaquetePorDestino);
router.get('/estado', verifyToken, verifyRole(['administrador', 'cliente']), filtrarPaquetePorEstado);
router.get('/:id', verifyToken, verifyRole(['administrador', 'cliente']), obtenerPaquetePorId);

router.delete('/:id', verifyToken, verifyRole(['administrador']), eliminarPaquete);

export default router;
