// backend/tests/task.test.js
const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');
const User = require('../models/User');
const Task = require('../models/Task');
const jwt = require('jsonwebtoken');

let token;

beforeAll(async () => {
    // Conectar a una base de datos de prueba
    await mongoose.connect(process.env.MONGO_URI_TEST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // Crear un usuario y obtener el token
    const usuario = await User.create({
        nombre: 'Juan Pérez',
        email: 'juan@example.com',
        password: 'password123',
    });

    token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
});

afterAll(async () => {
    // Cerrar la conexión
    await mongoose.connection.close();
});

beforeEach(async () => {
    // Limpiar la colección de tareas antes de cada prueba
    await Task.deleteMany({});
});

describe('GET /api/tareas', () => {
    it('debería obtener todas las tareas del usuario', async () => {
        // Crear tareas
        await Task.create([
            { descripcion: 'Tarea 1', usuario: mongoose.Types.ObjectId() }, // Otro usuario
            { descripcion: 'Tarea 2', usuario: (await User.findOne({ email: 'juan@example.com' }))._id },
        ]);

        const res = await request(app)
            .get('/api/tareas')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(1);
        expect(res.body[0]).toHaveProperty('descripcion', 'Tarea 2');
    });
});

describe('POST /api/tareas', () => {
    it('debería crear una nueva tarea', async () => {
        const res = await request(app)
            .post('/api/tareas')
            .set('Authorization', `Bearer ${token}`)
            .send({
                descripcion: 'Nueva Tarea',
                categoria: 'Trabajo',
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('descripcion', 'Nueva Tarea');
        expect(res.body).toHaveProperty('categoria', 'Trabajo');
    });

    it('no debería crear una tarea sin descripción', async () => {
        const res = await request(app)
            .post('/api/tareas')
            .set('Authorization', `Bearer ${token}`)
            .send({
                categoria: 'Trabajo',
            });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('mensaje', 'Descripción de tarea requerida');
    });
});
