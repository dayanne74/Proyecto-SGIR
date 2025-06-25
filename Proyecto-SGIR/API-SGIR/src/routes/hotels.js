import { Router } from 'express';
import upload from '../middleware/upload.js';
import { validationResult } from 'express-validator';
import { verifyToken, verifyRole } from '../middleware/authMiddleware.js';
import {
  crearHotel,
  obtenerHoteles,
  obtenerHotelPorId,
  actualizarHotel,
  eliminarHotel
} from '../controllers/hotelcontrollers.js';
import { hotelCreateRules } from '../validators/hotelvalidatorDTO.js';

const router = Router();

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

router.get('/', verifyToken, verifyRole(['administrador', 'cliente']), obtenerHoteles);
router.get('/:id', verifyToken, verifyRole(['administrador', 'cliente']), obtenerHotelPorId);
router.post('/', verifyToken, verifyRole(['administrador']), upload.single('imagen'), hotelCreateRules, handleValidation, crearHotel);
router.put('/:id', verifyToken, verifyRole(['administrador']), upload.single('imagen'), hotelCreateRules, handleValidation, actualizarHotel);
router.delete('/:id', verifyToken, verifyRole(['administrador']), eliminarHotel);

export default router;
