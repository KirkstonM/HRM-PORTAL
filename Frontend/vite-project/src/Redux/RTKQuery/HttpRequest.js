import React from 'react'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseHttpRequest = createApi({
  reducerPath: 'App',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/'
  }),
  endpoints: (builder) => ({
    baseQuery: builder.query({
      query: ({ endpoint, params, method = 'GET' }) => ({
        url: endpoint,
        method: method,
        params: params
      })
    }),
    baseMutation: builder.mutation({
      query: ({ endpoint, params, method }) => ({
        url: endpoint,
        method: method,
        params: params
      })
    })
  })
})

export const { useBaseQueryQuery, useBaseMutationMutation } = baseHttpRequest
