// frontend/src/components/Tasks/TaskList.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../redux/slices/taskSlice';
import TaskItem from './TaskItem';

const TaskList = () => {
    const dispatch = useDispatch();
    const { tareas, loading, error } = useSelector(state => state.tasks);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    if (loading) return <p>Cargando tareas...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <ul>
            {tareas.map(tarea => (
                <TaskItem key={tarea._id} tarea={tarea} />
            ))}
        </ul>
    );
};

export default TaskList;
