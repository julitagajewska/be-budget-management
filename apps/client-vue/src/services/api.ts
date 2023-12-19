import { AccountDTO, CategoryDTO, TransactionDTO } from 'shared-types'

const temporaryId = '6546a20d7b908bebe9ec9ad4'
const baseUrl = 'http://localhost:8080'

export default {
  transactions: {
    getUsersTransactions: async function (id: string): Promise<TransactionDTO[]> {
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
    }
  },
  accounts: {
    getAccountById: async function (id: string): Promise<AccountDTO> {
      try {
        const response = await fetch(`${baseUrl}/accounts/${id}`)
        if (!response.ok) {
          throw new Error('Network response was not ok.')
        }
        const data: AccountDTO = await response.json()
        return data
      } catch (error) {
        console.error('Error fetching user account:', error)
        throw error
      }
    },
    getUsersAccounts: async function (id: string): Promise<AccountDTO[]> {
      try {
        const response = await fetch(`${baseUrl}/accounts?userId=${temporaryId}`)
        if (!response.ok) {
          throw new Error('Network response was not ok.')
        }
        const data: AccountDTO[] = await response.json()
        return data
      } catch (error) {
        console.error('Error fetching user accounts:', error)
        throw error
      }
    },
    createAccount: async function (accountData: Partial<AccountDTO>) {
      try {
        const response = await fetch(`${baseUrl}/accounts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...accountData, user: temporaryId })
        })

        if (!response.ok) {
          throw new Error('Failed to create account. Network response was not ok.')
        }

        const createdAccount = await response.json()
        return createdAccount
      } catch (error) {
        console.error('Error creating user account:', error)
        throw error
      }
    },
    deleteAccount: async function (id: string): Promise<void> {
      try {
        const response = await fetch(`${baseUrl}/accounts/${id}`, {
          method: 'DELETE'
        })

        if (!response.ok) {
          throw new Error('Network response was not ok.')
        }

        console.log(`Account with ID ${id} deleted successfully.`)
      } catch (error) {
        console.error('Error deleting user account:', error)
        throw error
      }
    }
  },
  categories: {
    getUsersCategories: async function (id: string): Promise<CategoryDTO[]> {
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
    }
  }
}
