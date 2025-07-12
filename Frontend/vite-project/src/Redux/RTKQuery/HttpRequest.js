import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseHttpRequest = createApi({
  reducerPath: 'App',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      return headers
    },
    credentials: 'include'
  }),
  endpoints: (builder) => ({
    baseQuery: builder.query({
      query: ({ endpoint, params, method = 'GET' }) => ({
        url: endpoint,
        method: method,
        params: params
      }),
      transformResponse: ({ data, response }) => {
        return { response, data }
      },
      transformErrorResponse: ({ data, ...response }) => {
        return { ...data, ...response }
      }
    }),
    baseMutation: builder.mutation({
      query: ({ endpoint, method, body }) => ({
        url: endpoint,
        method: method,
        body: body
      }),
      transformResponse: ({ data, ...response }) => {
        return { ...response, ...data }
      },
      transformErrorResponse: ({ data, ...response }) => {
        return { ...data, ...response }
      }
    })
  })
})

export const { useBaseQueryQuery, useBaseMutationMutation } = baseHttpRequest

/*
*  const [payload, response ] = useBaseMutationMutation()
*-------response-------------
*   {
    "status": "uninitialized",
      "isUninitialized": true,
      "isLoading": false,
      "isSuccess": false,
      "isError": false
  }

* -------payload-------------
* onSubmit: async (values) => {
        await payload({
          endpoint: API_ENDPOINTS.SIGNUP,
          method: 'POST',
          body: values
        })
      }
      *
      *
      *
      * const { data, error, isLoading } = useFetchDataQuery({ endpoint: '/users', params: { id: 1 } });
      * const [postData, { data, error, isLoading }] = usePostDataMutation();
* */
