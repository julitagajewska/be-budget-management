import { useState } from 'react'
import { CategoryDTO } from 'shared-types'
import Popup from '../popup/Popup'
import MenuButton from '../menu/MenuButton'
import { Edit, Other, Trash } from '../icons'
import Button from '../buttons/Button'
import CategoryTypeChip from '../chips/CategoryTypeChip'
import DeleteCategoryModal from '../modal/category/DeleteCategoryModal'
import EditCategoryModal from '../modal/category/EditCategoryModal'

type CategoriesTableRowProps = {
  category: CategoryDTO
  index: number
}

const CategoriesTableRow = ({ category, index }: CategoriesTableRowProps) => {
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
    <tr className="text-xs">
      <td align="center">{index + 1}</td>
      <td align="left" className="px-4">
        <div className="whitespace-nowrap overflow-hidden text-ellipsis w-24">{category.name}</div>
      </td>
      <td align="center" className="px-4 py-1">
        <CategoryTypeChip category={category} />
      </td>
      <td>
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
          <Button
            variant="icon-only"
            color="neutral"
            IconLeft={Other}
            size="small"
            onClick={handleMenuOpen}
          />
        </Popup>
      </td>
      <DeleteCategoryModal
        category={category}
        open={deleteModalOpen}
        handleClose={handleDeleteModalClose}
      />
      <EditCategoryModal
        category={category}
        open={editModalOpen}
        handleClose={handleEditModalClose}
      />
    </tr>
  )
}

export default CategoriesTableRow
