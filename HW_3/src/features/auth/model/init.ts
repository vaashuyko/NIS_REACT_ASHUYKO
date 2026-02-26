import type { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
import { logout, setStatus, setUser } from "./slice";

type AppDispatchLike = ThunkDispatch<unknown, unknown, UnknownAction>;

const UNAUTHORIZED_STATUS = 401;

const getStatusCode = (e: unknown): number | null => {
    if (!e || typeof e !== "object") return null;
    if (!("status" in e)) return null;
    const s = (e as { status?: unknown }).status;
    return typeof s === "number" ? s : null;
};

export const initAuth = async (dispatch: AppDispatchLike): Promise<void> => {
    dispatch(setStatus("loading"));

    try {
        const user = await dispatch(authApi.endpoints.me.initiate()).unwrap();
        dispatch(setUser(user));
    } catch (e) {
        const status = getStatusCode(e);
        if (status === UNAUTHORIZED_STATUS) {
            dispatch(logout());
            return;
        }
        dispatch(setStatus("error"));
    }
};