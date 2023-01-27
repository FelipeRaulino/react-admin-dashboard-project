import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "adminApi",
  tagTypes: ["User", "Products", "Customers", "Transaction", "Geography", "Sales", "Admin"],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_REACT_APP_BASE_URL }),
  endpoints: (build) => ({
    getUserById: build.query({
      query: (id) => `/general/user/${id}`,
      providesTags: "User",
    }),
    getProducts: build.query({
      query: () => "/client/products",
      providesTags: "Products",
    }),
    getCustomers: build.query({
      query: () => "/client/customers",
      providesTags: "Customers",
    }),
    getTransactions: build.query({
      query: ({
        page, pageSize, sort, search,
      }) => ({
        url: "/client/transactions",
        method: "GET",
        params: {
          page,
          pageSize,
          sort,
          search,
        },
      }),
      providesTags: "Transaction",
    }),
    getGeography: build.query({
      query: () => "/client/geography",
      providesTags: "Geography",
    }),
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: "Sales",
    }),
    getAdmins: build.query({
      query: () => "/management/admins",
      providesTags: "Admin",
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
} = api;
