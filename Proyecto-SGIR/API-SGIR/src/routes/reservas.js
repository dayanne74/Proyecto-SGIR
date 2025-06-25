import { body, param, validationResult } from 'express-validator';
import { manejarErroresValidacion } from '../middleware/validaciones.js';
import { emailService } from '../services/emailService.js';
import express from 'express';
import {
  crearReserva,
  obtenerReservas,
  obtenerReservaPorId,
  obtenerReservaPorCodigo,
  actualizarEstadoReserva,
  cancelarReserva,
  obtenerReservasUsuario
} from '../controllers/reservacontrollers.js';
import { 
  verificarToken, 
  verificarAdmin, 
  verificarTokenOpcional,
  limitarIntentos,
  verificarPropietarioOAdmin,
} from '../middleware/AuthMiddleware1.js';
import {
  validarReserva,
  validarActualizacionEstado,
  validarCancelacion,
  validarParametrosConsulta,
  validarCodigoConfirmacion,
  sanitizarDatos,
  limitarCreacionReservas
} from '../middleware/validaciones.js';
import Reserva from '../models/reserva.js';

const router = express.Router();
router.get(
  '/mis-reservas/:id',
  verificarToken,
  async (req, res, next) => {
    try {
      const reserva = await Reserva.findById(req.params.id);
      if (!reserva) return res.status(404).json({ success: false, message: 'Reserva no encontrada' });

      console.log('>>> middleware /mis-reservas/:id');
      console.log('  req.user.id       =', req.user.id);
      console.log('  reserva.usuarioId =', reserva.usuarioId?.toString());

      if (!reserva.usuarioId || reserva.usuarioId.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Acceso denegado. Solo puedes acceder a tus propios recursos'
        });
      }

      req.params.id = reserva._id.toString();
      next();
    } catch (err) {
      next(err);
    }
  },
  obtenerReservaPorId
);
router.get(
  '/mis-reservas/consulta/:codigo',
  verificarToken,
  verificarPropietarioOAdmin('usuarioId'),  // aquí la middleware chequea user.id contra reserva.usuarioId
  async (req, res, next) => {
    // Encontrar reserva por código
    const reserva = await Reserva.findOne({ codigoConfirmacion: req.params.codigo });
    if (!reserva) return res.status(404).json({ success: false, message: 'Reserva no encontrada' });
    req.params.id = reserva._id.toString();
    next();
  },
  obtenerReservaPorId
);
// Función para generar código de confirmación único
const generarCodigoConfirmacion = async () => {
  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numeros = '0123456789';
  
  let codigoConfirmacion;
  let codigoExiste = true;
  
  while (codigoExiste) {
    let codigo = '';
    
    // 3 letras + 4 números
    for (let i = 0; i < 3; i++) {
      codigo += letras.charAt(Math.floor(Math.random() * letras.length));
    }
    for (let i = 0; i < 4; i++) {
      codigo += numeros.charAt(Math.floor(Math.random() * numeros.length));
    }
    
    // Verificar que el código no existe
    const reservaExistente = await Reserva.findOne({ codigoConfirmacion: codigo });
    if (!reservaExistente) {
      codigoConfirmacion = codigo;
      codigoExiste = false;
    }
  }
  
  return codigoConfirmacion;
};

// ========== RUTAS PÚBLICAS (sin autenticación) ==========

// Consultar reserva por código de confirmación
router.get('/consulta/:codigo', 
  limitarIntentos(10, 5 * 60 * 1000), // 10 intentos por 5 minutos
  validarCodigoConfirmacion,
  obtenerReservaPorCodigo
);

// Ruta alternativa para consulta por código (mantener compatibilidad)
router.get('/codigo/:codigo', 
  limitarIntentos(10, 5 * 60 * 1000),
  validarCodigoConfirmacion,
  obtenerReservaPorCodigo
);

// ========== RUTAS CON AUTENTICACIÓN OPCIONAL ==========

