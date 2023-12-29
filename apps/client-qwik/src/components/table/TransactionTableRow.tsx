import { component$, useStore, $ } from '@builder.io/qwik'
import type { AccountDTO, TransactionDTO } from 'shared-types'
import { Menu } from '../menu/Menu'
import { DeleteTransactionModal } from '../modal/transactions/DeleteTransactionModal'
import { EditTransactionModal } from '../modal/transactions/EditTransactionModal'

type TransactionTableRowProps = {
  account: AccountDTO
  t: TransactionDTO
  categoryName: string
}

export const TransactionTableRow = component$(
  ({ account, t, categoryName }: TransactionTableRowProps) => {
    const state = useStore({
      isDeleteTransactionModalOpen: false,
      isEditTransactionModalOpen: false
    })

    const handleOpenDeleteTransactionModal = $(() => {
      state.isDeleteTransactionModalOpen = true
    })

    const handleCloseDeleteTransactionModal = $(() => {
      state.isDeleteTransactionModalOpen = false
    })

    const handleOpenEditTransactionModal = $(() => {
      state.isEditTransactionModalOpen = true
    })

    const handleCloseEditTransactionModal = $(() => {
      state.isEditTransactionModalOpen = false
    })

    return (
      <>
        <tr>
          <td>{t.status}</td>
          <td>{t.title}</td>
          <td>{t.date}</td>
          <td>{t.recipient}</td>
          <td>{t.description}</td>
          <td>{categoryName}</td>
          <td>{t.value}</td>
          <td>
            <Menu>
              <div q:slot="content" class="flex flex-col gap-1 w-fit items-start py-1">
                <button
                  class="hover:bg-background-100 transition-all duration-150 ease-in-out w-24 flex flex-row items-start px-4 py-1"
                  onClick$={handleOpenDeleteTransactionModal}
                >
                  Usuń
                </button>
                <button
                  class="hover:bg-background-100 transition-all duration-150 ease-in-out w-24 flex flex-row items-start px-4 py-1"
                  onClick$={handleOpenEditTransactionModal}
                >
                  Edytuj
                </button>
              </div>
            </Menu>
          </td>
        </tr>

        {state.isDeleteTransactionModalOpen && (
          <DeleteTransactionModal
            transaction={t}
            open={handleOpenDeleteTransactionModal}
            close={handleCloseDeleteTransactionModal}
          />
        )}

        {state.isEditTransactionModalOpen && (
          <EditTransactionModal
            transaction={t}
            account={account}
            open={handleOpenEditTransactionModal}
            close={handleCloseEditTransactionModal}
          />
        )}
      </>
    )
  }
)
