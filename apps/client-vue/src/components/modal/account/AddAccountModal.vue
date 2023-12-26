<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Modal from '../Modal.vue'
import CategoryDTO from 'shared-types/types/dto/category/CategoryDTO'
import accountsService from '@/services/accountsService'
import AccountDTO from 'shared-types/types/dto/AccountDTO'
import api from '@/services/api'
import IconOnlyButton from '@/components/buttons/IconOnlyButton.vue'
import Plus from '@/components/icons/Plus.vue'
import ManageCategoryModal from '../category/ManageCategoryModal.vue'

// PROPS
type AddAccountModal = {
  isOpen: boolean
  open: () => void
  close: () => void
  refetch: () => void
}

const props = withDefaults(defineProps<AddAccountModal>(), {})

// STATE
const categories = ref<CategoryDTO[]>([])
const name = ref<string>()
const balance = ref<number>()
const selectedCategory = ref<string>()

const isCategoryMenuOpen = ref<boolean>(false)

// API CALLS
async function getAccountsCategories() {
  categories.value = await accountsService.getAccountsCategories('123')
}

async function createAccount(account: Partial<AccountDTO>) {
  await api.accounts.createAccount(account)
}

// HANDLERS
function handleReset() {
  name.value = ''
  balance.value = 0
  selectedCategory.value = categories.value[0].id
}

async function handleConfirm() {
  let newAccount: Partial<AccountDTO> = {
    name: name.value,
    balance: balance.value,
    category: selectedCategory.value
  }
  await createAccount(newAccount)
  props.close()
  props.refetch()
  handleReset()
}

function handleCancel() {
  props.close()
  handleReset()
}

function handleOpenCategoriesMenu() {
  props.close()
  isCategoryMenuOpen.value = true
}

function handleCloseCategoriesMenu() {
  props.open()
  isCategoryMenuOpen.value = false
}

// HOOKS
onMounted(getAccountsCategories)
</script>

<template>
  <Modal
    v-if="isOpen"
    title="Nowe konto"
    :handle-confirm="handleConfirm"
    :handle-cancel="handleCancel"
  >
    <!-- NAZWA -->
    <div class="flex flex-col">
      <label htmlFor="account-name">Nazwa</label>
      <input type="text" id="account-name" placeholder="Podaj nazwę konta ..." v-model="name" />
    </div>

    <!-- KATEGORIA -->
    <div class="flex flex-col">
      <div class="flex flex-row justify-between items-center">
        <label htmlFor="accaount-category">Kategoria</label>
        <IconOnlyButton color="neutral" size="small" @click="handleOpenCategoriesMenu"
          ><Plus
        /></IconOnlyButton>
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

    <!-- BILANS -->
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
  <ManageCategoryModal
    :is-open="isCategoryMenuOpen"
    :open="handleOpenCategoriesMenu"
    :close="handleCloseCategoriesMenu"
  />
</template>
