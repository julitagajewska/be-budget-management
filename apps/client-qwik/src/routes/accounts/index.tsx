import { component$, useStore, $ } from '@builder.io/qwik'
import { useAccounts } from '~/api/accountsAPI'
import { Button } from '~/components/buttons/Button'
import { AddAccountModal } from '~/components/modal/accounts/AddAccountModal'
import AccountTile from '~/components/tile/AccountTile'
import { Plus } from '~/icons'

export { useAccounts, useAddAccount } from '~/api/accountsAPI'
export {
  useCategories,
  useAddCategory,
  useDeleteCategory,
  useEditCategory
} from '~/api/categoriesAPI'

export default component$(() => {
  const state = useStore({
    addAccountModalOpen: false
  })

  const accounts = useAccounts()

  const handleOpenAddAccountModal = $(() => {
    state.addAccountModalOpen = true
  })

  const handleCloseAddAccountModal = $(() => {
    state.addAccountModalOpen = false
  })

  return (
    <div class="flex flex-col w-full">
      <div class="flex flex-row w-full items-center justify-between">
        <h1 class="text-md font-bold text-background-700">Konta</h1>
        <Button onClick={handleOpenAddAccountModal}>
          <Plus /> Nowe konto
        </Button>
      </div>
      <div class="grid grid-cols-3 gap-6 mt-4">
        {accounts.value.map((a) => (
          <AccountTile account={a} key={a._id} />
        ))}
      </div>
      {state.addAccountModalOpen && (
        <AddAccountModal open={handleOpenAddAccountModal} close={handleCloseAddAccountModal} />
      )}
    </div>
  )
})
