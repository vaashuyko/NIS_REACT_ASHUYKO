import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SettingsState, Theme, Language } from "./types";
import { readSettings, writeSettings } from "./storage";

const INITIAL_STATE: SettingsState = readSettings();

const settingsSlice = createSlice({
    name: "settings",
    initialState: INITIAL_STATE,
    reducers: {
        setTheme: (state, action: PayloadAction<Theme>) => {
            state.theme = action.payload;
            writeSettings({ ...state });
        },
        setLanguage: (state, action: PayloadAction<Language>) => {
            state.language = action.payload;
            writeSettings({ ...state });
        },
        setProductsPageSize: (state, action: PayloadAction<number>) => {
            state.productsPageSize = action.payload;
            writeSettings({ ...state });
        },
    },
});

export const { setTheme, setLanguage, setProductsPageSize } = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;