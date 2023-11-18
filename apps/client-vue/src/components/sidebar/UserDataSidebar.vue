<script lang="ts">
import SidebarContainer from '../sidebar/SidebarContainer.vue'
import { ref } from 'vue'
import Plus from '@icons/Plus.vue'
import SettingsAdjust from '@icons/SettingsAdjust.vue'

export default {
  name: 'NavigationSidebar',
  components: {
    SidebarContainer,
    Plus,
    SettingsAdjust
  },
  setup() {
    const open = ref(true)
    const toggle = () => {
      open.value = !open.value
    }

    return {
      open,
      toggle
    }
  }
}
</script>

<template>
  <SidebarContainer :is-open="open" :toggle-function="toggle">
    <div class="flex flex-col gap-3">
      <div
        class="flex flex-row gap-3 items-center hover:bg-background-100 hover:cursor-pointer transition-all ease-in-out duration-300 rounded-lg px-2 py-2"
      >
        <!-- User data -->
        <div class="bg-background-300 w-8 h-8 rounded-full"></div>
        <div class="flex flex-col">
          <span class="text-sm font-medium text-background-700">Jan Kowalski</span>
          <span class="text-xs text-bakcground-600">2 500 000.00 $</span>
        </div>
      </div>
      <!-- Twoje konta -->
      <div class="flex flex-row justify-between items-center">
        <span class="text-sm">Twoje konta</span>
        <button
          class="bg-neutral-200 p-[2px] hover:bg-neutral-300 transition-all ease-in-out duration-300 rounded-md"
        >
          <Plus class="text-lg" />
        </button>
      </div>

      <!-- Account tile -->
      <div
        class="flex flex-row items-center bg-neutral-100 hover:bg-neutral-200 transition-all ease-in-out duration-300 hover:cursor-pointer px-3 py-2 gap-3 rounded-lg"
      >
        <div class="w-8 h-8 bg-background-300 rounded-md"></div>
        <div class="flex flex-col">
          <span class="text-xs font-medium text-background-600">Wspólne</span>
          <span class="text-xs text-background-500">250 000.00 $</span>
        </div>
      </div>

      <div
        class="flex flex-row items-center bg-neutral-100 hover:bg-neutral-200 transition-all ease-in-out duration-300 hover:cursor-pointer px-3 py-2 gap-3 rounded-lg"
      >
        <div class="w-8 h-8 bg-background-300 rounded-md"></div>
        <div class="flex flex-col">
          <span class="text-xs font-medium text-background-600">Wspólne</span>
          <span class="text-xs text-background-500">250 000.00 $</span>
        </div>
      </div>

      <div
        class="flex flex-row items-center bg-neutral-100 hover:bg-neutral-200 transition-all ease-in-out duration-300 hover:cursor-pointer px-3 py-2 gap-3 rounded-lg"
      >
        <div class="w-8 h-8 bg-background-300 rounded-md"></div>
        <div class="flex flex-col">
          <span class="text-xs font-medium text-background-600">Wspólne</span>
          <span class="text-xs text-background-500">250 000.00 $</span>
        </div>
      </div>
      <!-- Cele -->
      <div class="flex flex-row justify-between items-center">
        <span class="text-sm">Cele</span>
        <button
          class="bg-neutral-200 p-[2px] hover:bg-neutral-300 transition-all ease-in-out duration-300 rounded-md"
        >
          <Plus class="text-lg" />
        </button>
      </div>

      <div
        class="flex flex-col bg-neutral-100 hover:bg-neutral-200 transition-all ease-in-out duration-300 hover:cursor-pointer px-3 pt-2 pb-4 gap-2 rounded-lg"
      >
        <div class="flex flex-row items-center gap-3">
          <div class="w-8 h-8 bg-background-300 rounded-md"></div>
          <div class="flex flex-col">
            <span class="text-xs font-medium text-background-600">Wspólne</span>
            <span class="text-xs text-background-500">250 000.00 $</span>
          </div>
        </div>
        <div class="flex flex-col gap-1">
          <div class="flex flex-row justify-between items-center">
            <sapn class="text-xs text-background-700">1 875.00 $</sapn>
            <sapn class="text-xs text-background-700">75%</sapn>
          </div>
          <div class="relative">
            <div class="w-full h-1 bg-neutral-300 rounded-full absolute"></div>
            <div class="w-3/4 h-1 bg-neutral-400 rounded-full absolute"></div>
          </div>
        </div>
      </div>

      <div
        class="flex flex-col bg-neutral-100 hover:bg-neutral-200 transition-all ease-in-out duration-300 hover:cursor-pointer px-3 pt-2 pb-4 gap-2 rounded-lg"
      >
        <div class="flex flex-row items-center gap-3">
          <div class="w-8 h-8 bg-background-300 rounded-md"></div>
          <div class="flex flex-col">
            <span class="text-xs font-medium text-background-600">Wspólne</span>
            <span class="text-xs text-background-500">250 000.00 $</span>
          </div>
        </div>
        <div class="flex flex-col gap-1">
          <div class="flex flex-row justify-between items-center">
            <sapn class="text-xs text-background-700">1 875.00 $</sapn>
            <sapn class="text-xs text-background-700">25%</sapn>
          </div>
          <div class="relative">
            <div class="w-full h-1 bg-neutral-300 rounded-full absolute"></div>
            <div class="w-1/4 h-1 bg-neutral-400 rounded-full absolute"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- Konfiguruj panel -->
    <button
      class="w-full flex flex-row justify-center gap-2 items-center text-background-700 bg-background-100 py-1 rounded-lg hover:bg-background-200 transition-all ease-in-out duration-300 hover:text-background-900"
    >
      <SettingsAdjust />
      <span class="text-sm">Konfiguruj panel</span>
    </button>
  </SidebarContainer>
</template>
