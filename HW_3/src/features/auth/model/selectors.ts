import type { AuthState } from "./types";

type AuthRootState = {
    auth: AuthState;
};

export const selectToken = (state: AuthRootState) => state.auth.token;
export const selectIsAuthenticated = (state: AuthRootState) => Boolean(state.auth.token);

export const selectAuthUser = (state: AuthRootState) => state.auth.user;
export const selectAuthStatus = (state: AuthRootState) => state.auth.status;