import type { QRL } from '@builder.io/qwik'
import { component$, $ } from '@builder.io/qwik'
import type { AccountDTO } from 'shared-types'
import { Modal } from '../Modal'
import { useNavigate } from '@builder.io/qwik-city'
import { useDeleteAccount } from '~/api/accountsAPI'

type DeleteAccountModalProps = {
  account: AccountDTO
  open: QRL<() => void>
  close: QRL<() => void>
}

export const DeleteAccountModal = component$(({ account, close }: DeleteAccountModalProps) => {
  const deleteAccount = useDeleteAccount()
  const nav = useNavigate()
  const handleConfirm = $(async () => {
    deleteAccount.submit().then(() => {
      nav('/accounts')
      close()
    })
  })

  const handleCancel = $(() => {
    close()
  })

  return (
    <Modal
      title="Usuwanie konta"
      subtitle={account.name}
      handleConfirm={handleConfirm}
      handleCancel={handleCancel}
    >
      Czy na pewno chcesz usunąć konto {account.name}?
    </Modal>
  )
})