// Crear nueva reserva (permite usuarios no autenticados pero requiere auth para algunas funciones)
router.post('/', 
  verificarTokenOpcional, // Permite crear sin estar logueado
  limitarCreacionReservas,
  sanitizarDatos,
  validarReserva,
  async (req, res, next) => {
    // Generar código de confirmación único antes de crear la reserva
    try {
      req.body.codigoConfirmacion = await generarCodigoConfirmacion();
      next();
    } catch (error) {
      console.error('Error generando código de confirmación:', error);
      return res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  },
  crearReserva
);

// ========== RUTAS QUE REQUIEREN AUTENTICACIÓN ==========

// Obtener reservas del usuario autenticado
router.get('/mis-reservas', 
  verificarToken,
  validarParametrosConsulta,
  obtenerReservasUsuario
);

// Cancelar reserva propia por código (usuario autenticado)
router.put('/mis-reservas/cancelar/:codigo',
  verificarToken,
  validarCodigoConfirmacion,
  validarCancelacion,
  async (req, res, next) => {
    // Middleware personalizado para verificar que la reserva pertenece al usuario
    try {
      const { codigo } = req.params;
      const reserva = await Reserva.findOne({ codigoConfirmacion: codigo });
      
      if (!reserva) {
        return res.status(404).json({
          success: false,
          message: 'Reserva no encontrada'
        });
      }

      // Verificar que la reserva no esté ya cancelada
      if (reserva.estado === 'cancelada') {
        return res.status(400).json({
          success: false,
          message: 'Esta reserva ya está cancelada'
        });
      }

      // Verificar que la reserva pertenece al usuario autenticado
      if (req.user && reserva.usuarioId && reserva.usuarioId.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'No tienes permisos para cancelar esta reserva'
        });
      }

      // Si la reserva no tiene usuarioId, verificar por email
      if (!reserva.usuarioId && reserva.email !== req.user.email) {
        return res.status(403).json({
          success: false,
          message: 'No tienes permisos para cancelar esta reserva'
        });
      }

      req.reserva = reserva; // Pasar la reserva al siguiente middleware
      next();
    } catch (error) {
      next(error);
    }
  },
  cancelarReserva
);

// Cancelar reserva por ID (usuario autenticado)
router.put('/:id/cancelar',
  verificarToken,
  [
    param('id').isMongoId().withMessage('ID de reserva inválido'),
    manejarErroresValidacion
  ],
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const reserva = await Reserva.findById(id);
      
      if (!reserva) {
        return res.status(404).json({
          success: false,
          message: 'Reserva no encontrada'
        });
      }

      // Verificar que la reserva pertenece al usuario autenticado
      if (reserva.usuarioId.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'No tienes permisos para cancelar esta reserva'
        });
      }

      // Verificar que la reserva no esté ya cancelada
      if (reserva.estado === 'cancelada') {
        return res.status(400).json({
          success: false,
          message: 'Esta reserva ya está cancelada'
        });
      }

      req.reserva = reserva;
      next();
    } catch (error) {
      next(error);
    }
  },
  cancelarReserva
);

// ========== RUTAS DE ADMINISTRADOR ==========

// Obtener todas las reservas (solo admin)
router.get('/', 
  verificarToken,
  verificarAdmin,
  validarParametrosConsulta,
  obtenerReservas
);

// Obtener estadísticas de reservas (solo admin)
router.get('/estadisticas', 
  verificarToken,
  verificarAdmin,
  
);

// Obtener reserva específica por ID (solo admin)
router.get('/:id', 
  verificarToken,
  verificarAdmin,
  [
    param('id').isMongoId().withMessage('ID de reserva inválido'),
    manejarErroresValidacion
  ],
  obtenerReservaPorId
);

// Actualizar estado de reserva (solo admin)
router.put('/:id/estado', 
  verificarToken,
  verificarAdmin,
  validarActualizacionEstado,
  actualizarEstadoReserva
);

// Cancelar cualquier reserva (solo admin)
router.put('/admin/:id/cancelar', 
  verificarToken,
  verificarAdmin,
  [
    param('id').isMongoId().withMessage('ID de reserva inválido'),
    body('motivo').optional().isLength({ max: 200 }).withMessage('El motivo no puede exceder 200 caracteres'),
    manejarErroresValidacion
  ],
  cancelarReserva
);

// ========== RUTAS ADICIONALES RECOMENDADAS ==========

