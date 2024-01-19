<script lang="ts">
import Navbar from '../../components/Navbar.vue'
import SidebarContainer from '../sidebar/SidebarContainer.vue'
import ContentContainer from './ContentContainer.vue'
import NavigationSidebar from '../sidebar/NavigationSidebar.vue'
import UserDataSidebar from '../sidebar/UserDataSidebar.vue'
import { computed, ref } from 'vue'
import { useAppSettingsStore } from '@stores/AppSettingsStore'
import { useUserStore } from '@stores/UserStore'
import { getThemeClasses } from '@utils/getThemeClasses'

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
    // User store
    const userStore = useUserStore()
    const isLoggedIn = computed(() => userStore.isLoggedIn)

    const appSettingsStore = useAppSettingsStore()
    const mode = computed(() => appSettingsStore.getDarkMode)
    const theme = computed(() => appSettingsStore.getTheme)

    const themeClasses = computed(() => getThemeClasses(theme.value, mode.value))

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
      isLoggedIn,
      mode,
      visible,
      themeClasses,
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
    :class="`${themeClasses} text-text-900 font-mulish w-full min-h-[100vh] relative bg-background-50 flex flex-col justify-start items-start`"
  >
    <div class="flex flex-row justify-between h-full w-full px-5 py-5 gap-5 overflow-auto">
      <NavigationSidebar v-if="isLoggedIn" />

      <ContentContainer>
        <router-view></router-view>
      </ContentContainer>

      <UserDataSidebar v-if="isLoggedIn" />
    </div>
  </div>
</template>
