<script lang="ts">
import { useUserStore } from '@stores/UserStore'
// import { router } from '@/main'
import { computed } from 'vue'
import CaretLeft from '@icons/CaretLeft.vue'
import CaretRight from '@icons/CaretRight.vue'
import Apps from '@icons/Apps.vue'

export default {
  props: [],
  components: {
    CaretLeft,
    CaretRight,
    Apps
  },
  setup() {
    const userStore = useUserStore()
    const isLoggedIn = computed(() => userStore.isLoggedIn)

    return {
      isLoggedIn
    }
  }
}
</script>

<template>
  <div class="content-container">
    <div v-if="!isLoggedIn">
      <h1>Strona powitalna</h1>
    </div>
    <div v-else class="flex flex-col h-full w-full gap-4 pt-5">
      <div class="flex flex-row justify-between items-center">
        <div class="w-40">
          <h1 class="text-lg font-medium">Główny dashboard</h1>
        </div>
        <div class="flex flex-row items-center gap-2 w-40">
          <button
            class="p-1 rounded-full hover:bg-background-100 transition-all ease-in-out duration-300"
          >
            <CaretLeft class="text-lg" />
          </button>
          <div class="flex flex-col justify-center items-center gap-0">
            <span class="text-sm font-medium">Kwiecień</span>
            <span class="text-xs">2023</span>
          </div>
          <button
            class="p-1 rounded-full hover:bg-background-100 transition-all ease-in-out duration-300"
          >
            <CaretRight class="text-lg" />
          </button>
        </div>

        <div class="flex flex-row justify-endw-40">
          <button
            class="p-[6px] rounded-full hover:bg-background-100 transition-all ease-in-out duration-300"
          >
            <Apps class="text-lg text-background-700" />
          </button>
        </div>
      </div>

      <div class="flex flex-row w-full justify-between gap-3">
        <div
          class="w-2/4 h-16 bg-background-50 shadow-md shadow-neutral-300 rounded-lg flex flex-col justify-center px-4"
        >
          <span class="text-xs">Nazwa konta</span>
          <span class="text-sm font-bold text-background-700">123 456.00 zł</span>
        </div>
        <div class="flex flex-row gap-3 w-full h-16 rounded-lg">
          <div
            class="w-full bg-background-50 shadow-md shadow-neutral-300 rounded-lg flex flex-col justify-center px-4"
          >
            <span class="text-xs">Dochód</span>
            <span class="text-sm font-bold text-green-600">12 345.00 zł</span>
          </div>
          <div
            class="w-full bg-background-50 shadow-md shadow-neutral-300 rounded-lg flex flex-col justify-center px-4"
          >
            <span class="text-xs">Wydatki</span>
            <span class="text-sm font-bold text-red-600">12 345.00 zł</span>
          </div>
          <div
            class="w-full bg-background-50 shadow-md shadow-neutral-300 rounded-lg flex flex-col justify-center px-4"
          >
            <span class="text-xs">Oszczędności</span>
            <span class="text-sm font-bold text-sky-600">12 345.00 zł</span>
          </div>
        </div>
      </div>

      <div class="flex flex-row h-64 justify-between gap-4">
        <div
          class="flex flex-col px-4 py-4 w-2/3 bg-background-50 rounded-lg shadow-md shadow-neutral-300"
        >
          <span class="text-sm font-bold">Wykres #1</span>
          <span class="text-xs">Historia wydatków</span>
        </div>
        <div
          class="flex flex-col px-4 py-4 w-1/3 bg-background-50 rounded-lg shadow-md shadow-neutral-300"
        >
          <span class="text-sm font-bold">Wykres #2</span>
          <span class="text-xs">Dystrybucja wydatków</span>
        </div>
      </div>

      <div class="flex flex-row h-64 justify-between gap-4">
        <div
          class="flex flex-col px-4 py-4 w-[45%] bg-background-50 rounded-lg shadow-md shadow-neutral-300"
        >
          <span class="text-sm font-bold">Wykres #3</span>
          <span class="text-xs">Zestawienie wydatków na przestrzeni</span>
          <span class="text-xs">ostatnich 6 miesięcy</span>
        </div>
        <div
          class="flex flex-col px-4 py-4 w-[55%] bg-background-50 rounded-lg shadow-md shadow-neutral-300"
        >
          <span class="text-sm font-bold">Tabela</span>
          <span class="text-xs">Ostatnie transackje</span>
        </div>
      </div>
    </div>
  </div>
</template>
