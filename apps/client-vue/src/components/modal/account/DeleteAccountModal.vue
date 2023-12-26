<script setup lang="ts">
import api from '@/services/api'
import Modal from '../Modal.vue'
import { AccountDTO } from 'shared-types'
import { router } from '@/main'

// PROPS
type DeleteAccountModalProps = {
  account: AccountDTO | undefined
}

type ModalProps = {
  isOpen: boolean
  open: () => void
  close: () => void
  refetch?: () => void
}

const props = withDefaults(defineProps<DeleteAccountModalProps & ModalProps>(), {})

// API
async function deleteAccount() {
  if (props.account) await api.accounts.deleteAccount(props.account._id)
}

// HANDLERS
async function handleConfirm() {
  deleteAccount()
  props.close()
  router.push('/accounts')
}

function handleCancel() {
  props.close()
}
</script>

<template>
  <Modal
    v-if="isOpen"
    title="Usuwanie konta"
    :subtitle="account?.name"
    :handle-confirm="handleConfirm"
    :handle-cancel="handleCancel"
  >
    <span
      >Czy na pewno chcesz usunąć konto <b>{{ account?.name }}</b
      >?</span
    >
  </Modal>
</template>
