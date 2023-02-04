import { configureStore } from '@reduxjs/toolkit';
import authReducer from './state_management/user/authSlice.js';
import projectReducer from './state_management/project/projectSlice.js';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        project: projectReducer
    },
});
