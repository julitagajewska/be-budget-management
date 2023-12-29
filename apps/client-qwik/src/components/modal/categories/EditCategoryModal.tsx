import type { QRL } from '@builder.io/qwik'
import { component$, useStore, $ } from '@builder.io/qwik'
import type { CategoryDTO, CategoryType } from 'shared-types'
import { Modal } from '../Modal'
import { useEditCategory } from '~/api/categoriesAPI'

type TypeOption = {
  id: number
  value: CategoryType
  name: string
}

const types: TypeOption[] = [
  {
    id: 0,
    value: 'ACCOUNT',
    name: 'Konta'
  },
  {
    id: 1,
    value: 'TRANSACTION',
    name: 'Transakcje'
  },
  {
    id: 2,
    value: 'GOAL',
    name: 'Cele'
  }
]

type EditCategoryModalProps = {
  category: CategoryDTO
  close: QRL<() => void>
}

type ManageCategoriesStateType = {
  name: string
  selectedCategoryType: CategoryType
}

export const EditCategoryModal = component$(({ category, close }: EditCategoryModalProps) => {
  const editCategory = useEditCategory()

  const state = useStore<ManageCategoriesStateType>({
    name: category.name,
    selectedCategoryType: category.categoryType
  })

  const handleConfirm = $(async () => {
    const editedCategory: Partial<CategoryDTO> = {
      ...category,
      name: state.name,
      categoryType: state.selectedCategoryType
    }
    await editCategory.submit(editedCategory)
    close()
  })

  const handleCancel = $(() => {
    close()
  })

  return (
    <>
      <Modal
        title="Edycja kategorii"
        subtitle={category.name}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
      >
        <div class="flex flex-col gap-1">
          <label for="account-name-input">Nazwa </label>
          <input
            id="account-name-input"
            type="text"
            value={state.name}
            onInput$={(e) => (state.name = (e.target as HTMLInputElement).value)}
          />
        </div>

        <div class="flex flex-col gap-1">
          <label for="account-category-select">Stan konta</label>
          <select
            value={state.selectedCategoryType}
            onChange$={(e) =>
              (state.selectedCategoryType = (e.target as HTMLSelectElement).value as CategoryType)
            }
          >
            {types.map((t) => (
              <option value={t.value} key={`category-type-select-option-${t.id}`}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </Modal>
    </>
  )
})
