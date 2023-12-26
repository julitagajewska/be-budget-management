<script setup lang="ts">
import Plus from '../../icons/Plus.vue'
import Button from '../../buttons/Button.vue'
import Modal from '../Modal.vue'
import { onMounted, ref, watch } from 'vue'
import IconOnlyButton from '../../buttons/IconOnlyButton.vue'
import accountsService from '../../../services/accountsService'
import { AccountDTO, CategoryDTO } from '../../../../../../packages/shared-types/types'

type CreateAccountProps = {
  handleCreate: (newAccount: Partial<AccountDTO>) => void
}

const props = withDefaults(defineProps<CreateAccountProps>(), {})

const open = ref(false)
const categories = ref<CategoryDTO[]>([])
const name = ref<string>()
const balance = ref<number>()
const selectedCategory = ref<string>()

const emit = defineEmits(['refetch'])

async function getAccountsCategories() {
  categories.value = await accountsService.getAccountsCategories('123')
}

async function createAccount() {
  let newAccount: Partial<AccountDTO> = {
    name: name.value,
    balance: balance.value,
    category: selectedCategory.value
  }
  props.handleCreate(newAccount)
  handleClose()
}

const handleOpen = () => (open.value = true)
const handleClose = () => (open.value = false)
const handleConfirm = () => {
  createAccount()
}

onMounted(getAccountsCategories)
watch(selectedCategory, (newValue) => {
  console.log(newValue)
})
</script>

<template>
  <Button color="neutral" @click="handleOpen"> <Plus class="text-sm" /> Dodaj konto </Button>
  <Modal
    v-if="open"
    :title="'Nowe konto'"
    :handle-confirm="handleConfirm"
    :handle-cancel="handleClose"
  >
    <div class="flex flex-col gap-4 pt-2 pb-4">
      <div class="flex flex-col">
        <label htmlFor="account-name">Nazwa</label>
        <input type="text" id="account-name" placeholder="Podaj nazwę konta ..." v-model="name" />
      </div>

      <div class="flex flex-col">
        <label htmlFor="account-balance">Stan konta</label>
        <input
          type="number"
          id="account-balance"
          placeholder="Podaj bilans konta ..."
          v-model="balance"
        />
      </div>

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
    </div>
  </Modal>
</template>
