import { apiSlice } from '../apiSlice'
import { CategoryDTO } from 'shared-types'

type RequestParams = {
  id: string | undefined
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsersCategories: builder.query<CategoryDTO[], RequestParams>({
      query: (params: RequestParams) => {
        // Here go request params modifiers
        return `categories?userId=${params.id}`
      },
      transformResponse: (response: any) => {
        let dto: CategoryDTO[] = response.map((c: any) => {
          let category: CategoryDTO = {
            id: c._id,
            user: c.user,
            categoryType: c.categoryType,
            name: c.name
          }
          return category
        })
        console.log(dto)
        return dto
      },
      providesTags: () => [{ type: 'CATEGORY', id: 'CATEGORY' }]
    }),
    getCategory: builder.query<CategoryDTO, RequestParams>({
      query: (params: { id: string }) => {
        // Here go request params modifiers
        return `categories/${params.id}`
      },
      transformResponse: (response: CategoryDTO) => {
        // Here go response modifiers
        return response
      },
      providesTags: () => [{ type: 'CATEGORY', id: 'CATEGORY' }]
    }),
    createCategory: builder.mutation({
      query: (category: Partial<CategoryDTO>) => ({
        url: '/categories',
        method: 'POST',
        body: category
      }),
      invalidatesTags: () => [{ type: 'CATEGORY', id: 'CATEGORY' }]
    }),
    editCategory: builder.mutation({
      query: (category: Partial<CategoryDTO>) => ({
        url: `/categories/${category.id}`,
        method: 'PUT',
        body: category
      }),
      invalidatesTags: () => [{ type: 'CATEGORY', id: 'CATEGORY' }]
    }),
    deleteCategory: builder.mutation({
      query: (id: string) => ({
        url: `/categories/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: () => [{ type: 'CATEGORY', id: 'CATEGORY' }]
    })
  })
})

export const {
  useGetUsersCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation
} = extendedApiSlice
