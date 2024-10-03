// frontend/src/components/Tasks/TaskItem.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask, deleteTask } from '../../redux/slices/taskSlice';
import Button from '../UI/Button';

const TaskItem = ({ tarea }) => {
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const [descripcion, setDescripcion] = useState(tarea.descripcion);
    const [categoria, setCategoria] = useState(tarea.categoria);

    const toggleCompletada = () => {
        dispatch(updateTask({ id: tarea._id, updatedData: { completada: !tarea.completada } }));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(updateTask({ id: tarea._id, updatedData: { descripcion, categoria } }));
        setEditMode(false);
    };

    const handleDelete = () => {
        dispatch(deleteTask(tarea._id));
    };

    return (
        <li className="flex items-center justify-between bg-gray-100 p-4 rounded mb-2">
            {editMode ? (
                <form onSubmit={handleUpdate} className="flex-grow flex items-center">
                    <input
                        type="text"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 mr-2 flex-grow"
                    />
                    <select
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 mr-2"
                    >
                        <option value="Personal">Personal</option>
                        <option value="Trabajo">Trabajo</option>
                        <option value="Otros">Otros</option>
                    </select>
                    <Button type="submit" className="mr-2">Guardar</Button>
                    <Button type="button" onClick={() => setEditMode(false)}>Cancelar</Button>
                </form>
            ) : (
                <>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={tarea.completada}
                            onChange={toggleCompletada}
                            className="mr-2"
                        />
                        <span className={tarea.completada ? 'line-through' : ''}>{tarea.descripcion}</span>
                        <span className="ml-4 text-sm text-gray-600">({tarea.categoria})</span>
                    </div>
                    <div>
                        <Button onClick={() => setEditMode(true)} className="mr-2">Editar</Button>
                        <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-600">Eliminar</Button>
                    </div>
                </>
            )}
        </li>
    );
};

export default TaskItem;
