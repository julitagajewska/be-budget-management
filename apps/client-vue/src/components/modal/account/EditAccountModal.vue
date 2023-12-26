<script setup lang="ts">
import api from '@/services/api'
import { AccountDTO, CategoryDTO } from 'shared-types'
import { onMounted, ref, watchEffect } from 'vue'
import accountsService from '@/services/accountsService'
import Modal from '../Modal.vue'

// PROPS
type EditAccountModalProps = {
  account: AccountDTO | undefined
}

type ModalProps = {
  isOpen: boolean
  open: () => void
  close: () => void
  refetch?: () => void
}

const props = withDefaults(defineProps<EditAccountModalProps & ModalProps>(), {})

// STATE
const categories = ref<CategoryDTO[]>([])
const name = ref<string>()
const balance = ref<number>()
const selectedCategory = ref<string>()

// API
async function getAccountsCategories() {
  categories.value = await accountsService.getAccountsCategories('123')
}

async function editAccount(editedAccount: Partial<AccountDTO>) {
  await api.accounts.editAccount(editedAccount)
}

// HANDLERS
async function handleConfirm() {
  let editedAccount = {
    ...props.account,
    name: name.value,
    balance: balance.value,
    category: selectedCategory.value
  }
  editAccount(editedAccount).then(() => {
    if (props.refetch) props.refetch()
  })
  props.close()
}

function handleCancel() {
  props.close()
}

// HOOKS
onMounted(() => {
  getAccountsCategories()
})

watchEffect(() => {
  if (props.account) {
    name.value = props.account.name
    balance.value = props.account.balance
    selectedCategory.value = props.account.category
  }
})
</script>

<template>
  <Modal
    v-if="isOpen"
    title="Edycja konta"
    :subtitle="account?.name"
    :handle-confirm="handleConfirm"
    :handle-cancel="handleCancel"
  >
    <!-- NAME -->
    <div class="flex flex-col">
      <label htmlFor="account-name">Nazwa</label>
      <input type="text" id="account-name" placeholder="Podaj nazwę konta ..." v-model="name" />
    </div>

    <!-- TYPE -->
    <div class="flex flex-col">
      <div class="flex flex-row justify-between items-center">
        <label htmlFor="accaount-category">Kategoria</label>
        <IconOnlyButton color="neutral" size="small"><Plus /></IconOnlyButton>
      </div>
      <!-- 
        <v-select v-model="selectedCategory" :options="categories" value="id" label="name">
        </v-select> -->
      <select
        name="category"
        id="accaount-category"
        v-model="selectedCategory"
        placeholder="Wybierz ktageorię konta..."
      >
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
    </div>

    <!-- BALANCE -->
    <div class="flex flex-col">
      <label htmlFor="account-balance">Stan konta</label>
      <input
        type="number"
        id="account-balance"
        placeholder="Podaj bilans konta ..."
        v-model="balance"
      />
    </div>
  </Modal>
</template>
