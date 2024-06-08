// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import userDraftReducer from './features/user/draftSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    notes: userDraftReducer,
  },
});
