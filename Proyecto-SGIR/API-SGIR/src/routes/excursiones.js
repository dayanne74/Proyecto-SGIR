// routes/excursiones.js
import { Router } from 'express';
import { createRules } from '../validators/excursionesValidators.js';
import { getAll, getById, create, update, remove } from '../controllers/excursionesControllers.js';
import upload from '../middleware/upload.js';
import { validationResult } from 'express-validator';
import { verifyToken, verifyRole } from '../middleware/authMiddleware.js';

const router = Router();

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

// ✅ Rutas públicas
router.get('/', getAll);
router.get('/:id', getById);

// ✅ Rutas protegidas
router.post(
  '/',
  verifyToken,
  verifyRole(['administrador', 'cliente']),
  upload.single('imagen'),
  createRules,
  handleValidation,
  create
);

router.put(
  '/:id',
  verifyToken,
  verifyRole(['administrador']),
  upload.single('imagen'),
  createRules,
  handleValidation,
  update
);

router.delete(
  '/:id',
  verifyToken,
  verifyRole(['administrador', 'cliente']),
  remove
);

export default router;
