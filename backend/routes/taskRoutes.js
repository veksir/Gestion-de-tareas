// backend/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const { obtenerTareas, crearTarea, actualizarTarea, eliminarTarea } = require('../controllers/taskController');
const { proteger } = require('../middleware/authMiddleware');

// Todas las rutas aquí requieren autenticación
router.use(proteger);

// Obtener todas las tareas
router.get('/', obtenerTareas);

// Crear una nueva tarea
router.post('/', crearTarea);

// Actualizar una tarea existente
router.put('/:id', actualizarTarea);

// Eliminar una tarea
router.delete('/:id', eliminarTarea);

module.exports = router;
