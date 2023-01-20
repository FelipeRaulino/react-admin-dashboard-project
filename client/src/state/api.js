import { createApi, fetchBaseQuery, } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "adminApi",
  tagTypes: ["User", "Products", "Customers",],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_REACT_APP_BASE_URL, },),
  endpoints: (build,) => ({
    getUserById: build.query({
      query: (id,) => `/general/user/${id}`,
      providesTags: "User",
    },),
    getProducts: build.query({
      query: () => "/client/products",
      providesTags: "Products",
    },),
    getCustomers: build.query({
      query: () => "/client/customers",
      providesTags: "Customers",
    },),
  }),
},);

export const { useGetUserByIdQuery, useGetProductsQuery, useGetCustomersQuery, } = api;