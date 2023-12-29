import type { QRL } from '@builder.io/qwik'
import { component$, $ } from '@builder.io/qwik'
import type { CategoryDTO, CategoryType } from 'shared-types'
import { Modal } from '../Modal'
import { useDeleteCategory } from '~/api/categoriesAPI'

const dataTypes: Record<CategoryType, string> = {
  ACCOUNT: 'konta',
  TRANSACTION: 'transakcje',
  GOAL: 'cele'
}

type DeleteCategoryModalProps = {
  category: CategoryDTO
  open: QRL<() => void>
  close: QRL<() => void>
}

export const DeleteCategoryModal = component$(({ category, close }: DeleteCategoryModalProps) => {
  const deleteCategory = useDeleteCategory()
  const handleConfirm = $(async () => {
    deleteCategory.submit({ id: category.id })
    close()
  })

  const handleCancel = $(() => {
    close()
  })

  return (
    <Modal
      title="Usuwanie transakcji"
      subtitle={category.name}
      handleConfirm={handleConfirm}
      handleCancel={handleCancel}
    >
      <span>Czy na pewno chcesz usunąć categorię {category.name}?</span>
      <span>
        Wszystkie powiązane z nią {dataTypes[category.categoryType as CategoryType]} zostaną
        usunięte!
      </span>
    </Modal>
  )
})
