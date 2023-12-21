import { ModalProps, TransactionDTO, TransactionStatus } from 'shared-types'
import Modal from '../Modal'
import ModalFooter from '../sections/ModalFooter'
import ModalHeader from '../sections/ModalHeader'
import { useReducer, useState } from 'react'
import Input from '../../inputs/Input'
import Checkbox from '../../inputs/Checkbox'
import SelectDate from '../../inputs/SelectDate'
import TextArea from '../../inputs/TextArea'
import Select from '../../inputs/Select'
import { Option } from '../../inputs/Select'
import SelectCategory from '../../inputs/SelectCategory'
import ManageCategoriesModal from '../ManageCategoriesModal'
import { useEditTransactionMutation } from '../../../redux/api/slices/transactionSlice'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'

type EditTransactionModalProps = {
  transaction: TransactionDTO
}

type ActionType =
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_STATUS'; payload: TransactionStatus }
  | { type: 'SET_RECIPIENT'; payload: string }
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_VALUE'; payload: number }
  | { type: 'SET_IS_EXPENSE'; payload: boolean }
  | { type: 'SET_IS_RECURRING'; payload: boolean }
  | { type: 'SET_DATE'; payload: string }
  | { type: 'SET_DESCRIPTION'; payload: string }

const reducer = (state: TransactionDTO, action: ActionType): TransactionDTO => {
  switch (action.type) {
    case 'SET_CATEGORY':
      return { ...state, categoryId: action.payload }
    case 'SET_STATUS':
      return { ...state, status: action.payload }
    case 'SET_RECIPIENT':
      return { ...state, recipient: action.payload }
    case 'SET_TITLE':
      return { ...state, title: action.payload }
    case 'SET_VALUE':
      return { ...state, value: action.payload }
    case 'SET_IS_EXPENSE':
      return { ...state, isExpense: action.payload }
    case 'SET_IS_RECURRING':
      return { ...state, isRecurring: action.payload }
    case 'SET_DATE':
      return { ...state, date: action.payload }
    case 'SET_DESCRIPTION':
      return { ...state, description: action.payload }
    default:
      return state
  }
}

type StatusOption = {
  id: number
  value: TransactionStatus
  name: string
}

const statuses: StatusOption[] = [
  {
    id: 0,
    value: 'FINISHED',
    name: 'Opłacona'
  },
  {
    id: 1,
    value: 'PENDING',
    name: 'Oczekująca'
  }
]

const EditTransactionModal = ({
  open,
  handleOpen,
  handleClose,
  transaction
}: EditTransactionModalProps & ModalProps) => {
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

  const [state, dispatch] = useReducer(reducer, transaction)

  const handleCategoryChange = (newCategory: string) => {
    dispatch({ type: 'SET_CATEGORY', payload: newCategory })
  }

  const handleStatusChange = (newStatus: TransactionStatus) => {
    dispatch({ type: 'SET_STATUS', payload: newStatus })
  }

  const handleRecipientChange = (newRecipient: string) => {
    dispatch({ type: 'SET_RECIPIENT', payload: newRecipient })
  }

  const handleTitleChange = (newTitle: string) => {
    dispatch({ type: 'SET_TITLE', payload: newTitle })
  }

  const handleValueChange = (newValue: number) => {
    dispatch({ type: 'SET_VALUE', payload: newValue })
  }

  const handleIsExpenseChange = (newValue: boolean) => {
    dispatch({ type: 'SET_IS_EXPENSE', payload: newValue })
  }

  const handleIsRecurringChange = (newValue: boolean) => {
    dispatch({ type: 'SET_IS_RECURRING', payload: newValue })
  }

  const handleDateChange = (newDate: string) => {
    dispatch({ type: 'SET_DATE', payload: newDate })
  }

  const handleDescriptionChange = (newDescription: string) => {
    dispatch({ type: 'SET_DESCRIPTION', payload: newDescription })
  }

  const [editTransaction] = useEditTransactionMutation()

  const handleConfirm = () => {
    editTransaction({ ...state, date: dayjs(state.date).format('YYYY-MM-DD') })
      .unwrap()
      .then(() => {
        toast.success('Transakcja została zmodyfikowana pomyślnie!', {
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
        toast.warn('Nie udało się zmodyfikować transakcji.', {
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
            title={'Edycja transakcji'}
            subtitle={transaction?.title}
          />
          <SelectCategory
            value={state.categoryId}
            handleChange={(e) => handleCategoryChange(e.target.value)}
            handleCategoryOpen={handleCategoryOpen}
            categoryTypes={['TRANSACTION']}
          />
          <Select
            options={statuses.map((s) => {
              let option: Option = { id: s.id, name: s.name }
              return option
            })}
            label="Status"
            placeholder={'Wybierz status'}
            handleSelect={(e) => handleStatusChange(e.target.value as TransactionStatus)}
            value={state.status}
          />
          <Input
            label="Odbiorca"
            value={state.recipient}
            type={'text'}
            placeholder={'Odbiorca ...'}
            handleChange={(e) => handleRecipientChange(e.target.value)}
          />
          <Input
            label="Nazwa"
            value={state.title}
            type={'text'}
            placeholder={'Nazwa ...'}
            handleChange={(e) => handleTitleChange(e.target.value)}
          />
          <Input
            label="Wartość"
            value={state.value}
            type={'text'}
            placeholder={'Wartość ...'}
            handleChange={(e) => handleValueChange(+e.target.value)}
          />
          <Checkbox
            label={'Wydatek'}
            id={'is-expense-checkbox'}
            checked={state.isExpense}
            handleChange={(value: boolean) => handleIsExpenseChange(value)}
          />
          <Checkbox
            label={'Tranakcja cykliczna'}
            id={'is-recurring-checkbox'}
            checked={state.isRecurring}
            handleChange={(value: boolean) => handleIsRecurringChange(value)}
          />
          <SelectDate
            value={dayjs(state.date).format('YYYY-MM-DD')}
            handleChange={(e) => handleDateChange(e.target.value)}
            id="edit-transaction-date-select"
          />
          <TextArea
            label="Opis"
            id="description-text-area"
            value={state.description}
            handleChange={(e) => handleDescriptionChange(e.target.value)}
          />
          <ModalFooter handleClose={handleClose} handleConfirm={handleConfirm} />
        </Modal>
      )}
      <ManageCategoriesModal open={categoryOpen} handleClose={handleCategoryClose} />
    </>
  )
}

export default EditTransactionModal
