<script setup lang="ts">
import api from '@/services/api'
import { AccountDTO } from '../../../../../packages/shared-types/types'
import { onMounted, ref } from 'vue'
import Button from '@/components/buttons/Button.vue'
import Plus from '@/components/icons/Plus.vue'
import AddAccountModal from '@/components/modal/account/AddAccountModal.vue'
import ButtonOptions from '@/components/buttons/ButtonOptions.vue'

// STATE
const isAddAccountModalOpen = ref<boolean>(false)
const accounts = ref<AccountDTO[]>([])

// ...
async function getAccounts() {
  accounts.value = await api.accounts.getUsersAccounts('123')
}

onMounted(getAccounts)
// ...

// HANDLERS
function openAddAccountModal() {
  isAddAccountModalOpen.value = true
}

function handleRefetch() {
  getAccounts()
}

function closeAddAccountModal() {
  isAddAccountModalOpen.value = false
}
</script>

<template>
  <div class="flex flex-col pt-6 gap-6">
    <div class="flex flex-row w-full justify-between">
      <h1 class="text-md font-bold text-background-700">Konta</h1>
      <div class="flex flex-row gap-2">
        <Button @click="openAddAccountModal"><Plus class="text-md" /> Nowe konto</Button>
        <ButtonOptions><Plus class="text-md" /> Nowe konto (Options API)</ButtonOptions>
      </div>
    </div>

    <div class="flex flex-row flex-wrap">
      <router-link
        v-for="account in accounts"
        :to="`/accounts/${account._id}`"
        class="bg-background-200 w-1/3 rounded-lg px-10 py-6 hover:bg-background-100 transition-all ease-in-out duration-300"
      >
        {{ account.name }}
      </router-link>
    </div>
  </div>
  <AddAccountModal
    :is-open="isAddAccountModalOpen"
    :open="openAddAccountModal"
    :close="closeAddAccountModal"
    :refetch="handleRefetch"
  />
</template>
