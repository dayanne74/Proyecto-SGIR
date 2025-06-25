import express from 'express';
import { activarUsuario } from '../controllers/usuario.controller.js';

const router = express.Router();

router.put('/activar/:id', activarUsuario);
export default router;
