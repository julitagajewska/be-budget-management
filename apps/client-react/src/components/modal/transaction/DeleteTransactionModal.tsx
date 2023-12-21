import { ModalProps, TransactionDTO } from 'shared-types'
import ModalHeader from '../sections/ModalHeader'
import Modal from '../Modal'
import ModalFooter from '../sections/ModalFooter'
import { toast } from 'react-toastify'
import { useDeleteTransactionMutation } from '../../../redux/api/slices/transactionSlice'

type DeleteTransactionModalProps = {
  transaction: TransactionDTO
}

const DeleteTransactionModal = ({
  open,
  handleClose,
  transaction
}: DeleteTransactionModalProps & ModalProps) => {
  const [deleteTransaction] = useDeleteTransactionMutation()

  const handleConfirm = () => {
    deleteTransaction(transaction._id)
      .unwrap()
      .then(() => {
        toast.success('Transakcja została usunięta pomyślnie!', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        })
        handleClose()
      })
      .catch(() => {
        toast.warn('Nie udało się usunąć transakcji.', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        })
      })
  }

  return (
    <>
      {open && (
        <Modal handleClose={handleClose}>
          <ModalHeader
            handleClose={handleClose}
            title={'Usuwanie transakcji'}
            subtitle={transaction?.title}
          />
          <ModalFooter handleClose={handleClose} handleConfirm={handleConfirm} />
        </Modal>
      )}
    </>
  )
}

export default DeleteTransactionModal
