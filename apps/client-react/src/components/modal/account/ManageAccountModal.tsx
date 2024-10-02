import { useState } from 'react'
import Button from '../../buttons/Button'
import Input from '../../inputs/Input'
import { Cross, Badge, Money, ArrowLeft, Plus } from '../../icons'
import Modal from '../Modal'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { AccountDTO, ModalProps } from 'shared-types'
import ManageCategoriesModal from '../ManageCategoriesModal'
import { handleValueChange } from '../../../utils'
import SelectCategory from '../../inputs/SelectCategory'
import { useCreateAccountMutation } from '../../../redux/api/slices/accountSlice'
import { toast } from 'react-toastify'

type ManageAccountModalProps = {
  account?: AccountDTO
} & ModalProps

const ManageAccountModal = ({
  account,
  open,
  handleOpen,
  handleClose
}: ManageAccountModalProps) => {
  // USER DATA
  const currentUser = useSelector((state: RootState) => state.currentUser.currentUser)

  // FORM STATE
  const [isValid, setIsValid] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // INPUTS STATE
  const [name, setName] = useState('')
  const [category, setCategory] = useState<string | undefined>(undefined)
  const [balance, setBalance] = useState(0)

  const [createAccount] = useCreateAccountMutation()

  const handleCreate = () => {
    try {
      if (!currentUser) throw new Error('Nie znaleziono użytkownika o podanym id')
      if (isValid) {
        const newAccount: Partial<AccountDTO> = {
          user: currentUser.id,
          category: category,
          name: name,
          balance: balance
        }
        createAccount(newAccount)
          .unwrap()
          .then(() => {
            handleClose()
            toast.success('Konto zostało utworzone pomyślnie!', {
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
          .catch(() => {
            toast.warn('Nie udało się utworzyć konta.', {
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
        setError('Wprowadzono nieprawidłowe dane')
      }
    } catch (e) {
      console.log(e)
    }
  }

  // MANAGE CATEGORY MODAL
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)

  const handleCategoryModalOpen = () => {
    setCategoryModalOpen(true)
    handleClose()
  }

  const handleCategoryModalClose = () => {
    setCategoryModalOpen(false)
    if (handleOpen) handleOpen()
  }

  return (
    <>
      {open && (
        <Modal handleClose={handleClose}>
          <div className="w-96 flex flex-row justify-between items-center">
            <h2 className="text-lg font-semibold text-Neutral-700">
              {account ? 'Konto - edycja' : 'Nowe konto'}
            </h2>
            <Button
              variant="icon-only"
              color="neutral"
              size="small"
              IconLeft={Cross}
              onClick={handleClose}
            />
          </div>
          {error && (
            <div>
              <span className="text-red-500">{error}</span>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <Input
              label={'Nazwa konta'}
              value={name}
              type={'text'}
              Icon={Badge}
              placeholder={'Podaj nazwę konta ...'}
              handleChange={(e) => handleValueChange(e, setName)}
            />
            <SelectCategory
              value={category}
              handleChange={(e) => handleValueChange(e, setCategory)}
              handleCategoryOpen={handleCategoryModalOpen}
              categoryTypes={['ACCOUNT']}
            />
            <Input
              label={'Bilans'}
              value={balance}
              type={'number'}
              Icon={Money}
              placeholder={'0.00 zł'}
              handleChange={(e) => handleValueChange(e, setBalance)}
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
              onClick={handleCreate}
            />
          </div>
        </Modal>
      )}
      <ManageCategoriesModal open={categoryModalOpen} handleClose={handleCategoryModalClose} />
    </>
  )
}

export default ManageAccountModal
