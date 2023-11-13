<script lang="ts">
import { useAppSettingsStore } from '@stores/AppSettingsStore'

import Sun from '@icons/Sun.vue'
import Moon from '@icons/Moon.vue'
import { computed } from 'vue'

export default {
  name: 'MyComponent',
  components: {
    Sun,
    Moon
  },
  setup() {
    const appSettingsStore = useAppSettingsStore()

    const mode = computed(() => appSettingsStore.getDarkMode)
    const theme = computed(() => appSettingsStore.getTheme)

    const themeClasses = computed(() =>
      mode.value ? `${theme.value}-dark` : `${theme.value}-light`
    )
    // const theme = computed(() => appSettingsStore.getTheme)

    const toggle = () => {
      appSettingsStore.toggleDarkMode()
      console.log(themeClasses.value)
    }

    return {
      mode,
      toggle
    }
  }
}
</script>

<template>
  <button
    class="hover:bg-background-100 transition-all ease-in-out duration-300 p-[6px] rounded-full"
    @click="toggle"
  >
    <Sun
      :class="`absolute ${
        mode ? 'rotate-0 opacity-100' : 'rotate-[-90deg] opacity-0'
      } transition-all duration-500 ease-in-out text-lg`"
    />
    <Moon
      :class="`${
        mode ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
      } transition-all duration-500 ease-in-out text-lg`"
    />
  </button>
</template>

<style scoped>
/* Add your component-specific styles here */
</style>
