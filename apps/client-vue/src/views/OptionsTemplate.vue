<script lang="ts">
export default {
  name: 'OptionsAPITemplate',
  props: [],
  data() {
    return {
      title: 'Options API template component',
      description: 'This is a basic Vue component using the Options API',
      count: 0
    }
  },
  methods: {
    increaseCount() {
      this.count += 1
    }
  }
}
</script>

<template>
  <div class="bg-green-300 text-black">
    <h1>Here is the template component</h1>
    <h2>Here is an example of translation</h2>
    {{ $t('page.title.home') }}
  </div>
</template>
