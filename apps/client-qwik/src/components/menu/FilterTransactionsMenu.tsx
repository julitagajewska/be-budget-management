import type { QRL } from '@builder.io/qwik'
import { $, component$, useSignal, useStore } from '@builder.io/qwik'
import type { TransactionDTO, CategoryDTO, TransactionStatus } from 'shared-types'
import { Button } from '../buttons/Button'

type FilterTransactionsMenuProps = {
  open: boolean
  transactions: TransactionDTO[]
  categories: CategoryDTO[]
  setVisibleTransactions: QRL<(transactions: TransactionDTO[]) => void>
}

type FilteringMenuState = {
  statuses: TransactionStatus[]
  dateFrom: string
  dateTo: string
  recipients: string[]
  categoryIds: string[]
  valueFrom: number
  valueTo: number
}

export const FilterTransactionsMenu = component$(
  ({ open, transactions, categories, setVisibleTransactions }: FilterTransactionsMenuProps) => {
    const transacitonCategoriesIDs = useSignal([...new Set(transactions.map((t) => t.categoryId))])
    const transactionCategories = useSignal(
      categories.filter((c) => transacitonCategoriesIDs.value.includes(c.id))
    )
    const allRecipients = useSignal([...new Set(transactions.map((t) => t.recipient))])

    const state = useStore<FilteringMenuState>({
      statuses: [],
      dateFrom: '',
      dateTo: '',
      recipients: [],
      categoryIds: [],
      valueFrom: 0,
      valueTo: 0
    })

    const filterTransactions = $(
      (transactions: TransactionDTO[], filters: FilteringMenuState): TransactionDTO[] => {
        return transactions.filter((transaction) => {
          const { status, date, recipient, categoryId, value } = transaction

          const { statuses, dateFrom, dateTo, recipients, categoryIds, valueFrom, valueTo } =
            filters

          // Check if transaction status is included in the filter
          if (statuses.length > 0 && !statuses.includes(status)) {
            return false
          }

          // Check if transaction date is within the specified range
          if ((date < dateFrom || date > dateTo) && (dateFrom !== '' || dateTo !== '')) {
            return false
          }

          // Check if transaction recipient is included in the filter
          if (recipients.length > 0 && !recipients.includes(recipient)) {
            return false
          }

          // Check if transaction categoryId is included in the filter
          if (categoryIds.length > 0 && !categoryIds.includes(categoryId)) {
            return false
          }

          // Check if transaction value is within the specified range
          if ((value < valueFrom || value > valueTo) && (valueFrom !== 0 || valueTo !== 0)) {
            return false
          }

          // All filters passed, include this transaction
          return true
        })
      }
    )

    const handleClear = $(() => {
      state.statuses = []
      state.dateFrom = ''
      state.dateTo = ''
      state.recipients = []
      state.categoryIds = []
      state.valueFrom = 0
      state.valueTo = 0

      setVisibleTransactions(transactions)
    })

    const handleFilter = $(async () => {
      const filteredTransactions = await filterTransactions(transactions, state)
      setVisibleTransactions(filteredTransactions)
    })

    const setTransactionStatus = $((e: Event) => {
      const value = (e.target as HTMLInputElement).value as TransactionStatus
      if (state.statuses.includes(value)) {
        state.statuses = state.statuses.filter((s) => s !== value)
      } else {
        state.statuses = [...state.statuses, value]
      }
    })

    const setRecipients = $((e: Event) => {
      const value = (e.target as HTMLInputElement).value as TransactionStatus
      if (state.recipients.includes(value)) {
        state.recipients = state.recipients.filter((s) => s !== value)
      } else {
        state.recipients = [...state.recipients, value]
      }
    })

    const setCategoryIds = $((e: Event) => {
      const value = (e.target as HTMLInputElement).value as TransactionStatus
      if (state.categoryIds.includes(value)) {
        state.categoryIds = state.categoryIds.filter((s) => s !== value)
      } else {
        state.categoryIds = [...state.categoryIds, value]
      }
    })

    return (
      <div
        class={`${
          open ? 'w-72 visible' : 'w-[0px] hidden'
        } transition-all duration-300 ease-in-out overflow-hidden h-full bg-white flex flex-col justify-between shadow-md rounded-md max-h-[500px] gap-4 py-6 pl-6 pr-3`}
      >
        <div class="flex flex-col gap-4 h-full overflow-auto">
          <h3 class="text-md font-semibold">Filtrowanie</h3>
          <div class="flex flex-col h-full gap-4 overflow-y-auto pr-4">
            <h4 class="text-xs font-bold">Status</h4>
            <div class="flex flex-col pl-2 gap-1">
              <label class="text-xs text-background-600 w-20 flex flex-row items-center gap-2">
                <input
                  type="checkbox"
                  value="FINISHED"
                  checked={state.statuses.includes('FINISHED')}
                  onInput$={setTransactionStatus}
                />
                Zakończona
              </label>
              <label class="text-xs text-background-600 w-20 flex flex-row items-center gap-2">
                <input
                  type="checkbox"
                  value="PENDING"
                  checked={state.statuses.includes('PENDING')}
                  onInput$={setTransactionStatus}
                />
                Oczekująca
              </label>
            </div>

            <div class="flex flex-col gap-2">
              <h4 class="text-xs font-bold">Data</h4>
              <div class="flex flex-col pl-2 gap-1">
                <div class="flex flex-col">
                  <label
                    class="text-xs text-background-600"
                    for="filter-transactions-date-from-input"
                  >
                    Od
                  </label>
                  <input
                    type="date"
                    id="filter-transactions-date-from-input"
                    value={state.dateFrom}
                    onInput$={(e) => (state.dateFrom = (e.target as HTMLInputElement).value)}
                  />
                </div>

                <div class="flex flex-col">
                  <label
                    class="text-xs text-background-600"
                    for="filter-transactions-date-to-input"
                  >
                    Do
                  </label>
                  <input
                    type="date"
                    id="filter-transactions-date-to-input"
                    value={state.dateTo}
                    onInput$={(e) => (state.dateTo = (e.target as HTMLInputElement).value)}
                  />
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <h4 class="text-xs font-bold">Odbiorca</h4>

              {allRecipients.value.map((r) => (
                <div
                  class="flex flex-col pl-2 gap-1"
                  key={`recipient-filter-checkbox-container-${r}`}
                >
                  <label
                    class="text-xs text-background-600 w-full flex flex-row items-center gap-2"
                    for={`recipient-filter-checkbox-${r}`}
                  >
                    <input
                      type="checkbox"
                      value={r}
                      checked={state.recipients.includes(r)}
                      id={`recipient-filter-checkbox-${r}`}
                      onInput$={setRecipients}
                    />
                    {r}
                  </label>
                </div>
              ))}
            </div>

            <div class="flex flex-col gap-2">
              <h4 class="text-xs font-bold">Kategoria</h4>

              {transactionCategories.value.map((c) => (
                <div
                  class="flex flex-col pl-2 gap-1"
                  key={`category-filter-checkbox-container-${c.id}`}
                >
                  <label
                    class="text-xs text-background-600 w-full flex flex-row items-center gap-2"
                    for={`category-filter-checkbox-${c.id}`}
                  >
                    <input
                      type="checkbox"
                      value={c.id}
                      checked={state.categoryIds.includes(c.id)}
                      id={`category-filter-checkbox-${c.id}`}
                      onInput$={setCategoryIds}
                    />
                    {c.name}
                  </label>
                </div>
              ))}
            </div>

            <div class="flex flex-col gap-2">
              <h4 class="text-xs font-bold">Kwota</h4>
              <div class="flex flex-col pl-2 gap-1">
                <div class="flex flex-col">
                  <label
                    class="text-xs text-background-600"
                    for="filter-transactions-value-from-input"
                  >
                    Od
                  </label>
                  <input
                    type="number"
                    id="filter-transactions-value-from-input"
                    value={state.valueFrom}
                    onInput$={(e) => (state.valueFrom = +(e.target as HTMLInputElement).value)}
                  />
                </div>

                <div class="flex flex-col">
                  <label
                    class="text-xs text-background-600"
                    for="filter-transactions-value-to-input"
                  >
                    Do
                  </label>
                  <input
                    type="number"
                    id="filter-transactions-value-to-input"
                    value={state.valueTo}
                    onInput$={(e) => (state.valueTo = +(e.target as HTMLInputElement).value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-row items-center justify-center gap-4">
          <Button color="neutral" onClick={handleClear}>
            Resetuj
          </Button>
          <Button onClick={handleFilter}>Aplikuj</Button>
        </div>
      </div>
    )
  }
)
