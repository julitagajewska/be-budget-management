<script lang="ts">
import Navbar from '../../components/Navbar.vue'
import { ref } from 'vue'
import SidebarContainer from '../sidebar/SidebarContainer.vue'
import ContentContainer from './ContentContainer.vue'
import Home from '@icons/Home.vue'
import Exchange from '@icons/Exchange.vue'
import Star from '@icons/Star.vue'
import Minus from '@icons/Minus.vue'

export default {
  name: 'MyComponent',
  components: {
    Navbar,
    SidebarContainer,
    ContentContainer,
    Home,
    Exchange,
    Star,
    Minus
  },
  setup() {
    const visible = ref(false)
    const naviagtionSidebarOpen = ref(true)
    const overviewSidebarOpen = ref(true)

    const toggleVisibility = () => {
      visible.value = !visible.value
    }

    const toggleNavigationSidebar = () => {
      naviagtionSidebarOpen.value = !naviagtionSidebarOpen.value
    }

    const toggleOverviewSidebar = () => {
      overviewSidebarOpen.value = !overviewSidebarOpen.value
    }

    return {
      visible,
      naviagtionSidebarOpen,
      overviewSidebarOpen,
      toggleVisibility,
      toggleNavigationSidebar,
      toggleOverviewSidebar
    }
  }
}
</script>

<template>
  <div
    class="vue-light text-text-900 w-full min-h-[100vh] relative bg-background-50 flex flex-col justify-start items-start"
  >
    <!-- <button @click="toggleVisibility">Toggle</button>
    <Navbar v-if="visible" /> -->

    <div
      class="flex flex-row justify-between h-full w-full px-5 py-5 gap-5 overflow-auto"
    >
      <SidebarContainer
        :is-open="naviagtionSidebarOpen"
        :toggle-function="toggleNavigationSidebar"
      >
        <div class="flex flex-col">
          <!-- Logo + dzień noc -->
          <!-- Menu -->
          <span class="text-sm font-medium">Menu</span>
          <a href="#" class="sidebar-link">
            <Home class="text-base" />Strona główna</a
          >
          <a href="#" class="sidebar-link">
            <Exchange class="text-base" />Transakcje</a
          >
          <a href="#" class="sidebar-link">
            <Exchange class="text-base" />Wydatki</a
          >
          <a href="#" class="sidebar-link">
            <Exchange class="text-base" />Wpływy</a
          >
          <a href="#" class="sidebar-link"> <Star class="text-base" />Cele</a>
          <a href="#" class="sidebar-link">
            <Minus class="text-base" />Budżety</a
          >
          <a href="#" class="sidebar-link">
            <Home class="text-base" />Raporty</a
          >
          <a href="#" class="sidebar-link"> <Home class="text-base" />Konta</a>
          <!-- Profil -->
          <span>Profil</span>
        </div>

        <div>
          <!-- Logout -->
          <button class="bg-primary-200">Wyloguj się</button>
        </div>
      </SidebarContainer>

      <ContentContainer>
        <router-view></router-view>
      </ContentContainer>

      <SidebarContainer
        :is-open="overviewSidebarOpen"
        :toggle-function="toggleOverviewSidebar"
      >
      </SidebarContainer>
    </div>
  </div>
</template>
