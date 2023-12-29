import type { QRL } from '@builder.io/qwik'
import { component$, $ } from '@builder.io/qwik'
import type { TransactionDTO } from 'shared-types'
import { Modal } from '../Modal'
import { useDeleteTransaction } from '~/api/transactionsAPI'

type DeleteTransactionModalProps = {
  transaction: TransactionDTO
  open: QRL<() => void>
  close: QRL<() => void>
}

export const DeleteTransactionModal = component$(
  ({ transaction, close }: DeleteTransactionModalProps) => {
    const deleteTransaction = useDeleteTransaction()
    const handleConfirm = $(async () => {
      deleteTransaction.submit({ id: transaction._id })
      close()
    })

    const handleCancel = $(() => {
      close()
    })

    return (
      <Modal
        title="Usuwanie transakcji"
        subtitle={transaction.title}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      >
        Czy na pewno chcesz usunąć transakcję {transaction.title}?
      </Modal>
    )
  }
)
