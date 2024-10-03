// backend/controllers/taskController.js
const Task = require('../models/Task');

// Obtener Todas las Tareas del Usuario
exports.obtenerTareas = async (req, res) => {
    try {
        const tareas = await Task.find({ usuario: req.user.id }).sort({ createdAt: -1 });
        res.json(tareas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las tareas', error: error.message });
    }
};

// Crear Nueva Tarea
exports.crearTarea = async (req, res) => {
    const { descripcion, categoria } = req.body;

    if (!descripcion) {
        return res.status(400).json({ mensaje: 'Descripción de tarea requerida' });
    }

    try {
        const tarea = await Task.create({
            descripcion,
            categoria: categoria || 'Personal',
            usuario: req.user.id,
        });

        res.status(201).json(tarea);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la tarea', error: error.message });
    }
};

// Actualizar Tarea
exports.actualizarTarea = async (req, res) => {
    const { id } = req.params;
    const { descripcion, completada, categoria } = req.body;

    try {
        const tarea = await Task.findById(id);

        if (!tarea) {
            return res.status(404).json({ mensaje: 'Tarea no encontrada' });
        }

        // Verificar si el usuario es dueño de la tarea
        if (tarea.usuario.toString() !== req.user.id) {
            return res.status(401).json({ mensaje: 'No autorizado' });
        }

        // Actualizar campos
        tarea.descripcion = descripcion || tarea.descripcion;
        tarea.completada = completada !== undefined ? completada : tarea.completada;
        tarea.categoria = categoria || tarea.categoria;

        const tareaActualizada = await tarea.save();
        res.json(tareaActualizada);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar la tarea', error: error.message });
    }
};

// Eliminar Tarea
exports.eliminarTarea = async (req, res) => {
    const { id } = req.params;

    try {
        const tarea = await Task.findById(id);

        if (!tarea) {
            return res.status(404).json({ mensaje: 'Tarea no encontrada' });
        }

        // Verificar si el usuario es dueño de la tarea
        if (tarea.usuario.toString() !== req.user.id) {
            return res.status(401).json({ mensaje: 'No autorizado' });
        }

        await tarea.remove();
        res.json({ mensaje: 'Tarea eliminada' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la tarea', error: error.message });
    }
};
