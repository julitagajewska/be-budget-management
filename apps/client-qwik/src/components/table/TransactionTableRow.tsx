import { component$, useStore, $, useSignal, useStyles$ } from '@builder.io/qwik'
import type { AccountDTO, TransactionDTO } from 'shared-types'
import { DeleteTransactionModal } from '../modal/transactions/DeleteTransactionModal'
import { EditTransactionModal } from '../modal/transactions/EditTransactionModal'
import { TransactionTypeChip } from '../chips/TransactionTypeChip'
import dayjs from 'dayjs'
import { Popover, PopoverTrigger, usePopover } from '@qwik-ui/headless'
import { More } from '~/icons'

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

    // POPOVER
    useStyles$(`
  .my-transition {
    transition: opacity 0.5s, display 0.5s, overlay 0.5s;
    transition-behavior: allow-discrete;
    opacity: 0;
  }

  .popover-showing {
    opacity: 1;
  }

  .popover-closing {
    opacity: 0;
  }`)

    const { showPopover, togglePopover } = usePopover(`anchor-ref-${t._id}`)
    const triggerRef = useSignal<HTMLButtonElement>()
    const popoverRef = useSignal<HTMLElement>()

    const handleOpenDeleteTransactionModal = $(() => {
      togglePopover()
      state.isDeleteTransactionModalOpen = true
    })

    const handleCloseDeleteTransactionModal = $(() => {
      state.isDeleteTransactionModalOpen = false
    })

    const handleOpenEditTransactionModal = $(() => {
      togglePopover()
      state.isEditTransactionModalOpen = true
    })

    const handleCloseEditTransactionModal = $(() => {
      state.isEditTransactionModalOpen = false
    })

    return (
      <>
        <tr>
          <td>
            <TransactionTypeChip isExpense={t.isExpense} />
          </td>
          <td class="px-2">{t.status}</td>
          <td class="px-2 w-8 text-ellipsis overflow-hidden">{t.title}</td>
          <td class="px-2">{dayjs(t.date).format('DD-MM-YYYY')}</td>
          <td class="px-2">{t.recipient}</td>
          <td class="px-2">{t.description}</td>
          <td class="px-2">{categoryName}</td>
          <td class="px-2">{t.value}</td>
          <td class="px-2">
            <PopoverTrigger
              ref={triggerRef}
              onClick$={() => {
                showPopover()
              }}
              popovertarget={`anchor-ref-${t._id}`}
              class="rounded-md  px-1 py-1 hover:bg-background-100 transition-all duration-150 ease-in-out"
            >
              <More />
            </PopoverTrigger>

            <Popover
              ref={popoverRef}
              anchorRef={triggerRef}
              floating={true}
              placement="left"
              gutter={4}
              id={`anchor-ref-${t._id}`}
              class="my-transition listbox shadow-dark-low rounded-md "
            >
              <div class="flex flex-col gap-1 w-fit items-start py-1">
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
            </Popover>
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
