import { configureStore } from '@reduxjs/toolkit';
import { exchangerSlice } from './slices/exchangerSlice';
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: {
    exchanger: exchangerSlice.reducer,
  },
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
