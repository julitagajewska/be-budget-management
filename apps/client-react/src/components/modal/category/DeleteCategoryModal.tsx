import { CategoryDTO, CategoryType, ModalProps } from 'shared-types'
import Modal from '../Modal'
import ModalHeader from '../sections/ModalHeader'
import ModalFooter from '../sections/ModalFooter'
import { useDeleteCategoryMutation } from '../../../redux/api/slices/categorySlice'
import { toast, ToastContainer } from 'react-toastify'

type DeleteCategoryModalProps = {
  category: CategoryDTO
}

const connectedDataType: Record<CategoryType, string> = {
  ACCOUNT: 'kont',
  TRANSACTION: 'transakcji',
  GOAL: 'celów'
}

const DeleteCategoryModal = ({
  open,
  handleClose,
  category
}: DeleteCategoryModalProps & ModalProps) => {
  const [deleteCategory] = useDeleteCategoryMutation()

  const handleConfirm = () => {
    deleteCategory(category.id)
      .unwrap()
      .then(() => {
        toast.success('Kategoria została usunięta pomyślnie!', {
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
        toast.warn('Nie udało się usunąć kategorii.', {
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
            title={'Usuwanie kategorii'}
            subtitle={category.name}
          />
          <div>
            Uwaga! Usunięcie kategorii <b>{category.name}</b> spowoduje usunięcie wszystkich
            powiązanych {connectedDataType[category.categoryType]}!
          </div>
          <ModalFooter handleClose={handleClose} handleConfirm={handleConfirm} />
        </Modal>
      )}
      <ToastContainer />
    </>
  )
}

export default DeleteCategoryModal
