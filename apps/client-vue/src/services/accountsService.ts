import { CategoryDTO, TransactionDTO } from 'shared-types'
import api from './api.ts'

export default {
  getAccountsTransactions: async function (
    id: string,
    accountId: string
  ): Promise<TransactionDTO[]> {
    try {
      let transactions = await api.transactions.getUsersTransactions(id)

      return transactions.filter((t) => t.accountId === accountId)
    } catch (error) {
      console.error("Error fetching acount's transactions:", error)
      throw error
    }
  },
  getAccountsCategories: async function (id: string): Promise<CategoryDTO[]> {
    try {
      let categories = await api.categories.getUsersCategories(id)

      return categories.filter((c) => c.categoryType === 'ACCOUNT')
    } catch (error) {
      console.error('Error fetching accounts categories:', error)
      throw error
    }
  }
}
