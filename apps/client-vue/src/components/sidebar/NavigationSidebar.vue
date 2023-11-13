<script lang="ts">
import SidebarContainer from '../sidebar/SidebarContainer.vue'
import Home from '@icons/Home.vue'
import Exchange from '@icons/Exchange.vue'
import ArrowLeft from '@icons/ArrowLeft.vue'
import ArrowRight from '@icons/ArrowRight.vue'
import Star from '@icons/Star.vue'
import Wallet from '@icons/Wallet.vue'
import Chart from '@icons/Chart.vue'
import Bag from '@icons/Bag.vue'
import User from '@icons/User.vue'
import Settings from '@icons/Settings.vue'
import Info from '@icons/Info.vue'
import Logout from '@icons/Logout.vue'
import Plus from '@icons/Plus.vue'
import Logo from '../../components/logo/Logo.vue'
import DarkModeButton from '../buttons/DarkModeButton.vue'
import { ref } from 'vue'
import { Theme, useAppSettingsStore } from '@/stores/AppSettingsStore'
// import { useAppSettingsStore } from '@stores/AppSettingsStore'

export default {
  name: 'NavigationSidebar',
  components: {
    SidebarContainer,
    Home,
    Exchange,
    ArrowLeft,
    ArrowRight,
    Star,
    Wallet,
    Chart,
    Bag,
    User,
    Settings,
    Info,
    Logout,
    Logo,
    Plus,
    DarkModeButton
  },
  setup() {
    const appSettingsStore = useAppSettingsStore()

    const setTheme = (theme: Theme) => {
      appSettingsStore.setTheme(theme)
    }

    const open = ref(true)
    const toggle = () => {
      open.value = !open.value
    }

    return {
      open,
      toggle,
      setTheme,
      Theme
    }
  }
}
</script>

<template>
  <SidebarContainer :is-open="open" :toggle-function="toggle">
    <div class="flex flex-col">
      <!-- Logo + dzień noc -->
      <div class="flex fflex-row justify-between items-center mb-2">
        <Logo class="mb-2" />
        <DarkModeButton />
      </div>

      <div class="mb-4">
        <button
          class="text-sm flex flex-row w-full items-center justify-center gap-1 px-2 py-1 rounded-[8px] bg-primary-700 text-text-50 hover:bg-primary-600 transition-all ease-in-out duration-300"
        >
          <Plus class="text-xl" />Nowa transakcja
        </button>
      </div>

      <div class="mb-4">
        <button
          @click="setTheme(Theme.VUE)"
          class="text-sm flex flex-row w-full items-center justify-center gap-1 px-2 py-1 rounded-[8px] bg-text-500 text-text-50 hover:bg-primary-600 transition-all ease-in-out duration-300"
        >
          Vue
        </button>
      </div>
      <div class="mb-4">
        <button
          @click="setTheme(Theme.REACT)"
          class="text-sm flex flex-row w-full items-center justify-center gap-1 px-2 py-1 rounded-[8px] bg-primary-500 text-text-50 hover:bg-primary-600 transition-all ease-in-out duration-300"
        >
          React
        </button>
      </div>
      <div class="mb-4">
        <button
          @click="setTheme(Theme.QWIK)"
          class="text-sm flex flex-row w-full items-center justify-center gap-1 px-2 py-1 rounded-[8px] bg-primary-500 text-text-50 hover:bg-primary-600 transition-all ease-in-out duration-300"
        >
          Qwik
        </button>
      </div>

      <!-- Menu -->
      <div class="flex flex-col gap-1 mb-4">
        <span class="text-xs font-medium">Menu</span>
        <router-link to="/" class="sidebar-link">
          <Home class="text-base" />Strona główna</router-link
        >
        <router-link to="/transactions" class="sidebar-link">
          <Exchange class="text-base" />Transakcje</router-link
        >
        <router-link to="/transactions/expenses" class="sidebar-link">
          <ArrowLeft class="text-base" />Wydatki</router-link
        >
        <router-link to="/transactions/incomes" class="sidebar-link">
          <ArrowRight class="text-base" />Wpływy</router-link
        >
        <router-link to="/goals" class="sidebar-link"> <Star class="text-base" />Cele</router-link>
        <router-link to="/budgets" class="sidebar-link">
          <Wallet class="text-base" />Budżety</router-link
        >
        <router-link to="/reports" class="sidebar-link">
          <Chart class="text-base" />Raporty</router-link
        >
        <router-link to="/accounts" class="sidebar-link">
          <Bag class="text-base" />Konta</router-link
        >
      </div>
      <!-- Profil -->
      <div class="flex flex-col gap-1">
        <span class="text-xs font-medium">Profil</span>
        <router-link to="/profile" class="sidebar-link">
          <User class="text-base" />Profil</router-link
        >
        <router-link to="/settings" class="sidebar-link">
          <Settings class="text-base" />Ustawienia</router-link
        >
        <router-link to="/help" class="sidebar-link"> <Info class="text-base" />Pomoc</router-link>
      </div>
    </div>

    <div>
      <!-- Logout -->
      <router-link
        to="/login"
        class="text-sm flex flex-row w-full items-center gap-2 px-2 py-1 rounded-md hover:bg-background-100 transition-all ease-in-out duration-300"
      >
        <Logout class="text-base" />Wyloguj się
      </router-link>
    </div>
  </SidebarContainer>
</template>
