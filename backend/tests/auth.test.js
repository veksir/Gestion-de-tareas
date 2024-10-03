// backend/tests/auth.test.js
const request = require('supertest');
const app = require('../index'); // Asegúrate de exportar app en index.js
const mongoose = require('mongoose');
const User = require('../models/User');

beforeAll(async () => {
    // Conectar a una base de datos de prueba
    await mongoose.connect(process.env.MONGO_URI_TEST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    // Cerrar la conexión
    await mongoose.connection.close();
});

beforeEach(async () => {
    // Limpiar la base de datos antes de cada prueba
    await User.deleteMany({});
});

describe('POST /api/auth/register', () => {
    it('debería registrar un nuevo usuario', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                nombre: 'Juan Pérez',
                email: 'juan@example.com',
                password: 'password123',
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
        expect(res.body).toHaveProperty('nombre', 'Juan Pérez');
    });

    it('no debería registrar un usuario con el mismo email', async () => {
        // Crear un usuario primero
        await User.create({
            nombre: 'Juan Pérez',
            email: 'juan@example.com',
            password: 'password123',
        });

        const res = await request(app)
            .post('/api/auth/register')
            .send({
                nombre: 'Juan Pérez',
                email: 'juan@example.com',
                password: 'password123',
            });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('mensaje', 'Usuario ya registrado');
    });
});

describe('POST /api/auth/login', () => {
    it('debería iniciar sesión un usuario existente', async () => {
        // Crear un usuario primero
        const usuario = await User.create({
            nombre: 'Juan Pérez',
            email: 'juan@example.com',
            password: 'password123',
        });

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'juan@example.com',
                password: 'password123',
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body).toHaveProperty('nombre', 'Juan Pérez');
    });

    it('no debería iniciar sesión con credenciales inválidas', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'inexistente@example.com',
                password: 'password123',
            });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('mensaje', 'Credenciales inválidas');
    });
});
