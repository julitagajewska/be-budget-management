<script lang="ts">
export default {
  props: ['id'],
  data: () => ({})
}
</script>

<template>
  <div class="content-container">
    <h1>Budżet</h1>
    <span>ID: {{ $route.params.id }}</span>
    <a
      href="/budgets"
      class="px-4 py-1 w-40 rounded-lg bg-background-200 hover:bg-background-100 transition-all ease-in-out duration-300"
      >Powrót</a
    >
  </div>
</template>
