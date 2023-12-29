import { component$, useStore, $, useSignal, useStyles$ } from '@builder.io/qwik'
import type { CategoryDTO } from 'shared-types'
import { DeleteCategoryModal } from '../modal/categories/DeleteCategoryModal'
import { Popover, PopoverTrigger, usePopover } from '@qwik-ui/headless'
import { More } from '~/icons'
import { EditCategoryModal } from '../modal/categories/EditCategoryModal'

type CategoryTableRowProps = {
  category: CategoryDTO
  index: number
}

export const CategoryTableRow = component$(({ category, index }: CategoryTableRowProps) => {
  const state = useStore({
    isDeleteCategoryModalOpen: false,
    isEditCategoryModalOpen: false
  })

  // POPOVER
  useStyles$(`
  .my-transition {
    transition: opacity 0.5s, display 0.5s, overlay 0.5s;
    transition-behavior: allow-discrete;
    opacity: 0;
  }

  .popover-showing {
    opacity: 1;
  }

  .popover-closing {
    opacity: 0;
  }`)

  const { showPopover, togglePopover } = usePopover(`anchor-ref-${category.id}`)
  const triggerRef = useSignal<HTMLButtonElement>()
  const popoverRef = useSignal<HTMLElement>()

  const handleOpenDeleteCategoryModal = $(() => {
    togglePopover()
    state.isDeleteCategoryModalOpen = true
  })

  const handleCloseDeleteCategoryModal = $(() => {
    state.isDeleteCategoryModalOpen = false
  })

  const handleOpenEditCategoryModal = $(() => {
    togglePopover()
    state.isEditCategoryModalOpen = true
  })

  const handleCloseEditCategoryModal = $(() => {
    state.isEditCategoryModalOpen = false
  })

  return (
    <>
      <tr>
        <td class="w-full overflow-hidden text-ellipsis whitespace-nowrap">{index + 1}</td>
        <td class="w-full overflow-hidden text-ellipsis whitespace-nowrap">{category.name}</td>
        <td class="w-full overflow-hidden text-ellipsis whitespace-nowrap">
          {category.categoryType}
        </td>
        <td>
          <PopoverTrigger
            ref={triggerRef}
            onClick$={() => {
              showPopover()
            }}
            popovertarget={`anchor-ref-${category.id}`}
            class="rounded-md  px-1 py-1 hover:bg-background-100 transition-all duration-150 ease-in-out"
          >
            <More />
          </PopoverTrigger>

          <Popover
            ref={popoverRef}
            anchorRef={triggerRef}
            floating={true}
            placement="left"
            gutter={4}
            id={`anchor-ref-${category.id}`}
            class="my-transition listbox shadow-dark-low rounded-md "
          >
            <div class="flex flex-col gap-1 w-fit items-start py-1">
              <button
                class="hover:bg-background-100 transition-all duration-150 ease-in-out w-24 flex flex-row items-start px-4 py-1"
                onClick$={handleOpenDeleteCategoryModal}
              >
                Usuń
              </button>
              <button
                class="hover:bg-background-100 transition-all duration-150 ease-in-out w-24 flex flex-row items-start px-4 py-1"
                onClick$={handleOpenEditCategoryModal}
              >
                Edytuj
              </button>
            </div>
          </Popover>
        </td>
      </tr>

      {state.isDeleteCategoryModalOpen && (
        <DeleteCategoryModal
          category={category}
          open={handleOpenDeleteCategoryModal}
          close={handleCloseDeleteCategoryModal}
        />
      )}

      {state.isEditCategoryModalOpen && (
        <EditCategoryModal category={category} close={handleCloseEditCategoryModal} />
      )}
    </>
  )
})
