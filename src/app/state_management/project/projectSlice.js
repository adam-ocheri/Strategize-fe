import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { create, update, get, deleteProjectById } from './projectService.js';
const initialState = {
    data: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};
//Async Reducers
export const createProject = createAsyncThunk('project/create', async ({ projectName, owner, token }, thunkAPI) => {
    try {
        console.log("Slicing...");
        console.log({ projectName });
        return await create({ projectName, owner, token });
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
export const updateProject = createAsyncThunk('project/update', async ({ projectName, id, token }, thunkAPI) => {
    try {
        console.log("Slicing...");
        console.log({ projectName });
        return await update({ projectName, id, token });
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
export const getAllProjects = createAsyncThunk('project/get', async ({ owner, token }, thunkAPI) => {
    try {
        console.log("Slicing...");
        console.log({ owner });
        return await get({ owner, token });
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
export const deleteProject = createAsyncThunk('project/delete', async ({ projectId, token }, thunkAPI) => {
    try {
        console.log("Slicing...");
        console.log({ projectId });
        return await deleteProjectById({ projectId, token });
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
//Slice Setup
export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: { reset__project: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        } },
    extraReducers: (builder) => {
        builder
            // Create CASES
            .addCase(createProject.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(createProject.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.data.push(action.payload);
        })
            .addCase(createProject.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
        })
            // Update CASES
            .addCase(updateProject.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(updateProject.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.data = state.data.map((item) => {
                if (item._id === action.payload._id) {
                    return Object.assign({}, item, { projectName: action.payload.projectName });
                }
                return item;
            });
        })
            .addCase(updateProject.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
        })
            // Get CASES
            .addCase(getAllProjects.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(getAllProjects.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.data = action.payload;
        })
            .addCase(getAllProjects.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
        })
            // Get CASES
            .addCase(deleteProject.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(deleteProject.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.data = state.data.filter((item) => item._id !== action.payload._id);
        })
            .addCase(deleteProject.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
        });
    }
});
export const { reset__project } = projectSlice.actions;
export default projectSlice.reducer;
