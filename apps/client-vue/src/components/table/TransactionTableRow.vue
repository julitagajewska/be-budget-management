<script setup lang="ts">
import { TransactionDTO } from 'shared-types'
import More from '../icons/More.vue'
import Menu from '../menu/Menu.vue'
import { ref } from 'vue'
import DeleteTransactionModal from '../modal/transaction/DeleteTransactionModal.vue'
import EditTransctionModal from '../modal/transaction/EditTransctionModal.vue'

// PROPS
type TransactionTableRowProps = {
  t: TransactionDTO
  categoryName: string
  refetch: () => void
}

const props = withDefaults(defineProps<TransactionTableRowProps>(), {})

// STATE
const menuOpen = ref<boolean>(false)
const isDeleteTransactionModalOpen = ref(false)
const isEditTransactionModalOpen = ref(false)

// HANDLERS
function openMenu() {
  menuOpen.value = true
}

function closeMenu() {
  menuOpen.value = false
}

// DELETE
function openDeleteTransactionModal() {
  isDeleteTransactionModalOpen.value = true
}

function closeDeleteTransactionModal() {
  isDeleteTransactionModalOpen.value = false
}

// EDIT
function openEditTransactionModal() {
  isEditTransactionModalOpen.value = true
}

function closeEditTransactionModal() {
  isEditTransactionModalOpen.value = false
}
</script>

<template>
  <tr>
    <td>{{ props.t.status }}</td>
    <td>{{ props.t.title }}</td>
    <td>{{ props.t.date }}</td>
    <td>{{ props.t.recipient }}</td>
    <td>{{ props.t.description }}</td>
    <td>{{ props.categoryName }}</td>
    <td>{{ props.t.value }}</td>
    <td>
      <Menu :isOpen="menuOpen" :open="openMenu" :close="closeMenu">
        <button @click="openMenu"><More /></button>
        <template v-slot:content>
          <div class="flex flex-col gap-1 w-fit items-start py-1">
            <button
              @click="openDeleteTransactionModal"
              class="hover:bg-background-100 transition-all duration-150 ease-in-out w-24 flex flex-row items-start px-4 py-1"
            >
              Usuń
            </button>
            <button
              @click="openEditTransactionModal"
              class="hover:bg-background-100 transition-all duration-150 ease-in-out w-24 flex flex-row items-start px-4 py-1"
            >
              Edytuj
            </button>
          </div>
        </template>
      </Menu>
    </td>
  </tr>
  <DeleteTransactionModal
    :transaction="t"
    :is-open="isDeleteTransactionModalOpen"
    :open="openDeleteTransactionModal"
    :close="closeDeleteTransactionModal"
    :refetch="props.refetch"
  />
  <EditTransctionModal
    :transaction="t"
    :is-open="isEditTransactionModalOpen"
    :open="openEditTransactionModal"
    :close="closeEditTransactionModal"
    :refetch="props.refetch"
  />
</template>
