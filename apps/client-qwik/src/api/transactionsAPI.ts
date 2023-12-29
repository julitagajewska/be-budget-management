/* eslint-disable qwik/loader-location */
import { routeAction$, routeLoader$ } from '@builder.io/qwik-city'
import { baseUrl, temporaryId } from './apiSettings'
import type { TransactionDTO } from 'shared-types'

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

export const useAddTransaction = routeAction$(async (transactionData) => {
  try {
    const response = await fetch(`${baseUrl}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...transactionData, user: temporaryId })
    })

    if (!response.ok) {
      throw new Error('Failed to create transaction. Network response was not ok.')
    }

    const createdTransaction = await response.json()
    return createdTransaction
  } catch (error) {
    console.error('Error creating transaction:', error)
    throw error
  }
})

export const useEditTransaction = routeAction$(async (updatedData) => {
  try {
    const response = await fetch(`${baseUrl}/transactions/${updatedData._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    })

    if (!response.ok) {
      throw new Error('Failed to edit transaction. Network response was not ok.')
    }

    const updatedTransaction = await response.json()
    return updatedTransaction
  } catch (error) {
    console.error('Error editing transaction:', error)
    throw error
  }
})

export const useDeleteTransaction = routeAction$(async (data) => {
  try {
    const response = await fetch(`${baseUrl}/transactions/${data.id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error('Failed to delete transaction. Network response was not ok.')
    }

    console.log(`Transaction with ID ${data.id} deleted successfully.`)
  } catch (error) {
    console.error('Error deleting transaction:', error)
    throw error
  }
})
