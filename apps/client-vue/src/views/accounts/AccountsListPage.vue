<script setup lang="ts">
import api from '@/services/api'
import { AccountDTO } from '../../../../../packages/shared-types/types'
import { onMounted, ref } from 'vue'
import AddAccountModal from '@/components/modal/modals/AddAccountModal.vue'

const accounts = ref<AccountDTO[]>([])

async function getAccounts() {
  accounts.value = await api.accounts.getUsersAccounts('123')
}

async function handleCreate(newAccount: Partial<AccountDTO>) {
  await api.accounts.createAccount(newAccount)
  getAccounts()
}

onMounted(getAccounts)
</script>

<template>
  <AddAccountModal :handle-create="handleCreate" />
  <div class="content-container">
    <h1>Konta</h1>
    <router-link
      v-for="account in accounts"
      :to="`/accounts/${account._id}`"
      class="bg-background-200 w-full rounded-lg px-10 py-6 hover:bg-background-100 transition-all ease-in-out duration-300"
    >
      {{ account.name }}
    </router-link>
  </div>
</template>
