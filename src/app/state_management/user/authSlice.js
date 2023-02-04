import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { registerUser, logoutUser, loginUser } from './authService';
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
const userData = localStorage.getItem('user');
const user = userData ? JSON.parse(userData) : null;
const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};
//async reducers
export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        console.log("Slicing...");
        console.log(userData);
        return await registerUser(userData);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {
        console.log("Slicing...");
        console.log(userData);
        return await loginUser(userData);
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
export const logout = createAsyncThunk('auth/logout', async (stuff, thunkAPI) => {
    try {
        return await logoutUser();
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
//Slice setup
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
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
            .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.user = action.payload;
        })
            .addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
        })
            //Login CASES
            .addCase(login.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.user = action.payload;
        })
            .addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
        })
            //Logout CASES
            .addCase(logout.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(logout.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.user = null;
        })
            .addCase(logout.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
        });
    }
});
//export async reducers
export const { reset } = authSlice.actions;
//export entire reducer slice as the root API of this file
export default authSlice.reducer;
