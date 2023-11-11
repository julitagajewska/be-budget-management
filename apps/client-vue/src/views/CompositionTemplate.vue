<script lang="ts">
import { ref, reactive } from 'vue'

export default {
  name: 'MyComponent',
  setup() {
    // Data using ref
    const title = ref('My Component')
    const count = ref(0)

    // Data using reactive
    const data = reactive({
      description: 'This is a basic Vue component using the Composition API'
    })

    // Method
    const increaseCount = () => {
      count.value += 1
    }

    // Expose data and methods to the template
    return {
      title,
      description: data.description,
      count,
      increaseCount
    }
  }
}
</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    <button @click="increaseCount">Click me</button>
    <p>Count: {{ count }}</p>
  </div>
</template>

<style scoped>
/* Add your component-specific styles here */
</style>
