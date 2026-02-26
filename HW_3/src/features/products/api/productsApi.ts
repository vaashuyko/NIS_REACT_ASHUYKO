import { baseApi } from "../../../shared/api/baseApi";
import type { Product, ProductsResponse } from "../../../entities/product/model/types";

export type GetProductsArgs = {
    limit: number;
    skip: number;
};

export type SearchProductsArgs = {
    q: string;
    limit: number;
    skip: number;
};

export const productsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query<ProductsResponse, GetProductsArgs>({
            query: ({ limit, skip }) => ({
                url: "/products",
                method: "GET",
                params: { limit, skip },
            }),
        }),
        getProductById: build.query<Product, number>({
            query: (id) => ({
                url: `/products/${id}`,
                method: "GET",
            }),
        }),
        searchProducts: build.query<ProductsResponse, SearchProductsArgs>({
            query: ({ q, limit, skip }) => ({
                url: "/products/search",
                method: "GET",
                params: { q, limit, skip },
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useSearchProductsQuery,
} = productsApi;