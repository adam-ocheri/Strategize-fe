import { createAsyncThunk, createSlice, PayloadAction, Slice, ThunkAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from 'src/app/store';
import { registerUser, logoutUser, loginUser, updateStat } from './authService';


export interface User {
    user: {};
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
    stationContext: string;
}

/*
The following line can not work in typescript:
!!!) const user = JSON.parse(localStorage.getItem('user'));
The received Error:           
!Argument of type 'string | null' is not assignable to parameter of type 'string'. Type 'null' is not assignable to type 'string'!
This means that JSON.Parse expects a string, but localStorage.getItem can be a string - but it also has the possibility of being NULL.

To put this another way, (ChatGPT):
*This error occurs because the localStorage.getItem() method can return either a string or null, but JSON.parse() requires a string input. 

For this reason, we have to handle the possibility of a null value.
*To handle the possibility of a null value, we need to check the value before passing it to JSON.parse():
*/
const userData: string | null = localStorage.getItem('user');
const user  = userData? JSON.parse(userData) : null;

const initialState : User = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    stationContext: ''
}

//async reducers
export const register = createAsyncThunk('auth/register', async(userData : any, thunkAPI) => {
    try {
        console.log("Slicing...");
        console.log(userData);
        return await registerUser(userData);
    } catch (error : any) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})

export const login = createAsyncThunk('auth/login', async(userData : any, thunkAPI) => {
    try {
        console.log("Slicing...");
        console.log(userData);
        return await loginUser(userData);
    } catch (error : any) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
})

export const logout = createAsyncThunk('auth/logout', async(stuff, thunkAPI) => {
    try {
        return await logoutUser();
    } catch (error : any) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
} )

export const setCurrentStationContext = createAsyncThunk('auth/setStationContext', async({newContext}:any, thunkAPI) => {
    try {
        return newContext;
    } catch (error : any) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
} )

export const updateUserStatistics = createAsyncThunk('auth/userStats', async({userStatistics, id, token} : any, thunkAPI) => {
    try{
        return await updateStat({userStatistics, id, token});
    } 
    catch (error : any) {
        const message : any = (error.response && error.response.data && error.response.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Slice setup
export const authSlice  = createSlice({
    name: 'auth',
    initialState,
    reducers: {                                     //Sync Reducers - defined and implemented here 
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            //Signup CASES
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action : any) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action : any ) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            //Login CASES
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action : any) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action : any ) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            //Logout CASES
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state : any, action : any) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.user = null;
            })
            .addCase(logout.rejected, (state, action : any ) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            //Station Context CASES
            .addCase(setCurrentStationContext.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(setCurrentStationContext.fulfilled, (state : any, action : any) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.stationContext = action.payload;
            })
            .addCase(setCurrentStationContext.rejected, (state, action : any ) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            //Update Stats CASES
            .addCase(updateUserStatistics.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUserStatistics.fulfilled, (state, action : any) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.user = Object.entries(state.user) ; // TODO !!!!!! <-
            })
            .addCase(updateUserStatistics.rejected, (state, action : any ) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
    }
})

//export async reducers
export const {reset} = authSlice.actions;

//export entire reducer slice as the root API of this file
export default authSlice.reducer;