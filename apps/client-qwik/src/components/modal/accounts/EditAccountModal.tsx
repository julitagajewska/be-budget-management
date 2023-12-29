import type { QRL } from '@builder.io/qwik'
import { component$, useStore, $ } from '@builder.io/qwik'
import type { AccountDTO } from 'shared-types'
import { Modal } from '../Modal'
import { useEditAccount } from '~/api/accountsAPI'
import { useCategories } from '~/api/categoriesAPI'

type EditAccountModalProps = {
  account: AccountDTO
  open: QRL<() => void>
  close: QRL<() => void>
}

export const EditAccountModal = component$(({ account, close }: EditAccountModalProps) => {
  const editAccount = useEditAccount()
  const categories = useCategories().value.filter((c) => c.categoryType === 'ACCOUNT')
  const state = useStore({
    name: account.name,
    balance: account.balance,
    selectedCategory: account.category
  })

  const handleConfirm = $(async () => {
    const editedAccount: AccountDTO = {
      ...account,
      name: state.name,
      balance: state.balance,
      category: state.selectedCategory
    }
    await editAccount.submit(editedAccount)
    close()
  })

  const handleCancel = $(() => {
    close()
  })
  return (
    <>
      <Modal title="Nowe konto" handleConfirm={handleConfirm} handleCancel={handleCancel}>
        <div class="flex flex-col gap-1">
          <label for="account-name-input">Nazwa </label>
          <input
            id="account-name-input"
            type="text"
            value={state.name}
            onInput$={(e) => (state.name = (e.target as HTMLInputElement).value)}
          />
        </div>

        <div class="flex flex-col gap-1">
          <label for="account-category-select">Stan konta</label>
          <select
            value={state.selectedCategory}
            onChange$={(e) => (state.selectedCategory = (e.target as HTMLSelectElement).value)}
          >
            {categories.map((c) => (
              <option value={c.id} key={`category-select-option-${c.id}`}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div class="flex flex-col gap-1">
          <label for="account-balance-input">Stan konta</label>
          <input
            id="account-balance-input"
            type="number"
            value={state.balance}
            onInput$={(e) => (state.balance = +(e.target as HTMLInputElement).value)}
          />
        </div>
      </Modal>
    </>
  )
})