// Reenviar confirmación por email
router.post('/reenviar-confirmacion/:codigo',
  limitarIntentos(3, 10 * 60 * 1000), // 3 intentos por 10 minutos
  validarCodigoConfirmacion,
  async (req, res) => {
    try {
      const { codigo } = req.params;
      const reserva = await Reserva.findOne({ codigoConfirmacion: codigo });
      
      if (!reserva) {
        return res.status(404).json({
          success: false,
          message: 'Reserva no encontrada'
        });
      }

      // Preparar datos para el correo
      const datosCorreo = {
        nombre: reserva.nombre,
        apellido: reserva.apellido,
        email: reserva.email,
        codigoConfirmacion: reserva.codigoConfirmacion,
        servicio: reserva.servicio,
        fechaReserva: reserva.fechaReserva,
        numeroPersonas: reserva.numeroPersonas,
        precioTotal: reserva.precioTotal,
        tipoServicio: reserva.tipoServicio,
        metodoPago: reserva.metodoPago
      };

      // Enviar correo de confirmación
      await emailService.enviarConfirmacionReserva(datosCorreo);

      res.json({
        success: true,
        message: 'Email de confirmación reenviado exitosamente'
      });
    } catch (error) {
      console.error('Error al reenviar confirmación:', error);
      res.status(500).json({
        success: false,
        message: 'Error al reenviar confirmación'
      });
    }
  }
);

// Modificar reserva (antes de 24 horas)
router.put('/modificar/:codigo',
  verificarToken,
  validarCodigoConfirmacion,
  [
    body('fechaReserva').optional().isISO8601().withMessage('Formato de fecha inválido'),
    body('numeroPersonas').optional().isInt({ min: 1, max: 20 }).withMessage('Número de personas inválido'),
    body('solicitudesEspeciales').optional().isLength({ max: 500 }).withMessage('Solicitudes muy largas'),
    manejarErroresValidacion
  ],
  async (req, res) => {
    try {
      const { codigo } = req.params;
      const reserva = await Reserva.findOne({ codigoConfirmacion: codigo });
      
      if (!reserva) {
        return res.status(404).json({
          success: false,
          message: 'Reserva no encontrada'
        });
      }

      // Verificar permisos
      if (req.user && reserva.usuarioId && reserva.usuarioId.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'No tienes permisos para modificar esta reserva'
        });
      }

      // Verificar que se puede modificar (24 horas antes)
      const ahora = new Date();
      const limite = new Date(reserva.fechaReserva);
      limite.setHours(limite.getHours() - 24);

      if (ahora > limite) {
        return res.status(400).json({
          success: false,
          message: 'No se puede modificar la reserva con menos de 24 horas de anticipación'
        });
      }

      // Actualizar solo los campos permitidos
      const camposPermitidos = ['fechaReserva', 'numeroPersonas', 'solicitudesEspeciales'];
      const actualizaciones = {};
      
      camposPermitidos.forEach(campo => {
        if (req.body[campo] !== undefined) {
          actualizaciones[campo] = req.body[campo];
        }
      });

      // Recalcular precio si cambió el número de personas
      if (actualizaciones.numeroPersonas && reserva.tipoServicio !== 'hotel') {
        actualizaciones.precioTotal = reserva.precioUnitario * actualizaciones.numeroPersonas;
      }

      const reservaActualizada = await Reserva.findByIdAndUpdate(
        reserva._id,
        { ...actualizaciones, fechaActualizacion: new Date() },
        { new: true }
      );

      res.json({
        success: true,
        message: 'Reserva modificada exitosamente',
        data: reservaActualizada
      });

    } catch (error) {
      console.error('Error al modificar reserva:', error);
      res.status(500).json({
        success: false,
        message: 'Error al modificar la reserva'
      });
    }
  }
);

// Middleware de manejo de errores específico para reservas
router.use((error, req, res, next) => {
  console.error('Error en rutas de reservas:', error);
  
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Datos de reserva inválidos',
      errores: Object.values(error.errors).map(err => err.message)
    });
  }

  if (error.code === 11000) {
    return res.status(400).json({
      success: false,
      message: 'Ya existe una reserva con estos datos'
    });
  }

  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
});

export default router;