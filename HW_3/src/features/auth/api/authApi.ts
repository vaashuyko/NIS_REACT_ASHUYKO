import { baseApi } from "../../../shared/api/baseApi";
import type { User } from "../../../entities/user/model/types";

export type LoginRequest = {
    username: string;
    password: string;
    expiresInMins?: number;
};

export type LoginResponse = {
    accessToken: string;
    refreshToken?: string;
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender?: string;
    image?: string;
};

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<LoginResponse, LoginRequest>({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body,
            }),
        }),
        me: build.query<User, void>({
            query: () => ({
                url: "/auth/me",
                method: "GET",
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useLoginMutation, useMeQuery, useLazyMeQuery } = authApi;