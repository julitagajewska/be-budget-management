<script setup lang="ts">
import { CategoryDTO, TransactionDTO, TransactionStatus } from 'shared-types'
import Button from '../buttons/Button.vue'
import { computed, reactive } from 'vue'

// PROPS AND TYPES
type FilterTransactionsMenuProps = {
  open: boolean
  transactions: TransactionDTO[]
  categories: CategoryDTO[]
  setVisibleTransactions: (transactions: TransactionDTO[]) => void
}

type FilteringMenuState = {
  statuses: TransactionStatus[]
  dateFrom: string
  dateTo: string
  recipients: string[]
  categoryIds: string[]
  valueFrom: number
  valueTo: number
}

const props = withDefaults(defineProps<FilterTransactionsMenuProps>(), {})

// STATE
const state: FilteringMenuState = reactive({
  statuses: [],
  dateFrom: '',
  dateTo: '',
  recipients: [],
  categoryIds: [],
  valueFrom: 0,
  valueTo: 0
})

const allRecipients = computed(() => [...new Set(props.transactions.map((t) => t.recipient))])

const transacitonCategoriesIDs = computed(() => [
  ...new Set(props.transactions.map((t) => t.categoryId))
])

const transactionCategories = computed(() =>
  props.categories.filter((c) => transacitonCategoriesIDs.value.includes(c.id))
)

function filterTransactions(
  transactions: TransactionDTO[],
  filters: FilteringMenuState
): TransactionDTO[] {
  return transactions.filter((transaction) => {
    const { status, date, recipient, categoryId, value } = transaction

    const { statuses, dateFrom, dateTo, recipients, categoryIds, valueFrom, valueTo } = filters

    // Check if transaction status is included in the filter
    if (statuses.length > 0 && !statuses.includes(status)) {
      return false
    }

    // Check if transaction date is within the specified range
    if ((date < dateFrom || date > dateTo) && (dateFrom !== '' || dateTo !== '')) {
      return false
    }

    // Check if transaction recipient is included in the filter
    if (recipients.length > 0 && !recipients.includes(recipient)) {
      return false
    }

    // Check if transaction categoryId is included in the filter
    if (categoryIds.length > 0 && !categoryIds.includes(categoryId)) {
      return false
    }

    // Check if transaction value is within the specified range
    if ((value < valueFrom || value > valueTo) && (valueFrom !== 0 || valueTo !== 0)) {
      return false
    }

    // All filters passed, include this transaction
    return true
  })
}

// HANLDERS
function handleApply() {
  const filteredTransactions = filterTransactions(props.transactions, state)
  props.setVisibleTransactions(filteredTransactions)
}

function handleClear() {
  state.statuses = []
  state.dateFrom = ''
  state.dateTo = ''
  state.recipients = []
  state.categoryIds = []
  state.valueFrom = 0
  state.valueTo = 0
  props.setVisibleTransactions(props.transactions)
}
</script>

<template>
  <div
    :class="`${
      props.open ? 'w-72 visible' : 'w-[0px] hidden'
    } transition-all duration-300 ease-in-out overflow-hidden h-full bg-text-50 flex flex-col justify-between shadow-md rounded-md max-h-[500px] gap-4 py-6 pl-6 pr-3`"
  >
    <div class="flex flex-col gap-4 h-full overflow-auto">
      <h3 class="text-md font-semibold">Filtrowanie</h3>
      <div class="flex flex-col h-full gap-4 overflow-y-auto pr-4">
        <!-- STATUS -->
        <h4 className="text-xs font-bold">Status</h4>
        <div class="flex flex-col pl-2 gap-1">
          <label class="text-xs text-background-600 w-20 flex flex-row items-center gap-2">
            <input type="checkbox" value="FINISHED" v-model="state.statuses" />
            Zakończona
          </label>
          <label class="text-xs text-background-600 w-20 flex flex-row items-center gap-2">
            <input type="checkbox" value="PENDING" v-model="state.statuses" />
            Oczekująca
          </label>
        </div>

        <!-- DATA -->
        <div className="flex flex-col gap-2">
          <h4 className="text-xs font-bold">Data</h4>
          <div className="flex flex-col pl-2 gap-1">
            <div class="flex flex-col">
              <label
                class="text-xs text-background-600"
                htmlFor="filter-transactions-date-from-input"
                >Od</label
              >
              <input
                type="date"
                id="filter-transactions-date-from-input"
                v-model="state.dateFrom"
              />
            </div>

            <div class="flex flex-col">
              <label class="text-xs text-background-600" htmlFor="filter-transactions-date-to-input"
                >Do</label
              >
              <input type="date" id="filter-transactions-date-to-input" v-model="state.dateTo" />
            </div>
          </div>
        </div>

        <!-- ODBIORCA -->
        <div class="flex flex-col gap-2">
          <h4 className="text-xs font-bold">Odbiorca</h4>

          <div class="flex flex-col pl-2 gap-1">
            <label
              class="text-xs text-background-600 w-full flex flex-row items-center gap-2"
              v-for="recipient in allRecipients"
            >
              <input type="checkbox" :value="recipient" v-model="state.recipients" />
              {{ recipient }}
            </label>
          </div>
        </div>

        <!-- KATEGORIA -->
        <div class="flex flex-col gap-2">
          <h4 className="text-xs font-bold">Kategoria</h4>

          <div class="flex flex-col pl-2 gap-1">
            <label
              class="text-xs text-background-600 w-full flex flex-row items-center gap-2"
              v-for="category in transactionCategories"
            >
              <input type="checkbox" :value="category.id" v-model="state.categoryIds" />
              {{ category.name }}
            </label>
          </div>
        </div>

        <!-- KWOTA -->
        <div className="flex flex-col gap-2">
          <h4 className="text-xs font-bold">Kwota</h4>
          <div className="flex flex-col pl-2 gap-1">
            <div class="flex flex-col">
              <label
                class="text-xs text-background-600"
                htmlFor="filter-transactions-value-from-input"
                >Od</label
              >
              <input
                type="number"
                id="filter-transactions-value-from-input"
                v-model="state.valueFrom"
              />
            </div>

            <div class="flex flex-col">
              <label
                class="text-xs text-background-600"
                htmlFor="filter-transactions-value-to-input"
                >Do</label
              >
              <input
                type="number"
                id="filter-transactions-value-to-input"
                v-model="state.valueTo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-row items-center justify-center gap-4">
      <Button color="neutral" @click="handleClear">Resetuj</Button>
      <Button @click="handleApply">Aplikuj</Button>
    </div>
  </div>
</template>
