import { apiSlice } from '../apiSlice'
import { TransactionDTO } from 'shared-types'

type RequestParams = {
  id: string | undefined
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsersTransactions: builder.query<TransactionDTO[], RequestParams>({
      query: (params: RequestParams) => {
        // Here go request params modifiers
        return `transactions?userId=${params.id}`
      },
      transformResponse: (response: TransactionDTO[]) => {
        // Here go response modifiers
        return response
      },
      providesTags: () => [{ type: 'ACCOUNT', id: 'ACCOUNT' }]
    }),
    getTransaction: builder.query<TransactionDTO, RequestParams>({
      query: (params: { id: string }) => {
        // Here go request params modifiers
        return `transactions/${params.id}`
      },
      transformResponse: (response: TransactionDTO) => {
        // Here go response modifiers
        return response
      },
      providesTags: () => [{ type: 'ACCOUNT', id: 'ACCOUNT' }]
    }),
    createTransaction: builder.mutation({
      query: (transaction: Partial<TransactionDTO>) => ({
        url: '/transactions',
        method: 'POST',
        body: transaction
      }),
      invalidatesTags: () => [{ type: 'ACCOUNT', id: 'ACCOUNT' }]
    }),
    editTransaction: builder.mutation({
      query: (transaction: Partial<TransactionDTO>) => ({
        url: `/transactions/${transaction._id}`,
        method: 'PTACH',
        body: transaction
      }),
      invalidatesTags: () => [{ type: 'ACCOUNT', id: 'ACCOUNT' }]
    }),
    deleteTransaction: builder.mutation({
      query: (id: string) => ({
        url: `/transactions/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: () => [{ type: 'ACCOUNT', id: 'ACCOUNT' }]
    })
  })
})

export const {
  useGetUsersTransactionsQuery,
  useGetTransactionQuery,
  useCreateTransactionMutation,
  useEditTransactionMutation,
  useDeleteTransactionMutation
} = extendedApiSlice
