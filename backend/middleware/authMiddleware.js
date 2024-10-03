// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.proteger = async (req, res, next) => {
    let token;

    // Verificar si el encabezado de autorización existe y empieza con "Bearer"
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Obtener el token del encabezado
            token = req.headers.authorization.split(' ')[1];

            // Verificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Obtener el usuario del token, excluyendo la contraseña
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ mensaje: 'No autorizado, token inválido' });
        }
    }

    if (!token) {
        res.status(401).json({ mensaje: 'No autorizado, sin token' });
    }
};
