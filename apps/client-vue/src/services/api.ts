import { AccountDTO, CategoryDTO, TransactionDTO } from 'shared-types'

const temporaryId = '65b2ea6dff8304ca54139790'
const baseUrl = 'http://localhost:8080'

export default {
  transactions: {
    createTransaction: async function (transactionData: Partial<TransactionDTO>) {
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
    },
    editTransaction: async function (updatedData: Partial<TransactionDTO>) {
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
    },
    deleteTransaction: async function (id: string) {
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
    },
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
    },
    editAccount: async function (updatedData: Partial<AccountDTO>): Promise<AccountDTO | void> {
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
    },
    createCategory: async function (categoryData: Partial<CategoryDTO>): Promise<CategoryDTO> {
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

        const createdCategory = await response.json()
        return createdCategory
      } catch (error) {
        console.error('Error creating category:', error)
        throw error
      }
    },
    deleteCategory: async function (id: string): Promise<void> {
      try {
        const response = await fetch(`${baseUrl}/categories/${id}`, {
          method: 'DELETE'
        })

        if (!response.ok) {
          throw new Error('Network response was not ok.')
        }

        console.log(`Category with ID ${id} deleted successfully.`)
      } catch (error) {
        console.error('Error deleting category:', error)
        throw error
      }
    },
    editCategory: async function (updatedData: Partial<CategoryDTO>): Promise<CategoryDTO | void> {
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
    }
  }
}
