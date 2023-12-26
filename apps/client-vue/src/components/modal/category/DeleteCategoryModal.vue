<script setup lang="ts">
import api from '@/services/api'
import Modal from '../Modal.vue'
import { CategoryDTO, CategoryType } from 'shared-types'

// PROPS
type DeleteAccountModalProps = {
  category: CategoryDTO | undefined
}

const dataTypes: Record<CategoryType, string> = {
  ACCOUNT: 'konta',
  TRANSACTION: 'transakcje',
  GOAL: 'cele'
}

type ModalProps = {
  isOpen: boolean
  open: () => void
  close: () => void
  refetch?: () => void
}

const props = withDefaults(defineProps<DeleteAccountModalProps & ModalProps>(), {})

// API
async function deleteCategory() {
  if (props.category)
    await api.categories.deleteCategory(props.category.id).then(() => {
      if (props.refetch) props.refetch()
    })
}

// HANDLERS
async function handleConfirm() {
  deleteCategory()
  props.close()
}

function handleCancel() {
  props.close()
}
</script>

<template>
  <Modal
    v-if="isOpen"
    title="Usuwanie kategorii"
    :subtitle="category?.name"
    :handle-confirm="handleConfirm"
    :handle-cancel="handleCancel"
  >
    <span
      >Czy na pewno chcesz usunąć kategorię <b>{{ category?.name }}</b
      >?</span
    >
    <span
      >Wszystkie powiązane z nią {{ dataTypes[category?.categoryType as CategoryType] }} zostaną
      usunięte!</span
    >
  </Modal>
</template>
