import jwt from 'jsonwebtoken';

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token de autenticación inválido' });
    }
};

// Middleware para verificar el rol
const verifyRole = (rolesPermitidos) => (req, res, next) => {
    if (!req.user?.roles) {
        return res.status(403).json({ message: 'Acceso denegado - Rol no definido' });
    }

    // Convertimos ambos a minúsculas para comparar correctamente
    const userRoles = req.user.roles.map(r => r.toLowerCase());
    const allowedRoles = rolesPermitidos.map(r => r.toLowerCase());

    if (userRoles.some(role => allowedRoles.includes(role))) {
        return next();
    }

    return res.status(403).json({ message: 'Acceso denegado - Privilegios insuficientes' });
};

export { verifyToken, verifyRole };
