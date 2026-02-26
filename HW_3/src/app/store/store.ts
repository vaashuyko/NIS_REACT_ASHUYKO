import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../../features/auth";
import { settingsReducer } from "../../features/settings";
import { baseApi } from "../../shared/api/baseApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        settings: settingsReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});