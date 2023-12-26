<script setup lang="ts">
import IconOnlyButton from '@/components/buttons/IconOnlyButton.vue'
import Cross from '@/components/icons/Cross.vue'
import { CategoryDTO, CategoryType } from 'shared-types'
import { onMounted, ref, watch } from 'vue'
import Button from '@/components/buttons/Button.vue'
import Plus from '@/components/icons/Plus.vue'
import api from '@/services/api'
import CategoryTableRow from '@/components/table/CategoryTableRow.vue'

// PROPS
type TypeOption = {
  id: number
  value: CategoryType
  name: string
}

const types: TypeOption[] = [
  {
    id: 0,
    value: 'ACCOUNT',
    name: 'Konta'
  },
  {
    id: 1,
    value: 'TRANSACTION',
    name: 'Transakcje'
  },
  {
    id: 2,
    value: 'GOAL',
    name: 'Cele'
  }
]

type ModalProps = {
  isOpen: boolean
  open: () => void
  close: () => void
  refetch?: () => void
}

const props = withDefaults(defineProps<ModalProps>(), {})

// STATE
const allCategories = ref<CategoryDTO[]>()
const visibleCategories = ref<CategoryDTO[]>()
const name = ref<string>()
const type = ref<CategoryType>('ACCOUNT')

const categoryType = ref<CategoryType | 'ALL'>('ACCOUNT')

// HANDLERS

function handleCancel() {
  props.close()
}

// API
async function getCategories(id: string) {
  allCategories.value = await api.categories.getUsersCategories(id)
}

// async function getCategoriesByType(id: string, type: CategoryType) {
//   let allCategories = await api.categories.getUsersCategories(id)
//   visibleCategories.value = allCategories.filter((c) => c.categoryType === type)
// }

async function createCategory(newCategory: Partial<CategoryDTO>) {
  await api.categories.createCategory(newCategory).then(() => {
    handleRefetch()
  })
}

// async function deleteCategoty(id: string) {
//   await api.categories.deleteCategory(id).then(() => {
//     if(props.refetch) props.refetch()
//   })
// }

function handleCreate() {
  let newCategory: Partial<CategoryDTO> = {
    name: name.value,
    categoryType: type.value
  }

  createCategory(newCategory)
}

function handleRefetch() {
  getCategories('123')
}

function handleVisibleCategoriesUpdate() {
  console.log(categoryType.value)
  if (categoryType.value === 'ALL') {
    visibleCategories.value = allCategories.value
  } else {
    visibleCategories.value = allCategories.value?.filter(
      (c) => c.categoryType === categoryType.value
    )
  }
}

onMounted(() => {
  getCategories('123')
  handleVisibleCategoriesUpdate()
})

watch([allCategories, categoryType], () => {
  handleVisibleCategoriesUpdate()
})

// HOOKS
</script>

<template>
  <div
    class="w-full h-full bg-black bg-opacity-25 backdrop-blur-sm fixed top-0 left-0 z-10 flex flex-row justify-center items-center"
    v-if="props.isOpen"
  >
    <div class="bg-background-50 w-[450px] rounded-md shadow-md flex flex-col py-4 px-6 gap-4">
      <!-- HEADER -->
      <div class="w-full flex flex-row justify-between items-start">
        <div class="flex flex-col">
          <h4 class="text-base font-bold text-background-700">Zarządzanie kategoriami</h4>
        </div>
        <IconOnlyButton color="neutral" size="small" class="px-1 h-6" @click="handleCancel"
          ><Cross
        /></IconOnlyButton>
      </div>

      <div class="flex flex-col gap-1">
        <h5 class="text-sm font-bold text-background-700">Rodzaj kategorii</h5>
        <div class="flex flex-row gap-6 pl-4">
          <div class="flex flex-row gap-2">
            <input
              type="radio"
              :checked="categoryType === 'ACCOUNT'"
              id="categories-categproes"
              value="ACCOUNT"
              v-model="categoryType"
            />
            <label htmlFor="categories-categproes">Konta</label>
          </div>
          <div class="flex flex-row gap-2">
            <input
              type="radio"
              :checked="categoryType === 'TRANSACTION'"
              id="transaction-categories"
              value="TRANSACTION"
              v-model="categoryType"
            />
            <label htmlFor="transaction-categories">Transakcje</label>
          </div>
          <div class="flex flex-row gap-2">
            <input
              type="radio"
              :checked="categoryType === 'GOAL'"
              id="categories-goal"
              value="GOAL"
              v-model="categoryType"
            />
            <label htmlFor="categories-goal">Cele</label>
          </div>
          <div class="flex flex-row gap-2">
            <input
              type="radio"
              :checked="categoryType === 'ALL'"
              id="categories-all"
              value="ALL"
              v-model="categoryType"
            />
            <label htmlFor="categories-all">Wszystkie</label>
          </div>
        </div>
      </div>

      <div>
        <h5 class="text-sm font-bold text-background-700">Lista kategorii</h5>

        <table>
          <thead>
            <td>#</td>
            <td>Nazwa</td>
            <td>Typ</td>
            <td>Akcja</td>
          </thead>
          <tbody>
            <CategoryTableRow
              v-for="(category, i) in visibleCategories"
              :category="category"
              :index="i"
              :refetch="
                () => {
                  getCategories('123')
                }
              "
            >
            </CategoryTableRow>
          </tbody>
        </table>
      </div>

      <div>
        <h5 class="text-sm font-bold text-background-700">Nowa kategoria</h5>
        <div class="">
          <div class="flex flex-col pt-2">
            <label htmlFor="account-name">Nazwa</label>
            <input
              type="text"
              id="account-name"
              placeholder="Podaj nazwę kategorii ..."
              v-model="name"
            />
          </div>
          <!-- CATEGORY TYPE -->
          <div class="flex flex-col pt-2">
            <div class="flex flex-row justify-between items-center">
              <label htmlFor="category-type">Rodzaj kategorii</label>
            </div>
            <select
              name="category"
              id="category-type"
              v-model="type"
              placeholder="Wybierz rodzaj kategorii ..."
            >
              <option v-for="t in types" :key="t.id" :value="t.value">
                {{ t.name }}
              </option>
            </select>
          </div>
          <div class="flex flex-row justify-center w-full pt-4">
            <Button @click="handleCreate"><Plus class="text-md" /> Utwórz kategorie</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
