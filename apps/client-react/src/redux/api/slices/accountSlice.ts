import { apiSlice } from '../apiSlice'
import { AccountDTO } from 'shared-types'

type RequestParams = {
  id: string | undefined
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsersAccounts: builder.query<AccountDTO[], RequestParams>({
      query: (params: RequestParams) => {
        // Here go request params modifiers
        return `accounts?userId=${params.id}`
      },
      transformResponse: (response: any) => {
        let dto: AccountDTO[] = response.map((a: any) => {
          let account: AccountDTO = {
            _id: a._id,
            user: a.userId,
            category: a.categoryId,
            name: a.name,
            balance: a.balance
          }
          return account
        })
        return dto
      },
      providesTags: () => [{ type: 'ACCOUNT', id: 'ACCOUNT' }]
    }),
    getAccount: builder.query<AccountDTO, RequestParams>({
      query: (params: { id: string }) => {
        // Here go request params modifiers
        return `accounts/${params.id}`
      },
      transformResponse: (response: AccountDTO) => {
        // Here go response modifiers
        return response
      },
      providesTags: () => [{ type: 'ACCOUNT', id: 'ACCOUNT' }]
    }),
    createAccount: builder.mutation({
      query: (account: Partial<AccountDTO>) => ({
        url: '/accounts',
        method: 'POST',
        body: account
      }),
      invalidatesTags: () => [{ type: 'ACCOUNT', id: 'ACCOUNT' }]
    }),
    editAccount: builder.mutation({
      query: (account: Partial<AccountDTO>) => ({
        url: `/accounts/${account._id}`,
        method: 'PUT',
        body: account
      }),
      invalidatesTags: () => [{ type: 'ACCOUNT', id: 'ACCOUNT' }]
    }),
    deleteAccount: builder.mutation({
      query: (id: string) => ({
        url: `/accounts/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: () => [{ type: 'ACCOUNT', id: 'ACCOUNT' }]
    })
  })
})

export const {
  useGetUsersAccountsQuery,
  useGetAccountQuery,
  useCreateAccountMutation,
  useEditAccountMutation,
  useDeleteAccountMutation
} = extendedApiSlice
