// backend/models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    descripcion: {
        type: String,
        required: true,
        trim: true,
    },
    completada: {
        type: Boolean,
        default: false,
    },
    categoria: {
        type: String,
        enum: ['Personal', 'Trabajo', 'Otros'],
        default: 'Personal',
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Task', TaskSchema);
