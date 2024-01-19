import { apiSlice } from '../apiSlice'
import { TransactionDTO } from 'shared-types'

type RequestParams = {
  id: string | undefined
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<TransactionDTO, RequestParams>({
      query: (params: { id: string }) => {
        // Here go request params modifiers
        return `users/${params.id}`
      },
      transformResponse: (response: TransactionDTO) => {
        // Here go response modifiers
        return response
      },
      providesTags: () => [{ type: 'USER', id: 'USER' }]
    }),
    editUser: builder.mutation({
      query: (category: Partial<TransactionDTO>) => ({
        url: `/users/${category._id}`,
        method: 'PTACH',
        body: category
      }),
      invalidatesTags: () => [{ type: 'USER', id: 'USER' }]
    }),
    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `/users/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: () => [{ type: 'USER', id: 'USER' }]
    })
  })
})

export const { useGetUserQuery, useEditUserMutation, useDeleteUserMutation } = extendedApiSlice
