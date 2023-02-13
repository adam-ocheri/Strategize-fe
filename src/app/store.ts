import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './state_management/user/authSlice.js';
import projectReducer from './state_management/project/projectSlice.js';
import LTGReducer from './state_management/LTG/LTGSlice.js';
import objectiveReducer from './state_management/objective/objectiveSlice.js';
import taskReducer from './state_management/task/taskSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
    ltg: LTGReducer,
    objective: objectiveReducer,
    task: taskReducer
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
