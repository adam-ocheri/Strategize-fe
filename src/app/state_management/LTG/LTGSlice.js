import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { create, update, getAll, getOne, deleteById, getAllSubstations } from './LTGService.js';
const initialState = {
    data: [],
    subData: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    activeLTG: {}
};
//*Async Reducers -----------------------------------------------------------------------------------------------------------------------------------------------------
//! ROUTE: api/project/ltgs -----------------------------------------------------------------------------------------------------------------------
export const createLTG = createAsyncThunk('LTG/create', async ({ LTGName, parentId, owner, token }, thunkAPI) => {
    try {
        console.log("Slicing...");
        console.log({ LTGName });
        return await create({ LTGName, parentId, owner, token });
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
export const getAllLTGs = createAsyncThunk('LTG/getAll', async ({ parentId, token }, thunkAPI) => {
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
//! ROUTE: api/project/ltgs/ltg -----------------------------------------------------------------------------------------------------------------
export const updateLTG = createAsyncThunk('LTG/update', async ({ body, id, parentId, token }, thunkAPI) => {
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
export const getLTG = createAsyncThunk('LTG/getOne', async ({ id, parentId, token }, thunkAPI) => {
    try {
        console.log("Slicing...");
        console.log({ id });
        return await getOne({ id, parentId, token });
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
export const deleteLTG = createAsyncThunk('LTG/delete', async ({ id, parentId, owner, token }, thunkAPI) => {
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
export const getAllSubStations_LTG = createAsyncThunk('LTG/getAllSubstations', async ({ id, parentId, owner, token }, thunkAPI) => {
    try {
        console.log("Slicing...");
        console.log({ id });
        return await getAllSubstations({ id, parentId, owner, token });
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
//*Slice Setup -----------------------------------------------------------------------------------------------------------------------------------------------------
export const LTGSlice = createSlice({
    name: 'ltg',
    initialState,
    reducers: { reset__LTG: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        } },
    extraReducers: (builder) => {
        builder
            // Create CASES
            .addCase(createLTG.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(createLTG.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.data.push(action.payload);
        })
            .addCase(createLTG.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
        })
            // getAll CASES
            .addCase(getAllLTGs.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(getAllLTGs.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.data = action.payload;
        })
            .addCase(getAllLTGs.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
        })
            // GET-One CASES
            .addCase(getLTG.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(getLTG.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.activeLTG = action.payload;
        })
            .addCase(getLTG.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
        })
            // Update CASES
            .addCase(updateLTG.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(updateLTG.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.data = state.data.map((item) => {
                if (item._id === action.payload._id) {
                    return Object.assign({}, item, { LTGName: action.payload.LTGName });
                }
                return item;
            });
        })
            .addCase(updateLTG.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
        })
            // Delete CASES
            .addCase(deleteLTG.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(deleteLTG.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.data = state.data.filter((item) => item._id !== action.payload._id);
        })
            .addCase(deleteLTG.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
        })
            // GET-One CASES
            .addCase(getAllSubStations_LTG.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(getAllSubStations_LTG.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.subData = action.payload;
        })
            .addCase(getAllSubStations_LTG.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
        });
    }
});
export const { reset__LTG } = LTGSlice.actions;
export default LTGSlice.reducer;
