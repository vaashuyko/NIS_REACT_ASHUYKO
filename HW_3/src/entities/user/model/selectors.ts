import type { User } from "./types";

type UserRootState = {
    auth: {
        user: User | null;
    };
};

export const selectUser = (state: UserRootState) => state.auth.user;

export const selectUserName = (state: UserRootState): string | null => {
    const u = state.auth.user;
    if (!u) return null;
    const full = `${u.firstName} ${u.lastName}`.trim();
    return full.length > 0 ? full : u.username;
};

export const selectUserEmail = (state: UserRootState) => state.auth.user?.email ?? null;