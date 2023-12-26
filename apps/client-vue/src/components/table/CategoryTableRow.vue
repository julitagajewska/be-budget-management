<script setup lang="ts">
import { CategoryDTO } from 'shared-types'
import { ref } from 'vue'
import Menu from '../menu/Menu.vue'
import More from '../icons/More.vue'
import DeleteCategoryModal from '../modal/category/DeleteCategoryModal.vue'
import EditCategoryModal from '../modal/category/EditCategoryModal.vue'

// PROPS

type CategoryTableRowProps = {
  category: CategoryDTO
  index: number
  refetch: () => void
}

const props = withDefaults(defineProps<CategoryTableRowProps>(), {})

// STATE
const menuOpen = ref<boolean>(false)
const isDeleteCategoryModalOpen = ref(false)
const isEditCategoryModalOpen = ref(false)

// HANDLERS
function openMenu() {
  menuOpen.value = true
}

function closeMenu() {
  menuOpen.value = false
}

// DELETE
function openDeleteCategoryModal() {
  menuOpen.value = false
  isDeleteCategoryModalOpen.value = true
}

function closeDeleteCategoryModal() {
  isDeleteCategoryModalOpen.value = false
}

// EDIT
function openEditCategoryModal() {
  menuOpen.value = false
  isEditCategoryModalOpen.value = true
}

function closeEditCategoryModal() {
  isEditCategoryModalOpen.value = false
}
</script>

<template>
  <tr>
    <td>{{ props.index + 1 }}</td>
    <td>{{ props.category.name }}</td>
    <td>{{ props.category.categoryType }}</td>
    <td>
      <Menu :isOpen="menuOpen" :open="openMenu" :close="closeMenu">
        <button @click="openMenu"><More /></button>
        <template v-slot:content>
          <div class="flex flex-col gap-1 w-fit items-start py-1">
            <button
              @click="openDeleteCategoryModal"
              class="hover:bg-background-100 transition-all duration-150 ease-in-out w-24 flex flex-row items-start px-4 py-1"
            >
              Usuń
            </button>
            <button
              @click="openEditCategoryModal"
              class="hover:bg-background-100 transition-all duration-150 ease-in-out w-24 flex flex-row items-start px-4 py-1"
            >
              Edytuj
            </button>
          </div>
        </template>
      </Menu>
    </td>
  </tr>

  <!-- DELETE CATEGORY MODAL -->
  <DeleteCategoryModal
    :category="props.category"
    :is-open="isDeleteCategoryModalOpen"
    :open="openDeleteCategoryModal"
    :close="closeDeleteCategoryModal"
    :refetch="props.refetch"
  />

  <!-- EDIT CATEGORY MODAL -->
  <EditCategoryModal
    :category="props.category"
    :is-open="isEditCategoryModalOpen"
    :open="openEditCategoryModal"
    :close="closeEditCategoryModal"
    :refetch="props.refetch"
  />
</template>
