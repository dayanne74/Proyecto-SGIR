import jwt from 'jsonwebtoken';
import usuarioSchema from '../models/usuario';

// Middleware para verificar token JWT
export const verificarToken = async (req, res, next) => {
  try {
    console.log('=== Authorization header:', req.headers.authorization);
    const authHeader = req.headers.authorization;

    const token = authHeader.split(' ')[1]; // Remover "Bearer "
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Formato de token inválido'
      });
    }

    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Buscar el usuario en la base de datos
    const user = await usuarioSchema
   .findById(decoded.id)
    .select('-password')
    .populate('roles', 'nombreRol');
     
    if (!user) {
      req.user = user;
      return res.status(401).json({
        success: false,
        message: 'Usuario no encontrado'
        
      });
    }
  if (!user.estadoUsuario) {
      return res.status(401).json({
        success: false,
        message: 'Usuario desactivado'
      });
    }

    // Agregar usuario a la request
    req.user = user;
    next();

  } catch (error) {
    console.error('Error en verificación de token:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Token inválido'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expirado'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Middleware para verificar rol de administrador
 // Middleware para verificar rol de administrador
export const verificarAdmin = (req, res, next) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: 'Usuario no autenticado' });
    }

    // Busca "administrador" (en minúsculas) dentro de los roles poblados
    const tieneAdmin = req.user.roles.some(
      (r) => r.nombreRol.toLowerCase() === 'administrador'
    );
    if (!tieneAdmin) {
      return res
        .status(403)
        .json({ success: false, message: 'Acceso denegado. Se requieren permisos de administrador' });
    }

    next();
  } catch (error) {
    console.error('Error en verificación de admin:', error);
    return res
      .status(500)
      .json({ success: false, message: 'Error interno del servidor' });
  }
};


// Middleware para verificar que el usuario sea propietario del recurso o admin
export const verificarPropietarioOAdmin = (campoUsuarioId = 'usuarioId') => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Usuario no autenticado' });
      }

      // 1) Si es admin → siguiente directamente
      const esAdmin = req.user.roles.some(r => r.nombreRol === 'admin');
      if (esAdmin) {
        return next();
      }

      // 2) Si no es admin, verificar propietario
      //    asumo que el recurso lleva el ID en req.params.userId o en body[campoUsuarioId]
      const recursoUsuarioId = req.params[campoUsuarioId] 
        || req.body[campoUsuarioId]
        || req.params.id;  // o donde lo tengas
      if (req.user._id.toString() !== recursoUsuarioId) {
        return res.status(403).json({
          success: false,
          message: 'Acceso denegado. Solo puedes acceder a tus propios recursos'
        });
      }

      next();
    } catch (error) {
      console.error('Error en verificación de propietario/Admin:', error);
      return res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
  };
};

// Middleware opcional para autenticación (no bloquea si no hay token)
export const verificarTokenOpcional = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      req.user = null;
      return next();
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      req.user = null;
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (user && user.activo) {
      req.user = user;
    } else {
      req.user = null;
    }

    next();

  } catch (error) {
    // En caso de error, simplemente continuar sin usuario
    req.user = null;
    next();
  }
};

// Middleware para limitar intentos de acceso
const intentosFallidos = new Map();

export const limitarIntentos = (maxIntentos = 5, tiempoBloqueo = 15 * 60 * 1000) => {
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const ahora = Date.now();
    
    if (intentosFallidos.has(ip)) {
      const datos = intentosFallidos.get(ip);
      
      // Si está bloqueado
      if (datos.bloqueadoHasta && ahora < datos.bloqueadoHasta) {
        const tiempoRestante = Math.ceil((datos.bloqueadoHasta - ahora) / 1000 / 60);
        return res.status(429).json({
          success: false,
          message: `Demasiados intentos fallidos. Intenta de nuevo en ${tiempoRestante} minutos`
        });
      }
      
      // Si ya pasó el tiempo de bloqueo, reiniciar contador
      if (datos.bloqueadoHasta && ahora >= datos.bloqueadoHasta) {
        intentosFallidos.delete(ip);
      }
    }
    
    next();
  };
};

// Función para registrar intento fallido
export const registrarIntentoFallido = (req) => {
  const ip = req.ip || req.connection.remoteAddress;
  const ahora = Date.now();
  
  if (intentosFallidos.has(ip)) {
    const datos = intentosFallidos.get(ip);
    datos.intentos += 1;
    datos.ultimoIntento = ahora;
    
    if (datos.intentos >= 5) {
      datos.bloqueadoHasta = ahora + (15 * 60 * 1000); // 15 minutos
    }
  } else {
    intentosFallidos.set(ip, {
      intentos: 1,
      ultimoIntento: ahora,
      bloqueadoHasta: null
    });
  }
};

// Función para limpiar intentos exitosos
export const limpiarIntentosFallidos = (req) => {
  const ip = req.ip || req.connection.remoteAddress;
  intentosFallidos.delete(ip);
};