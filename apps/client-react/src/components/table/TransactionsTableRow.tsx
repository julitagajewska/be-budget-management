import { CategoryDTO, TransactionDTO } from 'shared-types'
import { Alarm, Check, Edit, Other, Trash } from '../icons'
import dayjs from 'dayjs'
import Button from '../buttons/Button'
import Popup from '../popup/Popup'
import { useState } from 'react'
import DeleteTransactionModal from '../modal/transaction/DeleteTransactionModal'
import MenuButton from '../menu/MenuButton'
import EditTransactionModal from '../modal/transaction/EditTransactionModal'

type TransactionsTableRowProps = {
  transaction: TransactionDTO
  categories: CategoryDTO[]
}

const TransactionsTableRow = ({ transaction, categories }: TransactionsTableRowProps) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)

  const handleMenuOpen = () => setMenuOpen(true)

  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true)
    setMenuOpen(false)
  }
  const handleDeleteModalClose = () => setDeleteModalOpen(false)

  const handleEditModalOpen = () => {
    setEditModalOpen(true)
    setMenuOpen(false)
  }
  const handleEditModalClose = () => setEditModalOpen(false)

  return (
    <tr className="hover:bg-background-100 transition-all duration-150 ease-in-out hover:cursor-pointer">
      <td className="overflow-hidden w-10 px-4" align="center">
        {transaction.status === 'PENDING' ? (
          <div className="w-5 h-5 bg-red-600 rounded-full flex flex-row justify-center items-center">
            <Alarm className="text-white" />
          </div>
        ) : (
          <div className="w-5 h-5 bg-green-600 rounded-full flex flex-row justify-center items-center">
            <Check className="text-white" />
          </div>
        )}
      </td>
      <td className="px-4">{transaction.title}</td>
      <td align="left" className="px-4">
        {dayjs(transaction.date).format('DD-MM-YYYY')}
      </td>
      <td className="px-4">{transaction.recipient}</td>
      <td className="px-4">{transaction.description}</td>
      <td className="px-4">{categories.find((c) => c.id == transaction.categoryId)?.name}</td>
      <td className="px-4">{transaction.value} zł</td>
      <td className="px-4" align="center">
        <Popup
          content={
            <span>
              <MenuButton text="Edytuj" icon={<Edit />} handleClick={handleEditModalOpen} />
              <MenuButton text="Usuń" icon={<Trash />} handleClick={handleDeleteModalOpen} />
            </span>
          }
          open={menuOpen}
          setOpen={setMenuOpen}
        >
          {/* <Button
            variant="icon-only"
            className="text-xl"
            color="transparent"
            IconLeft={Other}
            size="small"
            onClick={handleMenuOpen}
          /> */}
          <button onClick={handleMenuOpen} className="p-1 hover:bg-background-200 rounded-md">
            <Other />
          </button>
        </Popup>
      </td>
      <DeleteTransactionModal
        transaction={transaction}
        open={deleteModalOpen}
        handleClose={handleDeleteModalClose}
      />
      <EditTransactionModal
        transaction={transaction}
        open={editModalOpen}
        handleClose={handleEditModalClose}
      />
    </tr>
  )
}

export default TransactionsTableRow
