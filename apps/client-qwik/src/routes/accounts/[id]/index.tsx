import { component$, useStore, $, useSignal } from '@builder.io/qwik'
import { Button } from '~/components/buttons/Button'
import { DeleteAccountModal } from '~/components/modal/accounts/DeleteAccountModal'
import { EditAccountModal } from '~/components/modal/accounts/EditAccountModal'
import { ArrowLeft, Edit, Filter, Plus, Trash } from '~/icons'
import utils from 'shared-utils'
import { useGetAccountById } from '~/api/accountsAPI'
import { useUsersTransactions } from '~/api/transactionsAPI'
import { useCategories } from '~/api/categoriesAPI'
import { AddTransactionModal } from '~/components/modal/transactions/AddTransactionModal'
import { TransactionTableRow } from '~/components/table/TransactionTableRow'
import { useNavigate } from '@builder.io/qwik-city'

export { useGetAccountById, useDeleteAccount, useEditAccount } from '~/api/accountsAPI'
export {
  useUsersTransactions,
  useAddTransaction,
  useDeleteTransaction,
  useEditTransaction
} from '~/api/transactionsAPI'
export {
  useCategories,
  useAddCategory,
  useEditCategory,
  useDeleteCategory
} from '~/api/categoriesAPI'

const AccountPage = component$(() => {
  // // const id = useLocation().params.id
  const navigate = useNavigate()
  const account = useGetAccountById()
  const transactions = useUsersTransactions().value.filter((t) => t.accountId === account.value._id)
  const categories = useCategories().value.filter((c) => c.categoryType === 'ACCOUNT')

  const incomesSum = useSignal<number>(
    transactions.filter((t) => !t.isExpense).reduce((prev, curr) => prev + curr.value, 0)
  )

  const expensesSum = useSignal<number>(
    transactions.filter((t) => t.isExpense).reduce((prev, curr) => prev + curr.value, 0)
  )

  const state = useStore({
    deleteAccountModalOpen: false,
    editAccountModalOpen: false,
    filteringMenuOpen: true,
    addTransactionModalOpen: false,
    deleteTransactionModalOpen: false,
    editTransactionModalOpen: false
  })

  const handleOpenDeleteAccountModal = $(() => {
    state.deleteAccountModalOpen = true
  })

  const handleCloseDeleteAccountModal = $(() => {
    state.deleteAccountModalOpen = false
  })

  const handleOpenEditAccountModal = $(() => {
    state.editAccountModalOpen = true
  })

  const handleCloseEditAccountModal = $(() => {
    state.editAccountModalOpen = false
  })

  const handleToggleFilteringMenu = $(() => {
    state.filteringMenuOpen = !state.filteringMenuOpen
  })

  const handleOpenAddTransactionModal = $(() => {
    state.addTransactionModalOpen = true
  })

  const handleCloseAddTransactionModal = $(() => {
    state.addTransactionModalOpen = false
  })

  //    const handleOpenEditTransactionModal = $(() => {
  //   state.editTransactionModalOpen = true
  // })

  // const handleCloseEditTransactionModal = $(() => {
  //   state.editTransactionModalOpen = false
  // })

  //    const handleOpenDeleteTransactionModal = $(() => {
  //   state.deleteTransactionModalOpen = true
  // })

  // const handleCloseDeleteTransactionModal = $(() => {
  //   state.deleteTransactionModalOpen = false
  // })

  const handleReturn = $(() => {
    navigate('/accounts')
  })

  return (
    <div class="content-container gap-8">
      <div class="w-full flex flex-row justify-between items-center">
        <div class="flex flex-row gap-4 items-center">
          <Button color="neutral" onClick={handleReturn}>
            <ArrowLeft /> Powrót
          </Button>
          <h1 class="text-lg text-background-800 font-semibold">{account.value.name}</h1>
        </div>

        <div class="flex flex-row gap-4">
          <Button color="neutral" onClick={handleOpenDeleteAccountModal}>
            <Trash /> Usuń
          </Button>
          <Button color="primary" onClick={handleOpenEditAccountModal}>
            <Edit /> Edytuj
          </Button>
        </div>
      </div>

      <div class="flex flex-row items-start justify-between">
        <div class="flex flex-col w-1/2 gap-3">
          <h2 class="text-md font-semibold text-background-700">Informacje ogólne</h2>

          <div class="pl-4">
            <h3 class="font-semibold text-background-700">Nazwa</h3>
            <span class="text-background-600">{account.value.name}</span>
          </div>

          <div class="pl-4">
            <h3 class="font-semibold text-background-700">Kategoria konta</h3>
            <span class="text-background-600">
              {categories.find((c) => c.id === account.value.category)?.name}
            </span>
          </div>

          <div class="pl-4">
            <h3 class="font-semibold text-background-700">Bilans</h3>
            <span class="text-background-600">{account.value.balance} zł</span>
          </div>
        </div>

        <div class="flex flex-col w-1/2 gap-2 justify-between">
          <h2 class="text-md font-semibold text-background-700">Podsumowanie liczbowe</h2>

          {/* <SummaryDoughnut :transactions="transactions" /> */}

          <div class="w-full flex flex-row justify-center items-center gap-4">
            <div class="flex flex-col gap-1 w-48">
              <span class="text-sm text-background-600">Dochody</span>
              <div class="flex flex-row gap-2">
                <div class="w-4 h-4 rounded-[4px] bg-[#8dbe88]"></div>
                <span class="text-xs font-bold text-background-600">
                  {utils.formatCurrency(incomesSum.value)}
                </span>
              </div>
            </div>

            <div class="flex flex-col gap-1 w-48">
              <span class="text-sm text-background-600">Wydatki</span>
              <div class="flex flex-row gap-2">
                <div class="w-4 h-4 rounded-[4px] bg-[#e68080]"></div>
                <span class="text-xs font-bold text-background-600">
                  {utils.formatCurrency(expensesSum.value)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <h3 class="font-semibold text-background-700">Lista transakcji</h3>
        <div class="w-full h-full flex flex-row justify-between">
          <div>
            {/* <FilterTransactionsMenu
            :open="true"
            :transactions="transactions"
            :categories="categories"
            :set-visible-transactions="setFilteredTransactions"
          /> */}
          </div>
          <div class="w-full">
            <div class="flex flex-row justify-between items-center">
              <div class="flex flex-row items-center gap-4">
                <Button onClick={handleToggleFilteringMenu}>
                  <Filter class="text-base" />
                  <span>Filtruj</span>
                </Button>
                <label>
                  {' '}
                  <input type="checkbox" /> Pokaż szczegółowe dane{' '}
                </label>
              </div>
              <div>
                <Button onClick={handleOpenAddTransactionModal}>
                  <Plus class="text-base" />
                  <span>Dodaj transakcje</span>
                </Button>
              </div>
            </div>
            <input
              type="text"
              class="w-full"
              placeholder="Wyszukaj transakcję ..."
              v-model="searchInput"
            />
            <table>
              <thead>
                <th>Status</th>
                <th>Tytuł</th>
                <th>Data</th>
                <th>Odbiorca</th>
                <th>Opis</th>
                <th>Kategoria</th>
                <th>Kwota</th>
                <th>Akcja</th>
              </thead>

              <tbody>
                {transactions.map((t) => (
                  <TransactionTableRow
                    account={account.value}
                    key={`transaction-table-row-${t._id}`}
                    t={t}
                    categoryName={categories.find((c) => c.id === t.categoryId)?.name || '-'}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {state.addTransactionModalOpen && (
        <AddTransactionModal
          account={account.value}
          open={handleOpenAddTransactionModal}
          close={handleCloseAddTransactionModal}
        />
      )}

      {state.deleteAccountModalOpen && (
        <DeleteAccountModal
          account={account.value}
          open={handleOpenDeleteAccountModal}
          close={handleCloseDeleteAccountModal}
        />
      )}

      {state.editAccountModalOpen && (
        <EditAccountModal
          account={account.value}
          open={handleOpenEditAccountModal}
          close={handleCloseEditAccountModal}
        />
      )}
    </div>
  )
})

export default AccountPage
