import { ModalProps, TransactionDTO, TransactionStatus } from 'shared-types'
import { RootState } from '../../redux/store'
import { useSelector } from 'react-redux'
import Modal from './Modal'
import React, { useState } from 'react'
import ManageCategoriesModal from './ManageCategoriesModal'
import Select from '../inputs/Select'
import { Option } from '../inputs/Select'
import Button from '../buttons/Button'
import { ArrowLeft, Cross, Plus } from '../icons'
import { handleValueChange } from '../../utils'
import Input from '../inputs/Input'
import Checkbox from '../inputs/Checkbox'
import SelectDate from '../inputs/SelectDate'
import SelectCategory from '../inputs/SelectCategory'
import TextArea from '../inputs/TextArea'
import { useCreateTransactionMutation } from '../../redux/api/slices/transactionSlice'

type ManageTransactionModalProps = {
  tranaction?: TransactionDTO
  id?: string
} & ModalProps

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

const ManageTransactionModal = ({
  open,
  handleOpen,
  handleClose,
  tranaction,
  id
}: ManageTransactionModalProps) => {
  // USER DATA
  const currentUser = useSelector((state: RootState) => state.currentUser.currentUser)

  // FORM STATE
  const [category, setCategory] = useState<string | undefined>(undefined) // Category ID
  const [status, setStatus] = useState<string | undefined>(undefined) // "FINISHED" or "PENDING"
  const [recipient, setRecipient] = useState<string | undefined>(undefined) // Recipient name
  const [title, setTitle] = useState<string | undefined>(undefined) // title
  const [value, setValue] = useState<number | undefined>(undefined) // Balance
  const [isExpense, setIsExpense] = useState<boolean>(false)
  const [isRecurring, setIsRecurring] = useState<boolean>(false)
  const [date, setDate] = useState<string | undefined>(undefined)
  const [description, setDescription] = useState<string | undefined>(undefined)

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

  const handleCategorySelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    let id = event.target.id
  }

  const [addTransaction] = useCreateTransactionMutation()

  const handleConfirm = () => {
    console.log(
      category,
      status,
      recipient,
      title,
      value,
      isExpense,
      isRecurring,
      date,
      description
    )

    let newTransaction: Partial<TransactionDTO> = {
      user: currentUser?.id,
      accountId: id,
      categoryId: category,
      status: statuses.find((s) => s.id.toString() === status)?.value,
      recipient: recipient,
      title: title,
      value: value,
      isExpense: isExpense,
      isRecurring: isRecurring,
      date: date,
      description: description
    }

    // console.log(newTransaction)
    addTransaction(newTransaction)
  }

  return (
    <>
      {open && (
        <Modal handleClose={handleClose}>
          <div className="w-full flex flex-row justify-between items-center">
            <h2 className="text-lg font-semibold text-Neutral-700">
              {tranaction ? 'Transakcja - edycja' : 'Nowa transakcja'}
            </h2>
            <Button
              variant="icon-only"
              color="neutral"
              size="small"
              IconLeft={Cross}
              onClick={handleClose}
            />
          </div>

          <div className="flex flex-col w-64">
            <SelectCategory
              value={category}
              handleChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handleValueChange(e, setCategory)
              }
              handleCategoryOpen={handleCategoryOpen}
              categoryTypes={['TRANSACTION']}
            />
            <Select
              options={statuses.map((s) => {
                let option: Option = { id: s.id, name: s.name }
                console.log(option)
                return option
              })}
              label="Status"
              placeholder={'Wybierz status'}
              handleSelect={(e) => handleValueChange(e, setStatus)}
              value={status}
            />
            <Input
              label="Odbiorca"
              value={recipient}
              type={'text'}
              placeholder={'Odbiorca ...'}
              handleChange={(e) => handleValueChange(e, setRecipient)}
            />
            <Input
              label="Nazwa"
              value={title}
              type={'text'}
              placeholder={'Nazwa ...'}
              handleChange={(e) => handleValueChange(e, setTitle)}
            />
            <Input
              label="Wartość"
              value={value}
              type={'text'}
              placeholder={'Wartość ...'}
              handleChange={(e) => handleValueChange(e, setValue)}
            />
            <Checkbox
              label={'Wydatek'}
              id={'is-expense-checkbox'}
              checked={isExpense}
              handleChange={setIsExpense}
            />
            <Checkbox
              label={'Tranakcja cykliczna'}
              id={'is-recurring-checkbox'}
              checked={isRecurring}
              handleChange={setIsRecurring}
            />
            <SelectDate
              value={date ? date : ''}
              handleChange={(e) => handleValueChange(e, setDate)}
              id="select-transaction-date"
            />
            <TextArea
              label="Opis"
              id="description-text-area"
              value={description}
              handleChange={(e) => handleValueChange(e, setDescription)}
            />
          </div>
          <div className="flex flex-row w-full justify-end gap-4">
            <Button
              variant="filled"
              color="neutral"
              size="small"
              text="Powrót"
              IconLeft={ArrowLeft}
              onClick={handleClose}
            />
            <Button
              variant="filled"
              color="primary"
              size="small"
              text="Utwórz"
              IconLeft={Plus}
              onClick={handleConfirm}
            />
          </div>
        </Modal>
      )}
      <ManageCategoriesModal open={categoryOpen} handleClose={handleCategoryClose} />
    </>
  )
}

export default ManageTransactionModal
