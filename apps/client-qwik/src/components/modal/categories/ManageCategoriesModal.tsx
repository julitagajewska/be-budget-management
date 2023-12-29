import type { QRL } from '@builder.io/qwik'
import { component$, useStore, $ } from '@builder.io/qwik'
import type { CategoryDTO, CategoryType } from 'shared-types'
import { Modal } from '../Modal'
import { useAddCategory, useCategories } from '~/api/categoriesAPI'
import { CategoryTableRow } from '~/components/table/CategoryTableRow'
import { Plus } from '~/icons'
import { Button } from '~/components/buttons/Button'

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

type EditAccountModalProps = {
  close: QRL<() => void>
}

type ManageCategoriesStateType = {
  isEditCategoryModalOpen: boolean
  isDeleteCategoryModalOpen: boolean
  name: string
  categoryType: string
  selectedCategoryType: CategoryType
}

export const ManageCategoriesModal = component$(({ close }: EditAccountModalProps) => {
  const addCategory = useAddCategory()
  const categories = useCategories().value

  const state = useStore<ManageCategoriesStateType>({
    isEditCategoryModalOpen: false,
    isDeleteCategoryModalOpen: false,
    categoryType: 'ACCOUNT',
    name: '',
    selectedCategoryType: 'ACCOUNT'
  })

  const handleConfirm = $(async () => {
    const newCategory: Partial<CategoryDTO> = {
      name: state.name,
      categoryType: state.selectedCategoryType
    }
    console.log(newCategory)
    addCategory
      .submit(newCategory)
      .then((r) => console.log(r))
      .catch((e) => console.log(e))
  })

  const handleCancel = $(() => {
    close()
  })

  return (
    <>
      <Modal
        title="Zarządzanie kategoriami"
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        footer={false}
      >
        <div class="flex flex-col gap-1">
          <h5 class="text-sm font-bold text-background-700">Rodzaj kategorii</h5>
          <div class="flex flex-row gap-6 pl-4">
            <div class="flex flex-row gap-2">
              <input
                type="radio"
                checked={state.categoryType === 'ACCOUNT'}
                id="categories-categproes"
                value="ACCOUNT"
                onInput$={(e) =>
                  (state.categoryType = (e.target as HTMLInputElement).value).toString()
                }
              />
              <label for="categories-categproes">Konta</label>
            </div>
            <div class="flex flex-row gap-2">
              <input
                type="radio"
                checked={state.categoryType === 'TRANSACTION'}
                id="transaction-categories"
                value="TRANSACTION"
                onInput$={(e) =>
                  (state.categoryType = (e.target as HTMLInputElement).value).toString()
                }
              />
              <label for="transaction-categories">Transakcje</label>
            </div>
            <div class="flex flex-row gap-2">
              <input
                type="radio"
                checked={state.categoryType === 'GOAL'}
                id="categories-goal"
                value="GOAL"
                onInput$={(e) =>
                  (state.categoryType = (e.target as HTMLInputElement).value).toString()
                }
              />
              <label for="categories-goal">Cele</label>
            </div>
            <div class="flex flex-row gap-2">
              <input
                type="radio"
                checked={state.categoryType === 'ALL'}
                id="categories-all"
                value="ALL"
                onInput$={(e) =>
                  (state.categoryType = (e.target as HTMLInputElement).value).toString()
                }
              />
              <label for="categories-all">Wszystkie</label>
            </div>
          </div>
        </div>

        <div class="h-[300px] overflow-y-auto">
          <h5 class="text-sm font-bold text-background-700">Lista kategorii</h5>

          <table>
            <thead>
              <td>#</td>
              <td>Nazwa</td>
              <td>Typ</td>
              <td>Akcja</td>
            </thead>
            <tbody>
              {categories
                .filter((c) => {
                  if (state.categoryType === 'ALL') return true

                  return c.categoryType === state.categoryType
                })
                .map((c, i) => (
                  <CategoryTableRow category={c} index={i} key={`category-table-row-${c.id}`} />
                ))}
            </tbody>
          </table>
        </div>

        <div>
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

          <div class="flex flex-row w-full items-center justify-center pt-4">
            <Button color="primary" onClick={handleConfirm}>
              <Plus /> Dodaj kategorię
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
})
