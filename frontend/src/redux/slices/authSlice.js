import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { isRejectedWithValue }) => {
        try {
            const res = await axios.post('http://localthost:5000/api/auth/register', userData);
            localStorage.setItem('userInfo', JASON.stringify(res.data));
            return res.data;
        } catch (error) {
            return isRejectedWithValue(error.response.data.mensaje);
        }
    }
);

export const loginUser = createAsyncthunk(
    'auth/loginUser',
    async (Credential, { isRejectedWithValue }) => {
        try {
            const res = await axios.post('https://localhost:5000/api/auth/login', Credential);
            localStorage.setItem('userInfo', JASON.stringify(res.data));
            return res.data;
        } catch (error) {
            return isRejectedWithValue(error.response.data.mensaje);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userInfo: localStorage.getItem('userInfo') ? JASON.parse(localStorage.getItem('userInfo')) : null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        },
    },
    extraReducers: {
        // registro
        [registerUser.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [registerUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
        },
        [registerUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // inicio de sesion
        [loginUser.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [loginUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
        },
        [loginUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;