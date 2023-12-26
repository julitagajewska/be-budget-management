<script setup lang="ts">
import { CategoryDTO, TransactionDTO, TransactionStatus } from 'shared-types'
import { onMounted, reactive, ref, watchEffect } from 'vue'
import Modal from '../Modal.vue'
import api from '@/services/api'

// PROPS
type StatusOption = {
  id: number
  value: TransactionStatus
  name: string
}

const statuses: StatusOption[] = [
  {
    id: 0,
    value: 'FINISHED',
    name: 'Opłacona'
  },
  {
    id: 1,
    value: 'PENDING',
    name: 'Oczekująca'
  }
]

type EditTransactionModalProps = {
  transaction: TransactionDTO | undefined
}

type ModalProps = {
  isOpen: boolean
  open: () => void
  close: () => void
  refetch?: () => void
}

const props = withDefaults(defineProps<EditTransactionModalProps & ModalProps>(), {})

// STATE
const categories = ref<CategoryDTO[]>([])

const state: {
  categoryId: string
  status: TransactionStatus
  recipient: string
  title: string
  value: number
  isExpense: boolean
  isRecurring: boolean
  date: string
  description: string
} = reactive({
  categoryId: '',
  status: 'FINISHED',
  recipient: '',
  title: '',
  value: 0,
  isExpense: false,
  isRecurring: false,
  date: '',
  description: ''
})

// API
async function getTransactionCategories() {
  api.categories.getUsersCategories('123').then((response) => {
    categories.value = response.filter((c) => c.categoryType === 'TRANSACTION')
  })
}

async function editTransaction(newTransacion: Partial<TransactionDTO>) {
  await api.transactions.editTransaction(newTransacion)
}

// HANDLERS
async function handleConfirm() {
  editTransaction({ ...props.transaction, ...state }).then(() => {
    if (props.refetch) props.refetch()
  })
  props.close()
}

function handleCancel() {
  props.close()
}

// HOOKS
onMounted(() => {
  getTransactionCategories()
})

watchEffect(() => {
  if (props.transaction) {
    state.categoryId = props.transaction.categoryId
    ;(state.status = props.transaction.status), (state.recipient = props.transaction.recipient)
    state.title = props.transaction.title
    state.value = props.transaction.value
    state.isExpense = props.transaction.isExpense
    state.isRecurring = props.transaction.isRecurring
    state.date = props.transaction.date
    state.description = props.transaction.description
  }
})
</script>

<template>
  <Modal
    v-if="isOpen"
    title="Nowa transakcja"
    :handle-confirm="handleConfirm"
    :handle-cancel="handleCancel"
  >
    <!-- KATEGORIA -->
    <div class="flex flex-col">
      <div class="flex flex-row justify-between items-center">
        <label htmlFor="transaction-category">Kategoria</label>
        <IconOnlyButton color="neutral" size="small"><Plus /></IconOnlyButton>
      </div>
      <select
        name="category"
        id="transaction-category"
        v-model="state.categoryId"
        placeholder="Wybierz ktageorię transakcji..."
      >
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
    </div>

    <!-- STATUS -->
    <div class="flex flex-col">
      <div class="flex flex-row justify-between items-center">
        <label htmlFor="transaction-status">Status</label>
      </div>
      <select
        name="category"
        id="transaction-status"
        v-model="state.status"
        placeholder="Wybierz status transakcji..."
      >
        <option v-for="status in statuses" :key="status.id" :value="status.value">
          {{ status.name }}
        </option>
      </select>
    </div>

    <!-- ODBIORCA -->
    <div class="flex flex-col">
      <label htmlFor="transaction-recipient">Odbiorca</label>
      <input
        type="text"
        id="transaction-recipient"
        placeholder="Podaj nazwę konta ..."
        v-model="state.recipient"
      />
    </div>

    <!-- NAZWA -->
    <div class="flex flex-col">
      <label htmlFor="transaction-title">Tytuł</label>
      <input
        type="text"
        id="transaction-title"
        placeholder="Podaj tytuł transakcji ..."
        v-model="state.title"
      />
    </div>

    <!-- WARTOŚĆ -->
    <div class="flex flex-col">
      <label htmlFor="transaction-value">Wartość</label>
      <input
        type="number"
        id="transaction-value"
        placeholder="Podaj wartość transakcji ..."
        v-model="state.value"
      />
    </div>

    <!-- WYDATEK -->
    <div class="flex flex-row gap-2">
      <input type="checkbox" id="transaction-is-expense" v-model="state.isExpense" />
      <label htmlFor="transaction-is-expense">Wydatek</label>
    </div>

    <!-- TRANSAKCJA CYKLICZNA -->
    <div class="flex flex-row gap-2">
      <input type="checkbox" id="transaction-is-recurring" v-model="state.isRecurring" />
      <label htmlFor="transaction-is-recurring">Powtarza się</label>
    </div>

    <!-- DATA -->
    <div class="flex flex-col">
      <label htmlFor="transaction-date">Data</label>
      <input
        type="date"
        id="transaction-date"
        placeholder="Podaj datę transakcji ..."
        v-model="state.date"
      />
    </div>

    <!-- OPIS -->
    <div class="flex flex-col">
      <label htmlFor="transaction-recipient">Opis</label>
      <textarea
        id="transaction-recipient"
        placeholder="Podaj opis transakcji ..."
        v-model="state.description"
      ></textarea>
    </div>
  </Modal>
</template>
