// frontend/src/redux/slices/taskSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosInstance';

// Thunk para obtener tareas
export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (_, { getState, rejectWithValue }) => {
        const { auth: { userInfo } } = getState();
        try {
            const res = await axiosInstance.get('http://192.168.1.5:5000/api/tareas', {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },  
            });
            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data && error.response.data.mensaje
                    ? error.response.data.mensaje
                    : error.message
            );
        }
    }
);

// Thunk para crear tareas
export const createTask = createAsyncThunk(
    'tasks/createTask',
    async (taskData, { getState, rejectWithValue }) => {
        const { auth: { userInfo } } = getState();
        try {
            const res = await axiosInstance.post('http://192.168.1.5:5000/api/tareas', taskData, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            });
            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data && error.response.data.mensaje
                    ? error.response.data.mensaje
                    : error.message
            );
        }
    }
);

// Thunk para actualizar una tarea
export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async ({ id, updateData }, { getState, rejectWithValue }) => {
        const { auth: { userInfo } } = getState();
        try {
            const res = await axiosInstance.put(`http://192.168.1.5:5000/api/tareas/${id}`, updateData, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            });
            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data && error.response.data.mensaje
                    ? error.response.data.mensaje
                    : error.message
            );
        }
    }
);

// Thunk para eliminar una tarea
export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (id, { getState, rejectWithValue }) => {
        const { auth: { userInfo } } = getState();
        try {
            await axiosInstance.delete(`http://192.168.1.5:5000/api/tareas/${id}`, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            });
            return id;
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data && error.response.data.mensaje
                    ? error.response.data.mensaje
                    : error.message
            );
        }
    }
);

// Slice de Tareas
const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // Obtener Tareas
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Crear Tarea
        builder
            .addCase(createTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.unshift(action.payload);
            })
            .addCase(createTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Actualizar Tarea
        builder
            .addCase(updateTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.tasks.findIndex(tarea => tarea._id === action.payload._id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Eliminar Tarea
        builder
            .addCase(deleteTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = state.tasks.filter(tarea => tarea._id !== action.payload);
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default taskSlice.reducer;
