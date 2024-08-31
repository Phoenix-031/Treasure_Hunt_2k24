import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rootReducer } from './reducers';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  devTools: true,
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
setupListeners(store.dispatch);
