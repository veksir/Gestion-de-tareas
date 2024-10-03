// frontend/src/components/Tasks/TaskForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../../redux/slices/taskSlice';
import Input from '../UI/Input';
import Button from '../UI/Button';

const TaskForm = () => {
    const dispatch = useDispatch();
    const [descripcion, setDescripcion] = useState('');
    const [categoria, setCategoria] = useState('Personal');

    const onSubmit = (e) => {
        e.preventDefault();
        if (descripcion.trim() === '') return;

        dispatch(createTask({ descripcion, categoria }));
        setDescripcion('');
        setCategoria('Personal');
    };

    return (
        <form onSubmit={onSubmit} className="flex flex-col md:flex-row items-center mb-4">
            <Input
                type="text"
                placeholder="Nueva Tarea"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="flex-grow mb-2 md:mb-0 md:mr-2"
            />
            <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 mr-2"
            >
                <option value="Personal">Personal</option>
                <option value="Trabajo">Trabajo</option>
                <option value="Otros">Otros</option>
            </select>
            <Button type="submit">Agregar</Button>
        </form>
    );
};

export default TaskForm;
