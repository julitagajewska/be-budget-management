<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { AccountDTO, CategoryDTO, TransactionDTO } from '../../../../../packages/shared-types/types'
import api from '../../services/api.ts'
import accountsService from '../../services/accountsService.ts'
import { useRoute } from 'vue-router'
import ArrowLeft from '@/components/icons/ArrowLeft.vue'
import { router } from '@/main'
import Button from '../../components/buttons/Button.vue'
import Trash from '@icons/Trash.vue'
import Edit from '@icons/Edit.vue'
import Filter from '@icons/Filter.vue'
import Plus from '@/components/icons/Plus.vue'
import DeleteAccountModal from '@/components/modal/account/DeleteAccountModal.vue'
import EditAccountModal from '@/components/modal/account/EditAccountModal.vue'
import AddTransactionModal from '@/components/modal/transaction/AddTransactionModal.vue'
import TransactionTableRow from '@/components/table/TransactionTableRow.vue'
import FilterTransactionsMenu from '@/components/menu/FilterTransactionsMenu.vue'
import SummaryDoughnut from '@/components/charts/SummaryDoughnut.vue'
import utils from 'shared-utils'
import Donut from '@/components/charts/Donut.vue'
import dayjs from 'dayjs'
import Bar from '@/components/charts/Bar.vue'

// STATE
const transactions = ref<TransactionDTO[]>([])
const filteredTransactions = ref<TransactionDTO[]>([])
const visibleTransactions = ref<TransactionDTO[]>([])

const categories = ref<CategoryDTO[]>([])
const account = ref<AccountDTO>()
const id = ref()
const searchInput = ref<string>('')

const incomesSum = computed(() =>
  transactions.value.filter((t) => !t.isExpense).reduce((prev, curr) => prev + curr.value, 0)
)

const expensesSum = computed(() =>
  transactions.value.filter((t) => t.isExpense).reduce((prev, curr) => prev + curr.value, 0)
)

// API
async function getTransactions(accountId: string) {
  transactions.value = await accountsService.getAccountsTransactions('123', accountId)
}

async function getCategories(id: string) {
  categories.value = await api.categories.getUsersCategories(id)
}

async function getAccountById(id: string) {
  api.accounts.getAccountById(id).then((response) => (account.value = response))
}

// HOOKS
const route = useRoute()
onMounted(() => {
  id.value = route.params.id
  getTransactions(id.value).then(() => {
    visibleTransactions.value = transactions.value
    filteredTransactions.value = transactions.value
  })
  getAccountById(id.value)
  getCategories('123')
})

// CHART OPTIONS
const selectedTransacitonType = ref<'INCOMES' | 'EXPENSES' | 'BOTH'>('INCOMES')
const selectedDataType = ref<'SUM' | 'COUNT'>('SUM')
const startDate = ref<string>(dayjs().format('YYYY-MM-DD').toString())
const endDate = ref<string>(dayjs().add(6, 'month').format('YYYY-MM-DD').toString())
const selectedChartType = ref<'DOUGHNUT' | 'BAR'>('DOUGHNUT')

// MODAL
const isEditAccountModalOpen = ref(false)
const isDeleteAccountModalOpen = ref(false)
const isAddTransactionModalOpen = ref(false)

// HANDLERS

const handleReturn = () => {
  router.push('/accounts')
}

const getCategoryName = (id: string) => categories.value.find((c) => c.id === id)?.name

function searchTransactions(
  transactions: TransactionDTO[],
  searchString: string
): TransactionDTO[] {
  const searchTerm = searchString.trim().toLowerCase()

  return transactions.filter((transaction) => {
    const { title, recipient } = transaction

    const titleMatch = title.toLowerCase().includes(searchTerm)
    const recipientMatch = recipient.toLowerCase().includes(searchTerm)

    return titleMatch || recipientMatch
  })
}

function handleSearch() {
  let transactions = searchTransactions(filteredTransactions.value, searchInput.value)
  visibleTransactions.value = transactions
}

// DELETE
function openDeleteAccountModal() {
  isDeleteAccountModalOpen.value = true
}

function closeDeleteAccountModal() {
  isDeleteAccountModalOpen.value = false
}

// EDIT
function openEditAccountModal() {
  isEditAccountModalOpen.value = true
}

function closeEditAccountModal() {
  isEditAccountModalOpen.value = false
}

