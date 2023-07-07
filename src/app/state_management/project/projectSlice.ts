import { createAsyncThunk, createSlice, PayloadAction, Slice, ThunkAction } from '@reduxjs/toolkit';
import {create, update, getAll, getOne, deleteProjectById, getAllSubstations, getAllUserProjectsAndTasks} from './projectService.js'

import mongoose from 'mongoose';
import { formatFormSubmission, formatName } from 'src/components/stations/stationGlobals/stationUtils.js';

export interface Project {
    data: [];
    subData: [];
    allUserTasks: [];
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
    activeProject: object;
}

const initialState : Project = {
    data: [],
    subData: [],
    allUserTasks: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    activeProject: {}
}

//*Async Reducers -----------------------------------------------------------------------------------------------------------------------------------------------------
//! ROUTE: api/projects -----------------------------------------------------------------------------------------------------------------------

export const createProject = createAsyncThunk('project/create',  async({projectName, owner, token} : any, thunkAPI) => {
    try {
        console.log("Slicing...");
        console.log({projectName});
        return await create({projectName: formatName(projectName), owner, token});
    } catch (error : any) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})

export const getAllProjects = createAsyncThunk('project/getAll',  async({owner, token} : any, thunkAPI) => {
    try {
        console.log("Slicing...");
        console.log({owner});
        return await getAll({owner, token});
    } catch (error : any) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})

//! ROUTE: api/projects/project -----------------------------------------------------------------------------------------------------------------

export const updateProject = createAsyncThunk('project/update',  async({body, id, token} : any, thunkAPI) => {
    try {
        console.log("Slicing...");
        console.log(body);
        return await update({body: body, id, token});
    } catch (error : any) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})

export const getProject = createAsyncThunk('project/getOne',  async({id, token} : any, thunkAPI) => {
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

export const deleteProject = createAsyncThunk('project/delete',  async({id, owner, token} : any, thunkAPI) => {
    try {
        console.log("Slicing...");
        console.log({id});
        return await deleteProjectById({id, owner, token});
    } catch (error : any) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})

export const getAllSubstations_Project = createAsyncThunk('project/getAllTasks',  async({id, owner, token} : any, thunkAPI) => {
    try {
        console.log("Slicing...");
        console.log({id});
        return await getAllSubstations({id, owner, token});
    } catch (error : any) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})

export const getAllProjectsAndSubstations = createAsyncThunk('project/getAllUserTasks',  async({owner, token} : any, thunkAPI) => {
    try {
        console.log("Slicing...");
        console.log({owner});
        return await getAllUserProjectsAndTasks({owner, token});
    } catch (error : any) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})

// Fake Async Reducers
export const updateTask_ProfileView = createAsyncThunk('project/updateTask_ProfileContext',  async({task} : any, thunkAPI) => {
    try {
        return task;
    } catch (error : any) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})

export const deleteTask_ProfileView = createAsyncThunk('project/updateTask_ProjectContext',  async({task} : any, thunkAPI) => {
    try {
        return task;
    } catch (error : any) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})

//*Slice Setup -----------------------------------------------------------------------------------------------------------------------------------------------------
export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {reset__project: (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = false;
        state.message = '';
    }},
    extraReducers: (builder) => {
        builder
            // Create CASES
            .addCase(createProject.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProject.fulfilled, (state : any, action : any) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.data.push(action.payload);
            })
            .addCase(createProject.rejected, (state : any, action: any) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            // getAll CASES
            .addCase(getAllProjects.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProjects.fulfilled, (state : any, action : any) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getAllProjects.rejected, (state : any, action: any) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            // GET-One CASES
            .addCase(getProject.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProject.fulfilled, (state : any, action : any) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.activeProject = action.payload;
            })
            .addCase(getProject.rejected, (state : any, action: any) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            // Update CASES
            .addCase(updateProject.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProject.fulfilled, (state : any, action : any) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.data = state.data.map((item : any) => {
                    if(item._id === action.payload._id)
                    {
                        return Object.assign({}, item, {projectName: action.payload.projectName})
                    }
                    return item;
                })
            })
            .addCase(updateProject.rejected, (state : any, action: any) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            // Delete CASES
            .addCase(deleteProject.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProject.fulfilled, (state : any, action : any) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.data = state.data.filter((item : any) => item._id !== action.payload._id);
                state.activeProject = {};
            })
            .addCase(deleteProject.rejected, (state : any, action: any) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            // getAllSubstations CASES
            .addCase(getAllSubstations_Project.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllSubstations_Project.fulfilled, (state : any, action : any) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.subData = action.payload;
            })
            .addCase(getAllSubstations_Project.rejected, (state : any, action: any) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            // getAllProjectsAndSubstations CASES
            .addCase(getAllProjectsAndSubstations.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProjectsAndSubstations.fulfilled, (state : any, action : any) => {
                console.log('BUILDER LOG! getAllProjectsAndSubstations =-> allUserTasks')
                state.isSuccess = true;
                state.isLoading = false;
                state.allUserTasks = action.payload;
            })
            .addCase(getAllProjectsAndSubstations.rejected, (state : any, action: any) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            // updateTask_ProfileView CASES
            .addCase(updateTask_ProfileView.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateTask_ProfileView.fulfilled, (state : any, action : any) => {
                console.log('BUILDER LOG! updateTask_ProfileView =-> allUserTasks')
                console.log('state.allUserTasks: ', state.allUserTasks)
                let newlyCreatedTask = true;
                state.isSuccess = true;
                state.isLoading = false;
                state.allUserTasks = state.allUserTasks.map((item : any) => {
                    console.log('item: ', item)
                    
                    if(item._id === action.payload._id)
                    {
                        newlyCreatedTask = false;
                        return action.payload;
                    }
                    return item;
                })

                if (newlyCreatedTask){
                    state.allUserTasks = [...state.allUserTasks, action.payload];
                }
            })
            .addCase(updateTask_ProfileView.rejected, (state : any, action: any) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            // updateTask_ProjectView CASES
            .addCase(deleteTask_ProfileView.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteTask_ProfileView.fulfilled, (state : any, action : any) => {
                state.isSuccess = true;
                state.isLoading = false;
                // state.allUserTasks = state.allUserTasks.map((item : any) => {
                //     if(item._id === action.payload._id)
                //     {
                //         return; //action.payload;
                //     }
                //     return item;
                // })
                state.allUserTasks = state.allUserTasks.filter((item:any) => item._id !== action.payload._id)
            })
            .addCase(deleteTask_ProfileView.rejected, (state : any, action: any) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
    }
})

export const {reset__project} = projectSlice.actions;
export default projectSlice.reducer;