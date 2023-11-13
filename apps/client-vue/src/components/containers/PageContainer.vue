<script lang="ts">
import Navbar from '../../components/Navbar.vue'
import SidebarContainer from '../sidebar/SidebarContainer.vue'
import ContentContainer from './ContentContainer.vue'
import NavigationSidebar from '../sidebar/NavigationSidebar.vue'
import UserDataSidebar from '../sidebar/UserDataSidebar.vue'
import { computed, ref } from 'vue'
import { Theme, useAppSettingsStore } from '@stores/AppSettingsStore'

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
    const appSettingsStore = useAppSettingsStore()
    const mode = computed(() => appSettingsStore.getDarkMode)
    const theme = computed(() => appSettingsStore.getTheme)

    const themeClasses = computed(() => {
      let classes = ''

      switch (theme.value) {
        case Theme.VUE: {
          switch (mode.value) {
            case true: {
              classes += 'vue-dark'
              break
            }
            case false: {
              classes += 'vue-light'
              break
            }
          }
          break
        }
        case Theme.REACT: {
          switch (mode.value) {
            case true: {
              classes += 'react-dark'
              break
            }
            case false: {
              classes += 'react-light'
              break
            }
          }
          break
        }
        case Theme.QWIK: {
          switch (mode.value) {
            case true: {
              classes += 'qwik-dark'
              break
            }
            case false: {
              classes += 'qwik-light'
              break
            }
          }
          break
        }
      }

      return classes
    })

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
    :class="`${themeClasses} text-text-900 w-full min-h-[100vh] relative bg-background-50 flex flex-col justify-start items-start`"
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