// NEW TRANSACTION
function openAddTransactionModal() {
  isAddTransactionModalOpen.value = true
}

function closeAddTransactionModal() {
  isAddTransactionModalOpen.value = false
}

function handleRefetch() {
  getAccountById(id.value)
}

function handleRefetchTransactions() {
  getTransactions(id.value)
}

function setFilteredTransactions(transactions: TransactionDTO[]) {
  filteredTransactions.value = transactions
}

function setVisibleTransactions(transactions: TransactionDTO[]) {
  visibleTransactions.value = transactions
}

watch([searchInput, filteredTransactions], () => {
  if (searchInput.value) {
    handleSearch()
  } else {
    setVisibleTransactions(filteredTransactions.value)
  }
})
</script>

<template>
  <div class="content-container gap-8">
    <!-- PAGE HEADER -->
    <div class="w-full flex flex-row justify-between items-center">
      <div class="flex flex-row gap-4 items-center">
        <Button @click="handleReturn" color="neutral" class="px-1 h-6">
          <ArrowLeft class="text-base" /> Powrót
        </Button>
        <h1 class="text-lg text-background-800 font-semibold">{{ account?.name }}</h1>
      </div>
      <div class="flex flex-row gap-4">
        <Button color="neutral" @click="openDeleteAccountModal"
          ><Trash class="text-sm" /> Usuń konto</Button
        >
        <Button color="primary" @click="openEditAccountModal"
          ><Edit class="text-sm" /> Edytuj konto</Button
        >
      </div>
    </div>

    <!-- GENERAL INFO + OVERVIEW STATISTICS SECTION -->
    <div class="flex flex-row justify-between gap-4">
      <div class="flex flex-col w-1/2 gap-3">
        <h2 class="text-md font-semibold text-background-700">Informacje ogólne</h2>

        <div class="pl-4">
          <h3 class="font-semibold text-background-700">Nazwa</h3>
          <span class="text-background-600">{{ account?.name }}</span>
        </div>

        <div class="pl-4">
          <h3 class="font-semibold text-background-700">Kategoria konta</h3>
          <span class="text-background-600">{{ account?.category }}</span>
        </div>

        <div class="pl-4">
          <h3 class="font-semibold text-background-700">Bilans</h3>
          <span class="text-background-600">{{ account?.balance }} zł</span>
        </div>
      </div>
      <div class="flex flex-col w-1/2 gap-2 justify-between">
        <h2 class="text-md font-semibold text-background-700">Podsumowanie liczbowe</h2>

        <SummaryDoughnut :transactions="transactions" />

        <div class="w-full flex flex-row justify-center items-center gap-4">
          <div class="flex flex-col gap-1 w-48">
            <span class="text-sm text-background-600">Dochody</span>
            <div class="flex flex-row gap-2">
              <div class="w-4 h-4 rounded-[4px] bg-[#8dbe88]"></div>
              <span class="text-xs font-bold text-background-600">
                {{ utils.formatCurrency(incomesSum) }}
              </span>
            </div>
          </div>

          <div class="flex flex-col gap-1 w-48">
            <span class="text-sm text-background-600">Wydatki</span>
            <div class="flex flex-row gap-2">
              <div class="w-4 h-4 rounded-[4px] bg-[#e68080]"></div>
              <span class="text-xs font-bold text-background-600">
                {{ utils.formatCurrency(expensesSum) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TRANSACTIONS CHART SECTION -->
    <div class="flex flex-row justify-between gap-4">
      <div class="flex flex-col w-1/2 gap-3">
        <h2 class="text-md font-semibold text-background-700">Opcje wykresu</h2>

        <div class="flex flex-col pl-4 gap-1">
          <h3 class="font-semibold text-background-700">Rodzaj transakcji</h3>
          <div class="flex flex-row gap-4">
            <label class="text-sm text-background-600 w-20">
              <input
                type="radio"
                name="transaction-type"
                value="INCOMES"
                v-model="selectedTransacitonType"
              />
              Dochody
            </label>
            <label class="text-sm text-background-600 w-20">
              <input
                type="radio"
                name="transaction-type"
                value="EXPENSES"
                v-model="selectedTransacitonType"
              />
              Wydatki
            </label>
            <label class="text-sm text-background-600 w-20">
              <input
                type="radio"
                name="transaction-type"
                value="BOTH"
                v-model="selectedTransacitonType"
              />
              Wszystkie
            </label>
          </div>
        </div>

        <div class="flex flex-col pl-4 gap-1">
          <h3 class="font-semibold text-background-700">Rodzaj danych</h3>
          <div class="flex flex-row gap-4">
            <label class="text-sm text-background-600 w-20">
              <input type="radio" name="data-type" value="SUM" v-model="selectedDataType" /> Suma
            </label>
            <label class="text-sm text-background-600 w-20">
              <input type="radio" name="data-type" value="COUNT" v-model="selectedDataType" />
              Liczba
            </label>
          </div>
        </div>

        <div class="flex flex-col pl-4 gap-1">
          <h3 class="font-semibold text-background-700">Przedział czasowy</h3>
          <div class="flex flex-row gap-4 w-2/3">
            <div class="flex flex-col w-1/2">
              <label class="text-sm text-background-600"> Początek </label>
              <input type="date" name="date-start" class="w-full" v-model="startDate" />
            </div>
            <div class="flex flex-col w-1/2">
              <label class="text-sm text-background-600"> Koniec </label>
              <input type="date" name="date-end" class="w-full" v-model="endDate" />
            </div>
          </div>
        </div>

        <div class="flex flex-col pl-4 gap-1">
          <h3 class="font-semibold text-background-700">Rodzaj wykresu</h3>
          <div class="flex flex-row gap-4 w-2/3">
            <select
              name="chart-type"
              id="chart-type-select"
              class="w-full"
              v-model="selectedChartType"
            >
              <option value="DOUGHNUT">Wykres kołowy</option>
              <option value="BAR">Wykres słupkowy</option>
            </select>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-1/2 gap-3">
        <h2 class="text-md font-semibold text-background-700">Wykres podsumowujący</h2>
        <Donut
          v-if="selectedChartType === 'DOUGHNUT'"
          :transactions="transactions"
          :categories="categories"
          :transaction-type="selectedTransacitonType"
          :data-type="selectedDataType"
          :start-date="startDate"
          :end-date="endDate"
        />
        <Bar
          v-if="selectedChartType === 'BAR'"
          :transactions="transactions"
          :transaction-type="selectedTransacitonType"
          :data-type="selectedDataType"
          :start-date="startDate"
          :end-date="endDate"
        />
      </div>
    </div>

    <!-- TRANSACTIONS TABLE SECTION -->
    <div class="flex flex-col gap-4">
      <h3 class="font-semibold text-background-700">Lista transakcji</h3>
      <div class="w-full h-full flex flex-row justify-between">
        <div>
          <FilterTransactionsMenu
            :open="true"
            :transactions="transactions"
            :categories="categories"
            :set-visible-transactions="setFilteredTransactions"
          />
        </div>
        <div class="w-full">
          <div class="flex flex-row justify-between items-center">
            <div class="flex flex-row items-center gap-4">
              <Button><Filter class="text-base" /> <span>Filtruj</span></Button>
              <label> <input type="checkbox" /> Pokaż szczegółowe dane </label>
            </div>
            <div>
              <Button @click="openAddTransactionModal"
                ><Plus class="text-base" /> <span>Dodaj transakcje</span></Button
              >
            </div>
          </div>
          <input
            type="text"
            class="w-full"
            placeholder="Wyszukaj transakcję ..."
            v-model="searchInput"
          />
          <table>
            <thead>
              <th>Status</th>
              <th>Tytuł</th>
              <th>Data</th>
              <th>Odbiorca</th>
              <th>Opis</th>
              <th>Kategoria</th>
              <th>Kwota</th>
              <th>Akcja</th>
            </thead>

            <tbody>
              <TransactionTableRow
                v-for="t in visibleTransactions"
                :refetch="handleRefetchTransactions"
                :t="t"
                :category-name="getCategoryName(t.categoryId) || ''"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <DeleteAccountModal
      :account="account"
      :is-open="isDeleteAccountModalOpen"
      :open="openDeleteAccountModal"
      :close="closeDeleteAccountModal"
    />

    <EditAccountModal
      :account="account"
      :is-open="isEditAccountModalOpen"
      :open="openEditAccountModal"
      :close="closeEditAccountModal"
      :refetch="handleRefetch"
    />

    <AddTransactionModal
      :account="account"
      :is-open="isAddTransactionModalOpen"
      :open="openAddTransactionModal"
      :close="closeAddTransactionModal"
      :refetch="handleRefetchTransactions"
    />
  </div>
</template>
