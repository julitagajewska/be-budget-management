<script setup lang="ts">
import api from '@/services/api'
import Modal from '../Modal.vue'
import { TransactionDTO } from 'shared-types'

// PROPS
type DeleteTransactionModalProps = {
  transaction: TransactionDTO | undefined
}

type ModalProps = {
  isOpen: boolean
  open: () => void
  close: () => void
  refetch?: () => void
}

const props = withDefaults(defineProps<DeleteTransactionModalProps & ModalProps>(), {})

// API
async function deleteTransaction() {
  if (props.transaction) await api.transactions.deleteTransaction(props.transaction._id)
}

// HANDLERS
async function handleConfirm() {
  deleteTransaction().then(() => {
    if (props.refetch) props.refetch()
  })
  props.close()
}

function handleCancel() {
  props.close()
}
</script>

<template>
  <Modal
    v-if="isOpen"
    title="Usuwanie transakcji"
    :subtitle="transaction?.title"
    :handle-confirm="handleConfirm"
    :handle-cancel="handleCancel"
  >
    <span
      >Czy na pewno chcesz usunąć konto <b>{{ transaction?.title }}</b
      >?</span
    >
  </Modal>
</template>
