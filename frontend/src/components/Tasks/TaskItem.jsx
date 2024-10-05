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

    const toggleCompletada = async () => {
        try {
            await dispatch(updateTask({ id: tarea._id, updateData: { completada: !tarea.completada } })).unwrap();
        } catch (error) {
            console.error("Error al actualizar la tarea:", error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await dispatch(updateTask({ id: tarea._id, updateData: { descripcion, categoria } })).unwrap();
            setEditMode(false);
        } catch (error) {
            console.error("Error al actualizar la tarea:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await dispatch(deleteTask(tarea._id)).unwrap();
        } catch (error) {
            console.error("Error al eliminar la tarea:", error);
        }
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
                        required
                    />
                    <select
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 mr-2"
                        required
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
