import { createAsyncThunk, createSlice, PayloadAction, Slice, ThunkAction } from '@reduxjs/toolkit';
import {create, update, getAll, getOne, deleteById} from './taskService.js'


export interface Task {
    data: [];
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
    activeTask: object;
}

const initialState : Task = {
    data: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    activeTask: {}
}

//*Async Reducers -----------------------------------------------------------------------------------------------------------------------------------------------------
//! ROUTE: api/project/Tasks -----------------------------------------------------------------------------------------------------------------------

export const createTask = createAsyncThunk('task/create',  async({taskName, parentId, owner, token} : any, thunkAPI) => {
    try {
        console.log("Slicing...");
        console.log({taskName});
        return await create({taskName, parentId, owner, token});
    } catch (error : any) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const getAllTasks = createAsyncThunk('task/getAll',  async({parentId, token} : any, thunkAPI) => {
    try {
        console.log("Slicing...");
        console.log({parentId});
        return await getAll({parentId, token});
    } catch (error : any) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})

//! ROUTE: api/project/Tasks/Task -----------------------------------------------------------------------------------------------------------------

export const updateTask = createAsyncThunk('task/update',  async({body, id, parentId, token} : any, thunkAPI) => {
    try {
        console.log("Slicing...");
        console.log({body});
        return await update({body, id, parentId, token});
    } catch (error : any) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})

export const getTask = createAsyncThunk('task/getOne',  async({id, token} : any, thunkAPI) => {
    try {
        console.log("Slicing...");
        console.log({id});
        return await getOne({id, token});
    } catch (error : any) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})

export const deleteTask = createAsyncThunk('task/delete',  async({id, parentId, owner, token} : any, thunkAPI) => {
    try {
        console.log("Slicing...");
        console.log({id});
        return await deleteById({id, parentId, owner, token});
    } catch (error : any) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})

//*Slice Setup -----------------------------------------------------------------------------------------------------------------------------------------------------
export const TaskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {reset__Task: (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = false;
        state.message = '';
    }},
    extraReducers: (builder) => {
        builder
            // Create CASES
            .addCase(createTask.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTask.fulfilled, (state : any, action : any) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.data.push(action.payload);
            })
            .addCase(createTask.rejected, (state : any, action: any) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            // getAll CASES
            .addCase(getAllTasks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllTasks.fulfilled, (state : any, action : any) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getAllTasks.rejected, (state : any, action: any) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            // GET-One CASES
            .addCase(getTask.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTask.fulfilled, (state : any, action : any) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.activeTask = action.payload;
            })
            .addCase(getTask.rejected, (state : any, action: any) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            // Update CASES
            .addCase(updateTask.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateTask.fulfilled, (state : any, action : any) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.data = state.data.map((item : any) => {
                    if(item._id === action.payload._id)
                    {
                        return Object.assign({}, item, {TaskName: action.payload.TaskName})
                    }
                    return item;
                })
            })
            .addCase(updateTask.rejected, (state : any, action: any) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            // Delete CASES
            .addCase(deleteTask.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteTask.fulfilled, (state : any, action : any) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.data = state.data.filter((item : any) => item._id !== action.payload._id);
            })
            .addCase(deleteTask.rejected, (state : any, action: any) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
    }
})

export const {reset__Task} = TaskSlice.actions;
export default TaskSlice.reducer;