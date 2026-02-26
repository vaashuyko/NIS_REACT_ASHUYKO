import type { User } from "../../../entities/user/model/types";

export type AuthStatus = "idle" | "loading" | "authorized" | "error";

export type AuthState = {
    token: string | null;
    user: User | null;
    status: AuthStatus;
};