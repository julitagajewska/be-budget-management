import { useEffect, useState } from 'react'
import { ModalProps } from 'shared-types'
import Modal from '../Modal'
import ModalFooter from '../sections/ModalFooter'
import ModalHeader from '../sections/ModalHeader'
import Input from '../../inputs/Input'
import { useParams } from 'react-router-dom'
import { useEditAccountMutation, useGetAccountQuery } from '../../../redux/api/slices/accountSlice'
import { useGetUsersCategoriesQuery } from '../../../redux/api/slices/categorySlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { setPageName } from '../../../redux/slices/pageHeaderSlice'
import { handleValueChange } from '../../../utils'
import SelectCategory from '../../inputs/SelectCategory'
import ManageCategoriesModal from '../ManageCategoriesModal'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type EditAccountModalProps = {} & ModalProps

const EditAccountModal = ({ open, handleOpen, handleClose }: EditAccountModalProps) => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const currentUser = useSelector((state: RootState) => state.currentUser.currentUser)

  // FORM VALUES
  const [name, setName] = useState<string | null>(null)
  const [categoryId, setCategoryId] = useState<string | null>(null)
  const [balance, setBalance] = useState<number | null>(null)

  // ACCOUNT
  const { data: account, isSuccess: isAccountSuccess } = useGetAccountQuery({
    id: id
  })

  // CATEGORIES
  const { data: categories, isSuccess: isCategoriesSuccess } = useGetUsersCategoriesQuery({
    id: currentUser?.id
  })

  useEffect(() => {
    if (account && categories) {
      dispatch(setPageName(account.name))
      setName(account.name)
      setBalance(account.balance)
      let category = categories.find((c) => c.id === account.category)
      if (category) setCategoryId(category.id)
    }
  }, [isAccountSuccess, isCategoriesSuccess])

  // MANAGE CATEGORIES MODAL STATE
  const [categoryOpen, setCategoryOpen] = useState(false)

  // CATEGORIES MODAL HANDLERS
  const handleCategoryOpen = () => {
    handleClose()
    setCategoryOpen(true)
  }

  const handleCategoryClose = () => {
    if (handleOpen) handleOpen()
    setCategoryOpen(false)
  }

  const [editAccount] = useEditAccountMutation()

  const isFormValid = account && account._id && name && categoryId && balance
  const [errors, setErrors] = useState<string[]>([])

  const handleConfirm = () => {
    console.log(account?._id)
    if (isFormValid) {
      editAccount({
        _id: account._id,
        name: name,
        category: categoryId,
        balance: balance
      })
      setErrors([])
      toast.success('Konto zostało zedytowane pomyślnie!', {
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
    } else {
      if (!account) setErrors([...errors, 'Nieprawidłowe konto'])
      if (!name) setErrors([...errors, 'Nieprawidłowa nazwa'])
      if (!categoryId) setErrors([...errors, 'Nieprawidłowa kategoria'])
      if (!balance) setErrors([...errors, 'Nieprawidłowy bilans'])
    }
  }

  return (
    <>
      {open && (
        <Modal handleClose={handleClose}>
          <ModalHeader title="Edycja konta" subtitle={account?.name} handleClose={handleClose} />
          {errors.length !== 0 && (
            <div>
              {errors.map((e) => (
                <span className="text-red-600">{e}</span>
              ))}
            </div>
          )}
          <div>
            <Input
              value={name}
              type={'text'}
              label="Nazwa konta"
              placeholder={'Podaj nazwę konta'}
              handleChange={(e) => handleValueChange(e, setName)}
            />

            <SelectCategory
              value={categoryId}
              handleChange={(e) => handleValueChange(e, setCategoryId)}
              handleCategoryOpen={handleCategoryOpen}
              categoryTypes={['ACCOUNT']}
            />

            <Input
              value={balance}
              type={'number'}
              label="Bilans"
              placeholder={'Podaj bilans konta'}
              handleChange={(e) => handleValueChange(e, setBalance)}
            />
          </div>

          <ModalFooter
            handleClose={handleClose}
            handleConfirm={handleConfirm}
            confirmText="Zapisz"
          />
        </Modal>
      )}
      <ManageCategoriesModal open={categoryOpen} handleClose={handleCategoryClose} />
      <ToastContainer />
    </>
  )
}

export default EditAccountModal
