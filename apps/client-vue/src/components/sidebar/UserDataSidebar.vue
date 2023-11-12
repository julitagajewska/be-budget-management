<script lang="ts">
import SidebarContainer from '../sidebar/SidebarContainer.vue'
import Plus from '@icons/Plus.vue'
import { ref } from 'vue'

export default {
  name: 'NavigationSidebar',
  components: {
    SidebarContainer,
    Plus
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
    <!-- User data -->
    <!-- Twoje konta -->
    <!-- Cele -->
    <!-- Konfiguruj panel -->
  </SidebarContainer>
</template>
