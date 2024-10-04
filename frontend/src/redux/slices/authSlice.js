import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Acción para registrar un usuario
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', userData);
            localStorage.setItem('userInfo', JSON.stringify(res.data));  // Corregido JASON a JSON
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data.mensaje);  // Usar rejectWithValue
        }
    }
);

// Acción para iniciar sesión de un usuario
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (Credential, { rejectWithValue }) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', Credential);
            localStorage.setItem('userInfo', JSON.stringify(res.data));  // Corregido JASON a JSON
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data.mensaje);  // Usar rejectWithValue
        }
    }
);

// Definición del Slice de autenticación
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        },
    },
    extraReducers: (builder) => {
        // Manejo de registro de usuario
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Manejo de inicio de sesión de usuario
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
