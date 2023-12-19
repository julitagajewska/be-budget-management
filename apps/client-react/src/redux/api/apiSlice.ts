import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080',
  prepareHeaders: (headers, { getState }) => {
    // Here goes automatic token assignment to each request
  },
})

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  tagTypes: ['USER', 'CATEGORY', 'ACCOUNT', 'TRANSACTION'],
  endpoints: builder => ({}),
})

