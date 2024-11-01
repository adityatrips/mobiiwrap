"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import authSlice from "./authSlice";
import themeSlice from "./themeSlice";
import { createPersistStorage } from "./storage";

const storage = createPersistStorage();

const persistConfig = {
  key: "root",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice);
const persistedThemeReducer = persistReducer(persistConfig, themeSlice);

export const store = configureStore({
  reducer: combineReducers({
    auth: persistedAuthReducer,
    theme: persistedThemeReducer,
  }),
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
