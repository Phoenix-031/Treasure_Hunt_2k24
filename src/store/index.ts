import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rootReducer } from './reducers';

export const store = configureStore({
  devTools: true,
  reducer: rootReducer,
});

setupListeners(store.dispatch);
