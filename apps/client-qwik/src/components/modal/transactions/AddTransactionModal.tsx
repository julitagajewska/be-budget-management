import type { QRL } from '@builder.io/qwik'
import { component$, $, useStore } from '@builder.io/qwik'
import { Modal } from '../Modal'
import { useCategories } from '~/api/categoriesAPI'
import { useAddTransaction } from '~/api/transactionsAPI'
import type { AccountDTO, TransactionDTO, TransactionStatus } from 'shared-types'

type AddTransactionModalProps = {
  account: AccountDTO
  open: QRL<() => void>
  close: QRL<() => void>
}

type StatusOption = {
  id: number
  value: TransactionStatus
  name: string
}

const statuses: StatusOption[] = [
  {
    id: 0,
    value: 'FINISHED',
    name: 'Opłacona'
  },
  {
    id: 1,
    value: 'PENDING',
    name: 'Oczekująca'
  }
]

export const AddTransactionModal = component$(({ account, close }: AddTransactionModalProps) => {
  const categories = useCategories().value.filter((c) => c.categoryType === 'TRANSACTION')
  const addTransaction = useAddTransaction()

  const state = useStore({
    categoryId: categories[0].id,
    status: 'PENDING',
    recipient: '',
    title: '',
    value: 0,
    isExpense: false,
    isRecurring: false,
    date: '',
    description: ''
  })

  const handleConfirm = $(async () => {
    const newTransaction: Partial<TransactionDTO> = {
      accountId: account._id,
      categoryId: state.categoryId,
      status: state.status as TransactionStatus,
      recipient: state.recipient,
      title: state.title,
      value: state.value,
      isExpense: state.isExpense,
      isRecurring: state.isRecurring,
      date: state.date,
      description: state.description
    }
    await addTransaction.submit(newTransaction)
    close()
  })

  const handleCancel = $(() => {
    close()
  })

  //   function handleOpenCategoriesMenu() {
  //     close()
  //     //   isCategoryMenuOpen.value = true
  //   }

  //   function handleCloseCategoriesMenu() {
  //     open()
  //     //   isCategoryMenuOpen.value = false
  //   }

  return (
    <>
      <Modal title="Nowe konto" handleConfirm={handleConfirm} handleCancel={handleCancel}>
        <div class="flex flex-col gap-1">
          <label for="account-category-select">Kategoria</label>
          <select
            value={state.categoryId}
            onChange$={(e) => (state.categoryId = (e.target as HTMLSelectElement).value)}
          >
            {categories.map((c) => (
              <option value={c.id} key={`category-select-option-${c.id}`}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* STATUS */}
        <div class="flex flex-col gap-1">
          <label for="account-category-select">Kategoria</label>
          <select
            value={state.status}
            onChange$={(e) => (state.status = (e.target as HTMLSelectElement).value)}
          >
            {statuses.map((c) => (
              <option value={c.value} key={`status-select-option-${c.id}`}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* ODBIORCA */}
        <div class="flex flex-col gap-1">
          <label for="transaction-recipient-input">Odbiorca</label>
          <input
            id="transaction-recipient-input"
            type="text"
            onInput$={(e) => (state.recipient = (e.target as HTMLInputElement).value)}
          />
        </div>

        {/* TYTUŁ */}
        <div class="flex flex-col gap-1">
          <label for="transaction-title-input">Nazwa</label>
          <input
            id="transaction-title-input"
            type="text"
            onInput$={(e) => (state.title = (e.target as HTMLInputElement).value)}
          />
        </div>

        {/* WARTOŚĆ */}
        <div class="flex flex-col gap-1">
          <label for="transaction-value-input">Wartość</label>
          <input
            id="transaction-value-input"
            type="number"
            onInput$={(e) => (state.value = +(e.target as HTMLInputElement).value)}
          />
        </div>

        {/* WYDATEK */}
        <div class="flex flex-row gap-2">
          <input
            id="transaction-expense-checkbox"
            type="checkbox"
            checked={state.isExpense}
            onInput$={(e) => (state.isExpense = (e.target as HTMLInputElement).checked)}
          />
          <label for="transaction-expense-checkbox">Wydatek</label>
        </div>

        {/* TRANSAKCJA CYKLICZNA */}
        <div class="flex flex-row gap-2">
          <input
            id="transaction-recurring-checkbox"
            type="checkbox"
            checked={state.isRecurring}
            onInput$={(e) => (state.isRecurring = (e.target as HTMLInputElement).checked)}
          />
          <label for="transaction-recurring-checkbox">Transakcja cykliczna</label>
        </div>

        {/* DATA */}
        <div class="flex flex-col gap-1">
          <label for="transaction-date-input">Data</label>
          <input
            id="transaction-date-input"
            type="date"
            onInput$={(e) => (state.date = (e.target as HTMLInputElement).value)}
          />
        </div>
        {/* OPIS */}
        <div class="flex flex-col gap-1">
          <label for="transaction-description-input">Opis</label>
          <input
            id="transaction-description-input"
            type="text"
            onInput$={(e) => (state.description = (e.target as HTMLInputElement).value)}
          />
        </div>

        <div class="flex flex-col gap-1">
          <label for="transaction-value-input">Wartość</label>
          <input
            id="transaction-value-input"
            type="number"
            onInput$={(e) => (state.value = +(e.target as HTMLInputElement).value)}
          />
        </div>
      </Modal>
    </>
  )
})
