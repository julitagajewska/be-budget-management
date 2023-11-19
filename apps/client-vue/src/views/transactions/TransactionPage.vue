<script lang="ts">
export default {
  props: ['id'],
  data: () => ({}),
  name: 'TransactionPage'
}
</script>

<template>
  <div class="content-container">
    <h1>Szczegóły transakcji</h1>
    <span>ID: {{ $route.params.id }}</span>
    <router-link
      to="/transactions"
      class="px-4 py-1 w-40 rounded-lg bg-background-200 hover:bg-background-100 transition-all ease-in-out duration-300"
      >Powrót</router-link
    >
  </div>
</template>
