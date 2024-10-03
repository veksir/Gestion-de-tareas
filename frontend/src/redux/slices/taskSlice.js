import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';

// thunk para obtener tareas
export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (_, { getState, isRejectedWithValue }) =>{
        const { auth: { userInfo } } = getState();
        try {
            const res = await axios.get('https://localhost/5000/api/tareas', {
                headers: {
                    Authorization: 'Bearer ${userInfo.token}',
                },
            });
            return res.data;
        } catch (error){
            return isRejectedWithValue(error.response.data.mensaje);
        }
    }
);

// thunk para crear tareas
export const createTask = createAsyncThunk(
    'task/createTask',
    async (taskData, { getState, isRejectedWithValue}) => {
        const { auth: { userInfo } } = getState();
        try {
            const res = await axios.post('https//localhost:5000/api/tareas', taskData, {
                headers: {
                    Authorization: 'Bearer ${userInfo.token}',
                },
            });
            return res.data;
        } catch (error) {
            return isRejectedWithValue(error.response.data.mensaje);
        }
    }
);

// thunk para actualizar una tarea
export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async ({ id, updateData }, { getState, isRejectedWithValue }) => {
        const { auth: { userInfo } } = getState();
        try {
            const res = await axios.put('https//localhost:5000/api/tareas/${id}', updateData, {
                headers: {
                    Authorization: 'Bearer ${userInfo.token}',
                },
            });
            return res.data
        } catch (error) {
            return isRejectedWithValue(error.response.data.mensaje);
        }
    }
);