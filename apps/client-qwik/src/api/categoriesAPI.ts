/* eslint-disable qwik/loader-location */
import { routeAction$, routeLoader$ } from '@builder.io/qwik-city'
import type { CategoryDTO } from 'shared-types'
import { baseUrl, temporaryId } from './apiSettings'

export const useCategories = routeLoader$(async () => {
  try {
    const response = await fetch(`${baseUrl}/categories?userId=${temporaryId}`)
    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }
    const data: any[] = await response.json()
    const transformedData: CategoryDTO[] = data.map((c: any) => ({
      id: c._id,
      user: c.user,
      categoryType: c.categoryType,
      name: c.name
    }))

    return transformedData
  } catch (error) {
    console.error('Error fetching user categories:', error)
    throw error
  }
})

export const useAddCategory = routeAction$(async (categoryData) => {
  try {
    const response = await fetch(`${baseUrl}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...categoryData, user: temporaryId })
    })

    if (!response.ok) {
      throw new Error('Failed to create category. Network response was not ok.')
    }

    console.log(response)
    const createdCategory = await response.json()
    return createdCategory
  } catch (error) {
    console.error('Error creating category:', error)
    throw error
  }
})

export const useEditCategory = routeAction$(async (updatedData) => {
  try {
    const response = await fetch(`${baseUrl}/categories/${updatedData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    })

    if (!response.ok) {
      throw new Error('Failed to update category. Network response was not ok.')
    }

    const updatedCategory = await response.json()
    return updatedCategory
  } catch (error) {
    console.error('Error updating category:', error)
    throw error
  }
})

export const useDeleteCategory = routeAction$(async (data) => {
  try {
    const response = await fetch(`${baseUrl}/categories/${data.id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }

    console.log(`Category with ID ${data.id} deleted successfully.`)
  } catch (error) {
    console.error('Error deleting category:', error)
    throw error
  }
})
