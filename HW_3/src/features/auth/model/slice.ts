import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, AuthStatus } from "./types";
import { readToken, writeToken } from "./storage";
import type { User } from "../../../entities/user";

const tokenFromStorage = readToken();

const INITIAL_STATE: AuthState = {
    token: tokenFromStorage,
    user: null,
    status: tokenFromStorage ? "loading" : "idle",
};

const authSlice = createSlice({
    name: "auth",
    initialState: INITIAL_STATE,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            writeToken(action.payload);
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.status = "authorized";
        },
        setStatus: (state, action: PayloadAction<AuthStatus>) => {
            state.status = action.payload;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.status = "idle";
            writeToken(null);
        },
    },
});

export const { setToken, setUser, setStatus, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;