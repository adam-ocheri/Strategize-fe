import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './state_management/user/authSlice.js';
import projectReducer from './state_management/project/projectSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer
  },
});
//
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
