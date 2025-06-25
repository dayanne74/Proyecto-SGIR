import Reserva from '../models/reserva.js';
import Excursion from '../models/excursion.js';
import Hotel from '../models/hotel.js';
import Paquete from '../models/paquete.js';
import { emailService } from '../services/emailService.js';

// Mapeo de modelos según el tipo de servicio
const getModelByType = tipo => {
  switch(tipo) {
    case 'excursion': return Excursion;
    case 'hotel': return Hotel;
    case 'paquete': return Paquete;
    default: throw new Error('Tipo de servicio no válido');
  }
};
export const obtenerReservasUsuario = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      page = 1,
      limit = 10,
      estado,
      tipoServicio,
      fechaInicio,
      fechaFin,
      buscar
    } = req.query;

    // Construir filtros
    const filtros = { usuarioId: userId };
    
    if (estado) filtros.estado = estado;
    if (tipoServicio) filtros.tipoServicio = tipoServicio;
    
    if (fechaInicio || fechaFin) {
      filtros.fechaReserva = {};
      if (fechaInicio) filtros.fechaReserva.$gte = new Date(fechaInicio);
      if (fechaFin) filtros.fechaReserva.$lte = new Date(fechaFin);
    }
    
    if (buscar) {
      filtros.$or = [
        { nombre: { $regex: buscar, $options: 'i' } },
        { apellido: { $regex: buscar, $options: 'i' } },
        { email: { $regex: buscar, $options: 'i' } },
        { codigoConfirmacion: { $regex: buscar, $options: 'i' } }
      ];
    }

    const reservas = await Reserva.find(filtros)
      .populate('servicioInfo')
      .sort({ fechaCreacion: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Reserva.countDocuments(filtros);

    res.json({
      success: true,
      data: {
        reservas,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        total
      }
    });

  } catch (error) {
    console.error('Error al obtener reservas del usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
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

// Crear nueva reserva
export const crearReserva = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      email,
      telefono,
      documento,
      fechaReserva,
      numeroPersonas,
      solicitudesEspeciales = '',
      servicioId,
      tipoServicio,
      metodoPago,
      numeroTarjeta = '',
      fechaVencimiento = '',
      cvv = '',
      nombreTitular = '',
      precioTotal: bodyPrecioTotal,
      servicio: bodyServicio,
      codigoConfirmacion: bodyCodigoConfirmacion
    } = req.body;

    // Validaciones básicas
    if (!nombre || !apellido || !email || !telefono || !documento || !fechaReserva) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos obligatorios deben ser completados'
      });
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'El formato del email no es válido'
      });
    }

    // Validar que el servicio existe
    const ModeloServicio = getModelByType(tipoServicio);
    const servicioExistente = await ModeloServicio.findById(servicioId);
    if (!servicioExistente) {
      return res.status(404).json({ success: false, message: 'El servicio seleccionado no existe' });
    }

    // Validar que el servicio esté activo (o estadoUsuario según modelo)
    const activoField = servicioExistente.activo ?? servicioExistente.estadoUsuario;
    if (activoField === false) {
      return res.status(400).json({ success: false, message: 'El servicio seleccionado no está disponible' });
    }

    // Validar fecha de reserva
    const fechaReservaDate = new Date(fechaReserva);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    if (fechaReservaDate < hoy) {
      return res.status(400).json({
        success: false,
        message: 'La fecha de reserva no puede ser en el pasado'
      });
    }

    // Calcular precio unitario y total si no vienen en body
    const precioUnitario = servicioExistente.precio;
    const precioTotal = 
      bodyPrecioTotal
      ?? (tipoServicio === 'hotel'
          ? precioUnitario
          : precioUnitario * numeroPersonas);

    // Construir el objeto servicio a guardar (prefiero usar datos del servicio real)
    const servicio = {
      nombre: servicioExistente.nombre,
      tipo: tipoServicio,
      precio: precioUnitario
    };

    // Usar código de confirmación del body o generar uno nuevo
    const codigoConfirmacion = bodyCodigoConfirmacion || await generarCodigoConfirmacion();

    // Crear instancia de Reserva
    const nuevaReserva = new Reserva({
      // Datos personales
      nombre,
      apellido,
      email,
      telefono,
      documento,
      
      // Datos de la reserva
      fechaReserva: fechaReservaDate,
      numeroPersonas: tipoServicio === 'hotel' ? 1 : numeroPersonas,
      solicitudesEspeciales,
      
      // Datos del servicio
      servicioId,
      tipoServicio,
      servicio,
      precioUnitario,
      precioTotal,
      
      // Datos de pago
      metodoPago,
      ...(metodoPago === 'tarjeta' && {
        numeroTarjeta: numeroTarjeta.slice(-4), // Solo guardamos los últimos 4 dígitos por seguridad
        fechaVencimiento,
        nombreTitular
      }),
      
      // Sistema
      codigoConfirmacion,
      fechaCreacion: new Date(),
      estado: 'confirmada', // Estado inicial confirmada como en el archivo de referencia
      usuarioId: req.user ? req.user.id : null
    });

    // Guardar en BD
    const reservaGuardada = await nuevaReserva.save();
    
    // Poblar para la respuesta
    await reservaGuardada.populate('servicioInfo');

    // Preparar datos para el correo
    const datosCorreo = {
      nombre,
      apellido,
      email,
      codigoConfirmacion,
      servicio,
      fechaReserva,
      numeroPersonas: tipoServicio !== 'hotel' ? numeroPersonas : 1,
      precioTotal,
      tipoServicio,
      metodoPago
    };

    // Enviar correo de confirmación
    try {
      const resultadoCorreo = await emailService.enviarConfirmacionReserva(datosCorreo);
      console.log('Correo enviado exitosamente:', resultadoCorreo.messageId);
    } catch (emailError) {
      console.error('Error enviando correo, pero reserva creada:', emailError);
      // La reserva ya está creada, solo logueamos el error del correo
      // Podrías implementar un sistema de reintento aquí
    }

    // Responder con mensaje y datos
    res.status(201).json({
      success: true,
      message: 'Reserva creada exitosamente',
      data: {
        reserva: {
          _id: reservaGuardada._id,
          codigoConfirmacion,
          nombre,
          apellido,
          email,
          servicio,
          fechaReserva,
          precioTotal,
          estado: reservaGuardada.estado
        },
        codigoConfirmacion
      }
    });
  } catch (error) {
    console.error('Error al crear reserva:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno al crear reserva',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Obtener todas las reservas (admin)
export const obtenerReservas = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      estado,
      tipoServicio,
      fechaInicio,
      fechaFin,
      buscar
    } = req.query;

    // Construir filtros
    const filtros = {};
    
    if (estado) {
      filtros.estado = estado;
    }
    
    if (tipoServicio) {
      filtros.tipoServicio = tipoServicio;
    }
    
    if (fechaInicio || fechaFin) {
      filtros.fechaReserva = {};
      if (fechaInicio) {
        filtros.fechaReserva.$gte = new Date(fechaInicio);
      }
      if (fechaFin) {
        filtros.fechaReserva.$lte = new Date(fechaFin);
      }
    }
    
    if (buscar) {
      filtros.$or = [
        { nombre: { $regex: buscar, $options: 'i' } },
        { apellido: { $regex: buscar, $options: 'i' } },
        { email: { $regex: buscar, $options: 'i' } },
        { codigoConfirmacion: { $regex: buscar, $options: 'i' } }
      ];
    }

    const reservas = await Reserva.find(filtros)
      .populate('servicioInfo')
      .populate('usuarioId', 'email nombre')
      .sort({ fechaCreacion: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Reserva.countDocuments(filtros);

    res.json({
      success: true,
      data: {
        reservas,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        total
      }
    });

  } catch (error) {
    console.error('Error al obtener reservas:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Obtener una reserva por ID
export const obtenerReservaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const reserva = await Reserva.findById(id)
      .populate('servicioInfo')
      .populate('servicioInfo', 'email nombre');

    if (!reserva) {
      return res.status(404).json({
        success: false,
        message: 'Reserva no encontrada'
      });
    }

    res.json({
      success: true,
      data: reserva
    });

  } catch (error) {
    console.error('Error al obtener reserva:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Obtener reserva por código de confirmación
export const obtenerReservaPorCodigo = async (req, res) => {
  try {
    const { codigo } = req.params;

    const reserva = await Reserva.findOne({ codigoConfirmacion: codigo })
     .populate('servicioInfo')
     .populate('servicioInfo','email nombre');

    if (!reserva) {
      return res.status(404).json({
        success: false,
        message: 'No se encontró ninguna reserva con ese código'
      });
    }

    res.json({
      success: true,
      data: reserva
    });

  } catch (error) {
    console.error('Error al obtener reserva por código:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Actualizar estado de reserva
export const actualizarEstadoReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const estadosValidos = ['pendiente', 'confirmada', 'cancelada', 'completada'];
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({
        success: false,
        message: 'Estado no válido'
      });
    }

    const reserva = await Reserva.findByIdAndUpdate(
      id,
      { estado, fechaActualizacion: new Date() },
      { new: true }
    ).populate('servicioInfo')

    if (!reserva) {
      return res.status(404).json({
        success: false,
        message: 'Reserva no encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Estado de reserva actualizado exitosamente',
      data: reserva
    });

  } catch (error) {
    console.error('Error al actualizar estado de reserva:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Cancelar reserva
export const cancelarReserva = async (req, res) => {
  try {
    // Si la reserva viene del middleware, usarla; si no, buscarla
    let reserva = req.reserva;
    
    if (!reserva) {
      const { id } = req.params;
      reserva = await Reserva.findById(id);
      
      if (!reserva) {
        return res.status(404).json({
          success: false,
          message: 'Reserva no encontrada'
        });
      }
    }

    if (reserva.estado === 'cancelada') {
      return res.status(400).json({
        success: false,
        message: 'La reserva ya está cancelada'
      });
    }

    if (reserva.estado === 'completada') {
      return res.status(400).json({
        success: false,
        message: 'No se puede cancelar una reserva completada'
      });
    }

    const { motivo } = req.body;

    // Actualizar estado
    reserva.estado = 'cancelada';
    reserva.fechaCancelacion = new Date();
    reserva.solicitudesEspeciales += motivo ? `\n\nMotivo de cancelación: ${motivo}` : '\n\nReserva cancelada';
    reserva.fechaActualizacion = new Date();

    await reserva.save();

    // Enviar correo de cancelación
    try {
      await emailService.enviarCancelacionReserva({
        nombre: reserva.nombre,
        apellido: reserva.apellido,
        email: reserva.email,
        codigoConfirmacion: reserva.codigoConfirmacion,
        servicio: reserva.servicio
      });
      console.log('Correo de cancelación enviado exitosamente');
    } catch (emailError) {
      console.error('Error enviando correo de cancelación:', emailError);
    }

    res.json({
      success: true,
      message: 'Reserva cancelada exitosamente',
      data: reserva
    });

  } catch (error) {
    console.error('Error cancelando reserva:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};