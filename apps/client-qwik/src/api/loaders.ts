/* eslint-disable qwik/loader-location */
import { routeAction$, routeLoader$ } from '@builder.io/qwik-city'
import type { AccountDTO, CategoryDTO, TransactionDTO } from 'shared-types'

const temporaryId = '6546a20d7b908bebe9ec9ad4'
const baseUrl = 'http://localhost:8080'

export const useUsersTransactions = routeLoader$(async () => {
  try {
    const response = await fetch(`${baseUrl}/transactions?userId=${temporaryId}`)
    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }
    const data: TransactionDTO[] = await response.json()

    return data
  } catch (error) {
    console.error('Error fetching user transactions:', error)
    throw error
  }
})

export const useAccounts = routeLoader$(async () => {
  // This code runs only on the server, after every navigation
  try {
    const response = await fetch(`${baseUrl}/accounts?userId=${temporaryId}`)
    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }
    const accounts = await response.json()
    return accounts as AccountDTO[]
  } catch (error) {
    console.error('Error fetching user account:', error)
    throw error
  }
})

export const useGetAccountById = routeLoader$(async (requestEvent) => {
  try {
    const response = await fetch(`${baseUrl}/accounts/${requestEvent.params.id}`)
    if (!response.ok) {
      // throw requestEvent.redirect(301, '/accounts')
    }
    const data: AccountDTO = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching user account:', error)
    throw error
  }
})

export const useEditAccount = routeAction$(async (updatedData: Partial<AccountDTO>) => {
  try {
    const response = await fetch(`${baseUrl}/accounts/${updatedData._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    })

    if (!response.ok) {
      throw new Error('Failed to update account. Network response was not ok.')
    }

    const updatedAccount = await response.json()
    return updatedAccount
  } catch (error) {
    console.error('Error updating user account:', error)
    throw error
  }
})

export const useAddAccount = routeAction$(async (accountData: Partial<AccountDTO>) => {
  console.log(accountData)

  const response = await fetch(`${baseUrl}/accounts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...accountData, user: temporaryId })
  })

  const createdAccount = await response.json()

  console.log(createdAccount)
})

export const useDeleteAccount = routeAction$(async (_, requestEvent) => {
  try {
    const response = await fetch(`${baseUrl}/accounts/${requestEvent.params.id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      // throw requestEvent.redirect(301, '../accounts')
    }
    // requestEvent.redirect(301, '../accounts')
  } catch (error) {
    console.error('Error deleting user account:', error)
    throw error
  }
})

export const useDeleteTransaction = routeAction$(async (id) => {
  try {
    const response = await fetch(`${baseUrl}/transactions/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error('Failed to delete transaction. Network response was not ok.')
    }

    console.log(`Transaction with ID ${id} deleted successfully.`)
  } catch (error) {
    console.error('Error deleting transaction:', error)
    throw error
  }
})

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
