import React from 'react'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseHttpRequest = createApi({
  reducerPath: 'App',
  baseQuery: fetchBaseQuery({
    baseUrl: ''
  }),
  endpoints: (builder) => ({
    baseQuery: builder.query({
      query: ({ endpoint, params, method = 'GET' }) => ({
        url: endpoint,
        method: method,
        params: params
      })
    }),
    baseMutation: (builder) => ({
      query: ({ endpoint, body, method }) => ({
        url: endpoint,
        method: method,
        body: body
      })
    })
  })
})

const { useBaseQueryQuery, useBaseMutationMutation } = baseHttpRequest
