import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DUMMYJSON_BASE_URL } from "./constants";

type TokenState = {
    auth: {
        token: string | null;
    };
};

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: DUMMYJSON_BASE_URL,
        prepareHeaders: (headers, api) => {
            const state = api.getState() as TokenState;
            const token = state.auth.token;
            if (token) headers.set("Authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: () => ({}),
});