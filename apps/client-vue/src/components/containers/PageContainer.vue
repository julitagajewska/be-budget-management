<script lang="ts">
import Navbar from '../../components/Navbar.vue'
import { ref } from 'vue'
import SidebarContainer from '../sidebar/SidebarContainer.vue'
import ContentContainer from './ContentContainer.vue'
import NavigationSidebar from '../sidebar/NavigationSidebar.vue'
import UserDataSidebar from '../sidebar/UserDataSidebar.vue'

export default {
  name: 'MyComponent',
  components: {
    Navbar,
    SidebarContainer,
    ContentContainer,
    NavigationSidebar,
    UserDataSidebar
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

    <div class="flex flex-row justify-between h-full w-full px-5 py-5 gap-5 overflow-auto">
      <NavigationSidebar />

      <ContentContainer>
        <router-view></router-view>
      </ContentContainer>

      <UserDataSidebar />
    </div>
  </div>
</template>
