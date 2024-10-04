import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';

// thunk para obtener tareas
export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (_, { getState, isRejectedWithValue }) =>{
        const { auth: { userInfo } } = getState();
        try {
            const res = await axios.get('https://192.168.1.5:5000/api/tareas', {
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
            const res = await axios.post('https//192.168.1.5:5000/api/tareas', taskData, {
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
            const res = await axios.put('https//192.168.1.5:5000/api/tareas/${id}', updateData, {
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

// thunk para eliminar una tarea
export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (id, { getState, isRejectedWithValue }) => {
        const { auth: { userInfo } } = getState();
        try {
            await axios.delete('https://192.168.1.5:5000/api/tareas/${id}', {
                headers: {
                    Authorization: 'Bearer ${userInfo.token}',
                },
            });
            return id;
        } catch (error) {
            return isRejectedWithValue(error.response.data.mensaje);
        }
    }
);

// Slice de Tareas
const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tareas: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        //obtener Tareas
        [fetchTasks.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchTasks.fullfiled]: (state, action) => {
            state.loading = false;
            state.tareas = action.payload;
        },
        [fetchTasks.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Crear Tarea
        [fetchTasks.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchTasks.fullfiled]: (state, action) => {
            state.loading = false;
            state.tareas.unshift(action.payload);
        },
        [fetchTasks.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Actualizar Tarea
        [updateTask.pending]: (state) =>{
            state.loading = true;
            state.error = null;
        },
        [updateTask.fulfilled]: (state, action) =>{
            state.loading = false;
            const index = state.tareas.findIndex(tarea => tarea._id === action.payload._id);
            if (index !== -1) {
                state.tareas[index] = action.payload;
            }
        },
        [updateTask.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Eliminar Tarea
        [deleteTask.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [deleteTask.fullfiled]: (state, action) => {
            state.loading = false;
            state.tareas = state.tareas.filter(tarea => tarea._id !== action.payload);
        },
        [deleteTask.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export default taskSlice.reducer;