import type { QRL } from '@builder.io/qwik'
import { component$, $, useStore } from '@builder.io/qwik'
import { Modal } from '../Modal'
import type { AccountDTO } from 'shared-types'
import { useCategories } from '~/api/categoriesAPI'
import { useAddAccount } from '~/api/accountsAPI'
import { ManageCategoriesModal } from '../categories/ManageCategoriesModal'
import { Plus } from '~/icons'
import { Button } from '~/components/buttons/Button'

type AddAccountModalProps = {
  open: QRL<() => void>
  close: QRL<() => void>
}

export const AddAccountModal = component$(({ close }: AddAccountModalProps) => {
  const categories = useCategories()
  const addAccount = useAddAccount()

  const state = useStore({
    name: '',
    balance: 0,
    selectedCategory: categories.value[0].id,
    isManageCategoriesModalOpen: false
  })

  const handleConfirm = $(async () => {
    const newAccount: Partial<AccountDTO> = {
      name: state.name,
      balance: state.balance,
      category: state.selectedCategory
    }
    await addAccount.submit(newAccount)
    close()
  })

  const handleCancel = $(() => {
    close()
  })

  const handleOpenCategoriesMenu = $(() => {
    state.isManageCategoriesModalOpen = true
  })

  const handleCloseCategoriesMenu = $(() => {
    state.isManageCategoriesModalOpen = false
  })

  return (
    <>
      <Modal title="Nowe konto" handleConfirm={handleConfirm} handleCancel={handleCancel}>
        <div class="flex flex-col gap-1">
          <label for="account-name-input">Nazwa </label>
          <input
            id="account-name-input"
            type="text"
            onInput$={(e) => (state.name = (e.target as HTMLInputElement).value)}
          />
        </div>

        <div class="flex flex-col gap-1">
          <div class="flex flex-row w-full items-center justify-between">
            <label for="account-category-select">Kategoria</label>
            <Button color="neutral" onClick={handleOpenCategoriesMenu}>
              <Plus />
            </Button>
          </div>
          <select
            value={state.selectedCategory}
            onChange$={(e) => (state.selectedCategory = (e.target as HTMLSelectElement).value)}
          >
            {categories.value
              .filter((c) => c.categoryType === 'ACCOUNT')
              .map((c) => (
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
            onInput$={(e) => (state.balance = +(e.target as HTMLInputElement).value)}
          />
        </div>
      </Modal>

      {state.isManageCategoriesModalOpen && (
        <ManageCategoriesModal close={handleCloseCategoriesMenu} />
      )}
    </>
  )
})
