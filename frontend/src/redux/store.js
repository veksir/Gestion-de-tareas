import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import taskReducer from './slices/taskSlice';
import { configure } from "@testing-library/react";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        tasks: taskReducer,
    }
});