<script setup lang="ts">
import { onMounted, ref } from 'vue'
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
import More from '@/components/icons/More.vue'
import Modal from '@/components/modal/Modal.vue'

const route = useRoute()
const transactions = ref<TransactionDTO[]>([])
const categories = ref<CategoryDTO[]>([])
const account = ref<AccountDTO>()
const id = ref()

async function getTransactions(accountId: string) {
  transactions.value = await accountsService.getAccountsTransactions('123', accountId)
}

async function getCategories(id: string) {
  categories.value = await api.categories.getUsersCategories(id)
}

async function getAccountById(id: string) {
  account.value = await api.accounts.getAccountById(id)
}

async function deleteAccount(id: string) {
  await api.accounts.deleteAccount(id)
}

const handleReturn = () => {
  router.push('/accounts')
}

const getCategoryName = (id: string) => categories.value.find((c) => c.id === id)?.name

onMounted(() => {
  id.value = route.params.id
  getTransactions(id.value)
  getAccountById(id.value)
  getCategories('123')
})

// MODAL
const openEditModal = ref(false)
const openDeleteModal = ref(false)

const handleOpenEditModal = () => (openEditModal.value = true)
const handleCloseEdit = () => (openEditModal.value = false)

const handleOpenDeleteModal = () => (openDeleteModal.value = true)
const handleCloseDelete = () => (openDeleteModal.value = false)

const handleDelete = () => {
  router.push('/accounts')
  deleteAccount(account.value?._id ?? '')
  handleCloseDelete()
}
</script>

<template>
  <Modal
    v-if="openEditModal"
    :title="'abcd'"
    :handle-confirm="() => {}"
    :handle-cancel="handleCloseEdit"
    >abcd</Modal
  >
  <Modal
    v-if="openDeleteModal"
    :title="'Usuwanie konta'"
    :handle-confirm="handleDelete"
    :handle-cancel="handleCloseDelete"
    ><span>{{ `Czy na pewno chcesz usunąć konto: ${account?.name}?` }}</span></Modal
  >
  <div class="content-container gap-8">
    <!-- PAGE HEADER -->
    <div class="w-full flex flex-row justify-between items-center">
      <div class="flex flex-row gap-4 items-center">
        <Button @click="handleReturn" color="neutral" class="px-1 h-6">
          <ArrowLeft class="text-base" />
        </Button>
        <h1 class="text-lg text-background-800 font-semibold">{{ account?.name }}</h1>
      </div>
      <div class="flex flex-row gap-4">
        <Button color="neutral" @click="handleOpenDeleteModal"
          ><Trash class="text-sm" /> Usuń konto</Button
        >
        <Button color="primary" @click="handleOpenEditModal"
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

        <div class="w-full flex flex-row justify-center items-center gap-4">
          <div class="flex flex-col gap-1 w-48">
            <span class="text-sm text-background-600">Dochody</span>
            <div class="flex flex-row gap-2">
              <div class="w-4 h-4 rounded-[4px] bg-[#8dbe88]"></div>
              <span class="text-xs font-bold text-background-600"> TODO: Suma dochodów </span>
            </div>
          </div>

          <div class="flex flex-col gap-1 w-48">
            <span class="text-sm text-background-600">Wydatki</span>
            <div class="flex flex-row gap-2">
              <div class="w-4 h-4 rounded-[4px] bg-[#e68080]"></div>
              <span class="text-xs font-bold text-background-600"> TODO: Suma wydatków </span>
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
              <input type="radio" name="transaction-type" value="expenses" /> Wydatki
            </label>
            <label class="text-sm text-background-600 w-20">
              <input type="radio" name="transaction-type" value="incomes" /> Dochody
            </label>
            <label class="text-sm text-background-600 w-20">
              <input type="radio" name="transaction-type" value="both" /> Wszystkie
            </label>
          </div>
        </div>

        <div class="flex flex-col pl-4 gap-1">
          <h3 class="font-semibold text-background-700">Rodzaj danych</h3>
          <div class="flex flex-row gap-4">
            <label class="text-sm text-background-600 w-20">
              <input type="radio" name="data-type" value="count" /> Liczba
            </label>
            <label class="text-sm text-background-600 w-20">
              <input type="radio" name="data-type" value="sum" /> Suma
            </label>
          </div>
        </div>

        <div class="flex flex-col pl-4 gap-1">
          <h3 class="font-semibold text-background-700">Przedział czasowy</h3>
          <div class="flex flex-row gap-4 w-2/3">
            <div class="flex flex-col w-1/2">
              <label class="text-sm text-background-600"> Początek </label>
              <input type="date" name="date-start" class="w-full" />
            </div>
            <div class="flex flex-col w-1/2">
              <label class="text-sm text-background-600"> Koniec </label>
              <input type="date" name="date-end" class="w-full" />
            </div>
          </div>
        </div>

        <div class="flex flex-col pl-4 gap-1">
          <h3 class="font-semibold text-background-700">Rodzaj wykresu</h3>
          <div class="flex flex-row gap-4 w-2/3">
            <select name="chart-type" id="chart-type-select" class="w-full">
              <option value="donut">Wykres kołowy</option>
              <option value="bar">Wykres słupkowy</option>
            </select>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-1/2 gap-3">
        <h2 class="text-md font-semibold text-background-700">Wykres podsumowujący</h2>
        <!-- <Bar /> -->
      </div>
    </div>

    <!-- TRANSACTIONS TABLE SECTION -->
    <div class="flex flex-col gap-4">
      <h3 class="font-semibold text-background-700">Lista transakcji</h3>
      <div class="flex flex-row justify-between items-center">
        <div class="flex flex-row items-center gap-4">
          <Button><Filter class="text-base" /> <span>Filtruj</span></Button>
          <label> <input type="checkbox" /> Pokaż szczegółowe dane </label>
        </div>
        <div>
          <Button><Plus class="text-base" /> <span>Dodaj transakcje</span></Button>
        </div>
      </div>
      <input type="text" class="w-full" placeholder="Wyszukaj transakcję ..." />
      <table>
        <thead>
          <th>Status</th>
          <th>Tytuł</th>
          <th>Data</th>
          <th>Odbiorca</th>
          <th>Opis</th>
          <th>Kategoria</th>
          <th>Kwota</th>
          <th>Saldo</th>
          <th>Akcja</th>
        </thead>

        <tbody>
          <tr v-for="t in transactions">
            <td>{{ t.status }}</td>
            <td>{{ t.title }}</td>
            <td>{{ t.date }}</td>
            <td>{{ t.recipient }}</td>
            <td>{{ t.description }}</td>
            <td>{{ getCategoryName(t.categoryId) }}</td>
            <td>{{ t.value }}</td>
            <td>{{ account?.balance }}</td>
            <td>
              <button><More /></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- <h1>Konto</h1>
    <span>ID: {{ $route.params.id }}</span>
    <router-link
      to="/accounts"
      class="px-4 py-1 w-40 rounded-lg bg-background-200 hover:bg-background-100 transition-all ease-in-out duration-300"
      >Powrót</router-link
    >
    <ul>
      <li v-for="transaction in transactions">{{ transaction._id }} - {{ transaction.title }}</li>
    </ul>
    <ul>
      <li v-for="category in categories">{{ category.categoryType }} - {{ category.name }}</li>
    </ul> -->
  </div>
</template>
