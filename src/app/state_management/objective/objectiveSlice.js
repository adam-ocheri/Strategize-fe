import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { create, update, getAll, getOne, deleteById } from './objectiveService.js';
const initialState = {
    data: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    activeObjective: {}
};
//*Async Reducers -----------------------------------------------------------------------------------------------------------------------------------------------------
//! ROUTE: api/project/Objectives -----------------------------------------------------------------------------------------------------------------------
export const createObjective = createAsyncThunk('objective/create', async ({ objectiveName, parentId, owner, token }, thunkAPI) => {
    try {
        console.log("Slicing...");
        console.log({ objectiveName });
        return await create({ objectiveName, parentId, owner, token });
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
export const getAllObjectives = createAsyncThunk('objective/getAll', async ({ parentId, token }, thunkAPI) => {
    try {
        console.log("Slicing...");
        console.log({ parentId });
        return await getAll({ parentId, token });
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
//! ROUTE: api/project/Objectives/Objective -----------------------------------------------------------------------------------------------------------------
export const updateObjective = createAsyncThunk('objective/update', async ({ body, id, parentId, token }, thunkAPI) => {
    try {
        console.log("Slicing...");
        console.log({ body });
        return await update({ body, id, parentId, token });
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
export const getObjective = createAsyncThunk('objective/getOne', async ({ id, token }, thunkAPI) => {
    try {
        console.log("Slicing...");
        console.log({ id });
        return await getOne({ id, token });
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
export const deleteObjective = createAsyncThunk('objective/delete', async ({ id, parentId, owner, token }, thunkAPI) => {
    try {
        console.log("Slicing...");
        console.log({ id });
        return await deleteById({ id, parentId, owner, token });
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
//*Slice Setup -----------------------------------------------------------------------------------------------------------------------------------------------------
export const ObjectiveSlice = createSlice({
    name: 'objective',
    initialState,
    reducers: { reset__Objective: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        } },
    extraReducers: (builder) => {
        builder
            // Create CASES
            .addCase(createObjective.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(createObjective.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.data.push(action.payload);
        })
            .addCase(createObjective.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
        })
            // getAll CASES
            .addCase(getAllObjectives.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(getAllObjectives.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.data = action.payload;
        })
            .addCase(getAllObjectives.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
        })
            // GET-One CASES
            .addCase(getObjective.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(getObjective.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.activeObjective = action.payload;
        })
            .addCase(getObjective.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
        })
            // Update CASES
            .addCase(updateObjective.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(updateObjective.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.data = state.data.map((item) => {
                if (item._id === action.payload._id) {
                    return Object.assign({}, item, { objectiveName: action.payload.ObjectiveName });
                }
                return item;
            });
        })
            .addCase(updateObjective.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
        })
            // Delete CASES
            .addCase(deleteObjective.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(deleteObjective.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.data = state.data.filter((item) => item._id !== action.payload._id);
        })
            .addCase(deleteObjective.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
        });
    }
});
export const { reset__Objective } = ObjectiveSlice.actions;
export default ObjectiveSlice.reducer;
