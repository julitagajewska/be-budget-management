import type { QwikChangeEvent } from '@builder.io/qwik'
import { component$, useStore, $, useSignal, useTask$ } from '@builder.io/qwik'
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
import { FilterTransactionsMenu } from '~/components/menu/FilterTransactionsMenu'
import type { TransactionDTO } from 'shared-types'
import { SummaryDoughnut } from '~/components/charts/accounts/SummaryDoughnut'
import { TransactionsBarChart } from '~/components/charts/accounts/TransactionsBarChart'
import { TransactionsDoughnutChart } from '~/components/charts/accounts/TransactionsDoughnutChart'
import { baseUrl, temporaryId } from '~/api/apiSettings'

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

type AccountPageState = {
  deleteAccountModalOpen: boolean
  editAccountModalOpen: boolean
  filteringMenuOpen: boolean
  addTransactionModalOpen: boolean
  deleteTransactionModalOpen: boolean
  editTransactionModalOpen: boolean
  filterTransactionsMenuOpen: boolean
  filteredTransactions: TransactionDTO[]
  searchedTransactions: TransactionDTO[]
  searchInput: string
  debouncedSearchInput: string
}

const AccountPage = component$(() => {
  const navigate = useNavigate()
  const account = useGetAccountById()
  const transactions = useUsersTransactions().value.filter((t) => t.accountId === account.value._id)
  const allCategories = useCategories()

  console.log(transactions)

  const incomesSum = useSignal<number>(
    transactions.filter((t) => !t.isExpense).reduce((prev, curr) => prev + curr.value, 0)
  )

  const expensesSum = useSignal<number>(
    transactions.filter((t) => t.isExpense).reduce((prev, curr) => prev + curr.value, 0)
  )

  const startDate = useSignal('2023-12-01')
  const endDate = useSignal('2024-03-01')

  const selectedTransactionType = useSignal<'INCOMES' | 'EXPENSES' | 'BOTH'>('INCOMES')
  const selectedDataType = useSignal<'SUM' | 'COUNT'>('SUM')
  const selectedChartType = useSignal<'DOUGHNUT' | 'BAR'>('BAR')

  const state = useStore<AccountPageState>({
    deleteAccountModalOpen: false,
    editAccountModalOpen: false,
    filteringMenuOpen: true,
    addTransactionModalOpen: false,
    deleteTransactionModalOpen: false,
    editTransactionModalOpen: false,
    filterTransactionsMenuOpen: true,
    filteredTransactions: transactions,
    searchedTransactions: transactions,
    searchInput: '',
    debouncedSearchInput: ''
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

  const getCategoryName = (categoryId: string) => {
    console.log(`Category ID: ${categoryId}`)
    return allCategories.value.find((c) => c.id === categoryId)?.name
  }

  const handleReturn = $(() => {
    navigate('/accounts')
  })

  const handleSetVisibleTransactions = $((filteredTransactions: TransactionDTO[]) => {
    state.filteredTransactions = filteredTransactions
  })

  const handleSearch = $((transactions: TransactionDTO[], searchInput: string) => {
    if (searchInput) {
      const searchTerm = searchInput.trim().toLowerCase()

      return transactions.filter((transaction) => {
        const { title, recipient } = transaction

        const titleMatch = title.toLowerCase().includes(searchTerm)
        const recipientMatch = recipient.toLowerCase().includes(searchTerm)

        return titleMatch || recipientMatch
      })
    } else {
      return transactions
    }
  })

  const searchInput = useSignal('')
  const debouncedSearchInput = useSignal('')

  // DEBOUNCED SEARCH
  useTask$(({ track, cleanup }) => {
    track(() => searchInput.value)

    const debounced = setTimeout(async () => {
      debouncedSearchInput.value = searchInput.value
      state.searchedTransactions = await handleSearch(
        state.filteredTransactions,
        debouncedSearchInput.value
      )
    }, 500)
    cleanup(() => clearTimeout(debounced))
  })

  // UN-DEBOUNCED FILTER
  useTask$(async ({ track }) => {
    track(() => state.filteredTransactions)
    debouncedSearchInput.value = searchInput.value
    state.searchedTransactions = await handleSearch(
      state.filteredTransactions,
      debouncedSearchInput.value
    )
  })

  useTask$(async ({ track }) => {
    track(() => transactions)
    console.log('Refetched')
  })

  const handleTransationTypeSelection = $((e: QwikChangeEvent<HTMLInputElement>) => {
    if (
      e.target.value === 'INCOMES' ||
      e.target.value === 'EXPENSES' ||
      e.target.value === 'BOTH'
    ) {
      selectedTransactionType.value = e.target.value
    }
  })

  const handleDataTypeSelection = $((e: QwikChangeEvent<HTMLInputElement>) => {
    if (e.target.value === 'SUM' || e.target.value === 'COUNT') {
      selectedDataType.value = e.target.value
    }
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
              {allCategories.value.find((c) => c.id === account.value.category)?.name}
            </span>
          </div>

          <div class="pl-4">
            <h3 class="font-semibold text-background-700">Bilans</h3>
            <span class="text-background-600">{account.value.balance} zł</span>
          </div>
        </div>

        <div class="flex flex-col w-1/2 gap-2 justify-between">
          <h2 class="text-md font-semibold text-background-700">Podsumowanie liczbowe</h2>

          <SummaryDoughnut transactions={transactions} />

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

      <div class="flex flex-row items-start justify-between">
        <div class="flex flex-col w-1/2 gap-3">
          <h2 class="text-md font-semibold text-background-700">Opcje wykresu</h2>

          <div class="flex flex-col pl-4 gap-1">
            <h3 class="font-semibold text-background-700">Rodzaj transakcji</h3>
            <div class="flex flex-row gap-4">
              <label class="flex flex-row gap-2 items-center text-sm text-background-600 w-20">
                <input
                  type="radio"
                  name="transaction-type"
                  value="INCOMES"
                  checked={selectedTransactionType.value === 'INCOMES'}
                  onChange$={handleTransationTypeSelection}
                />
                Dochody
              </label>
              <label class="flex flex-row gap-2 items-center text-sm text-background-600 w-20">
                <input
                  type="radio"
                  name="transaction-type"
                  value="EXPENSES"
                  checked={selectedTransactionType.value === 'EXPENSES'}
                  onChange$={handleTransationTypeSelection}
                />
                Wydatki
              </label>
              <label class="flex flex-row gap-2 items-center text-sm text-background-600 w-20">
                <input
                  type="radio"
                  name="transaction-type"
                  value="BOTH"
                  checked={selectedTransactionType.value === 'BOTH'}
                  onChange$={handleTransationTypeSelection}
                />
                Wszystkie
              </label>
            </div>
          </div>

          <div class="flex flex-col pl-4 gap-1">
            <h3 class="font-semibold text-background-700">Rodzaj danych</h3>
            <div class="flex flex-row gap-4">
              <label class="flex flex-row gap-2 items-center text-sm text-background-600 w-20">
                <input
                  type="radio"
                  name="data-type"
                  value="SUM"
                  checked={selectedDataType.value === 'SUM'}
                  onChange$={handleDataTypeSelection}
                />{' '}
                Suma
              </label>
              <label class="flex flex-row gap-2 items-center text-sm text-background-600 w-20">
                <input
                  type="radio"
                  name="data-type"
                  value="COUNT"
                  checked={selectedDataType.value === 'COUNT'}
                  onChange$={handleDataTypeSelection}
                />
                Liczba
              </label>
            </div>
          </div>

          <div class="flex flex-col pl-4 gap-1">
            <h3 class="font-semibold text-background-700">Przedział czasowy</h3>
            <div class="flex flex-row gap-4 w-2/3">
              <div class="flex flex-col w-1/2">
                <label class="text-sm text-background-600"> Początek </label>
                <input type="date" name="date-start" class="w-full" bind:value={startDate} />
              </div>
              <div class="flex flex-col w-1/2">
                <label class="text-sm text-background-600"> Koniec </label>
                <input type="date" name="date-end" class="w-full" bind:value={endDate} />
              </div>
            </div>
          </div>

          <div class="flex flex-col pl-4 gap-1">
            <h3 class="font-semibold text-background-700">Rodzaj wykresu</h3>
            <div class="flex flex-row gap-4 w-2/3">
              <select
                name="chart-type"
                id="chart-type-select"
                class="w-full"
                bind:value={selectedChartType}
              >
                <option value="DOUGHNUT">Wykres kołowy</option>
                <option value="BAR">Wykres słupkowy</option>
              </select>
            </div>
          </div>
        </div>

        <div class="flex flex-col w-1/2 gap-2 justify-between">
          <h2 class="text-md font-semibold text-background-700">Podsumowanie liczbowe</h2>

          {selectedChartType.value === 'BAR' ? (
            <TransactionsBarChart
              transactions={transactions}
              dataType={selectedDataType.value}
              transactionType={selectedTransactionType.value}
              startDate={startDate.value}
              endDate={endDate.value}
            />
          ) : (
            <TransactionsDoughnutChart
              transactions={transactions}
              categories={allCategories.value}
              dataType={selectedDataType.value}
              transactionType={selectedTransactionType.value}
              startDate={startDate.value}
              endDate={endDate.value}
            />
          )}

          <div class="w-full flex flex-row justify-center items-center gap-4"></div>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <h3 class="font-semibold text-background-700">Lista transakcji</h3>
        <div class="w-full h-full flex flex-row justify-between gap-6">
          <div>
            {/* <FilterTransactionsMenu
              open={state.filterTransactionsMenuOpen}
              transactions={transactions}
              categories={allCategories.value}
              setVisibleTransactions={handleSetVisibleTransactions}
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
            {/* <input
              type="text"
              class="w-full"
              placeholder="Wyszukaj transakcję ..."
              bind:value={searchInput}
            /> */}
            <span>{searchInput.value}</span>
            <span>{debouncedSearchInput.value}</span>
            <table>
              <thead>
                <th colSpan={2}>Status</th>
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
                    categoryName={getCategoryName(t.categoryId) || ''}
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
