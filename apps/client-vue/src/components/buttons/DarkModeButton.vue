<script lang="ts">
import { ref } from 'vue'
import Sun from '@icons/Sun.vue'
import Moon from '@icons/Moon.vue'

export default {
  name: 'MyComponent',
  components: {
    Sun,
    Moon
  },
  setup() {
    // Data using ref
    const mode = ref(false)

    // Data using reactive
    // const data = reactive({
    //   description: 'This is a basic Vue component using the Composition API'
    // })

    // Method
    const toggle = () => {
      mode.value = !mode.value
    }

    // Expose data and methods to the template
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
