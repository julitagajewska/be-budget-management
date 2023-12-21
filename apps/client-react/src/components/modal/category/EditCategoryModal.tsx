import { CategoryDTO, CategoryType, ModalProps } from 'shared-types'
import Modal from '../Modal'
import ModalFooter from '../sections/ModalFooter'
import ModalHeader from '../sections/ModalHeader'
import { useEffect, useReducer } from 'react'
import Input from '../../inputs/Input'
import Select from '../../inputs/Select'
import { Option } from '../../inputs/Select'
import { toast } from 'react-toastify'
import { useEditCategoryMutation } from '../../../redux/api/slices/categorySlice'

type EditCategoryModalProps = {
  category: CategoryDTO
}

type ActionType =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_TYPE'; payload: CategoryType }
  | { type: 'SET_STATE'; payload: CategoryDTO }

const reducer = (state: CategoryDTO, action: ActionType): CategoryDTO => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload }
    case 'SET_TYPE':
      return { ...state, categoryType: action.payload }
    default:
      return state
  }
}

type TypeOption = {
  id: number
  value: CategoryType
  name: string
}

const types: TypeOption[] = [
  {
    id: 0,
    value: 'ACCOUNT',
    name: 'Konto'
  },
  {
    id: 1,
    value: 'TRANSACTION',
    name: 'Transakcja'
  },
  {
    id: 2,
    value: 'GOAL',
    name: 'Cel'
  }
]

const EditTransactionModal = ({
  open,
  handleClose,
  category
}: EditCategoryModalProps & ModalProps) => {
  const [state, dispatch] = useReducer(reducer, category)

  useEffect(() => {
    if (open) {
      handleNameChange(category.name)
      handleTypeChange(category.categoryType)
      console.log(category.categoryType)
    }
  }, [open])

  const handleNameChange = (newName: string) => {
    dispatch({ type: 'SET_NAME', payload: newName })
  }

  const handleTypeChange = (newType: CategoryType) => {
    dispatch({ type: 'SET_TYPE', payload: newType })
  }

  const [editCategory] = useEditCategoryMutation()

  const handleConfirm = () => {
    editCategory({ ...state })
      .unwrap()
      .then(() => {
        toast.success('Kategoria została zmodyfikowana pomyślnie!', {
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
        toast.warn('Nie udało się zmodyfikować kategorii.', {
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
          <ModalHeader handleClose={handleClose} title={'Edycja kategorii'} subtitle={state.name} />

          <Input
            label="Nazwa"
            value={state.name}
            type={'text'}
            placeholder={'Nazwa ...'}
            handleChange={(e) => handleNameChange(e.target.value)}
          />
          <Select
            options={types.map((s) => {
              let option: Option = { id: s.id, name: s.name }
              return option
            })}
            label="Rodzaj kategorii"
            placeholder={'Wybierz rodzaj'}
            handleSelect={(e) => handleTypeChange(e.target.value as CategoryType)}
            value={types.find((t) => t.value === state.categoryType)?.id}
          />
          <ModalFooter handleClose={handleClose} handleConfirm={handleConfirm} />
        </Modal>
      )}
    </>
  )
}

export default EditTransactionModal
