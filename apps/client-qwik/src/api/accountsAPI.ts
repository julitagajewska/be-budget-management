import type { AccountDTO } from 'shared-types'
import { baseUrl, temporaryId } from './apiSettings'
import { routeAction$, routeLoader$ } from '@builder.io/qwik-city'

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

export const useAddAccount = routeAction$(async (accountData: Partial<AccountDTO>) => {
  await fetch(`${baseUrl}/accounts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...accountData, user: temporaryId })
  })
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
