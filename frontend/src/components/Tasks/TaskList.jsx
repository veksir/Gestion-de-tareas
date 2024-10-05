// frontend/src/components/Tasks/TaskList.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask } from '../../redux/slices/taskSlice';
import TaskItem from './TaskItem';

const TaskList = () => {
    const dispatch = useDispatch();
    const { tasks, loading, error } = useSelector(state => state.tasks); // Cambiado de "tareas" a "tasks"

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    if (loading) return <p>Cargando tareas...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (tasks.length === 0) return <p>No tienes tareas registradas.</p>;

    return (
        <ul>
            {tasks.map(tarea => (
                <TaskItem key={tarea._id} tarea={tarea} />
            ))}
        </ul>
    );
};

export default TaskList;
