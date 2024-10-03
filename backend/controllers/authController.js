// backend/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Función para generar JWT
const generarToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// Registro de Usuario
exports.registrarUsuario = async (req, res) => {
    const { nombre, email, password } = req.body;

    // Validar campos
    if (!nombre || !email || !password) {
        return res.status(400).json({ mensaje: 'Por favor completa todos los campos' });
    }

    try {
        // Verificar si el usuario ya existe
        const usuarioExistente = await User.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'Usuario ya registrado' });
        }

        // Crear nuevo usuario
        const usuario = await User.create({
            nombre,
            email,
            password,
        });

        if (usuario) {
            res.status(201).json({
                _id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email,
                token: generarToken(usuario._id),
            });
        } else {
            res.status(400).json({ mensaje: 'Datos de usuario inválidos' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error del servidor', error: error.message });
    }
};

// Inicio de Sesión de Usuario
exports.iniciarSesion = async (req, res) => {
    const { email, password } = req.body;

    // Validar campos
    if (!email || !password) {
        return res.status(400).json({ mensaje: 'Por favor completa todos los campos' });
    }

    try {
        // Verificar si el usuario existe
        const usuario = await User.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ mensaje: 'Credenciales inválidas' });
        }

        // Verificar contraseña
        const esValido = await usuario.matchPassword(password);
        if (!esValido) {
            return res.status(400).json({ mensaje: 'Credenciales inválidas' });
        }

        // Enviar respuesta con token
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarToken(usuario._id),
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error del servidor', error: error.message });
    }
};
