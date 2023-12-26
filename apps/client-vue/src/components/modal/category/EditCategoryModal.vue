<script setup lang="ts">
import api from '@/services/api'
import { CategoryDTO, CategoryType } from 'shared-types'
import { ref, watchEffect } from 'vue'
import Modal from '../Modal.vue'

// TYPES
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

// PROPS
type EditCategoryModalProps = {
  category: CategoryDTO | undefined
}

type ModalProps = {
  isOpen: boolean
  open: () => void
  close: () => void
  refetch?: () => void
}

const props = withDefaults(defineProps<EditCategoryModalProps & ModalProps>(), {})

// STATE
const name = ref<string>()
const categoryType = ref<CategoryType>()

// API
async function editCategory(editedCategory: Partial<CategoryDTO>) {
  await api.categories.editCategory(editedCategory)
}

// HANDLERS
async function handleConfirm() {
  let editedCategory = {
    ...props.category,
    name: name.value,
    categoryType: categoryType.value
  }
  editCategory(editedCategory).then(() => {
    if (props.refetch) props.refetch()
  })
  props.close()
}

function handleCancel() {
  props.close()
}

// HOOKS
watchEffect(() => {
  if (props.category) {
    name.value = props.category.name
    categoryType.value = props.category.categoryType
  }
})
</script>

<template>
  <Modal
    v-if="isOpen"
    title="Edycja kategorii"
    :subtitle="category?.name"
    :handle-confirm="handleConfirm"
    :handle-cancel="handleCancel"
  >
    <!-- NAME -->
    <div class="flex flex-col pt-2">
      <label htmlFor="account-name">Nazwa</label>
      <input type="text" id="account-name" placeholder="Podaj nazwę kategorii ..." v-model="name" />
    </div>

    <!-- CATEGORY TYPE -->
    <div class="flex flex-col pt-2">
      <div class="flex flex-row justify-between items-center">
        <label htmlFor="category-type">Rodzaj kategorii</label>
      </div>
      <select
        name="category"
        id="category-type"
        v-model="categoryType"
        placeholder="Wybierz rodzaj kategorii ..."
      >
        <option v-for="t in types" :key="t.id" :value="t.value">
          {{ t.name }}
        </option>
      </select>
    </div>
  </Modal>
</template>
