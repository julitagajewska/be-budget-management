import Modal from '../Modal'
import { ModalProps } from 'shared-types'
import ModalHeader from '../sections/ModalHeader'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useDeleteAccountMutation,
  useGetAccountQuery
} from '../../../redux/api/slices/accountSlice'
import ModalFooter from '../sections/ModalFooter'
import { toast } from 'react-toastify'

const DeleteAccountModal = ({ open, handleClose }: ModalProps) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data: account } = useGetAccountQuery({
    id: id
  })

  const [deleteAccount] = useDeleteAccountMutation()

  const handleConfirm = () => {
    if (id) {
      deleteAccount(id)
        .unwrap()
        .then(() => {
          navigate('/accounts')
          toast.success('Konto zostało usunięte pomyślnie!', {
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
          toast.warn('Nie udało się usunąć konta.', {
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
    } else {
      toast.warn('Nie odnaleziono konta.', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })
    }
  }

  return (
    <>
      {open && (
        <Modal handleClose={handleClose}>
          <ModalHeader
            handleClose={handleClose}
            title={'Usuwanie konta'}
            subtitle={account?.name}
          />
          <ModalFooter handleClose={handleClose} handleConfirm={handleConfirm} />
        </Modal>
      )}
    </>
  )
}

export default DeleteAccountModal
