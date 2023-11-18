<script lang="ts">
export default {
  props: [],
  data: () => ({})
}
</script>

<template>
  <div class="content-container">
    <h1>Transakcje</h1>
    <div class="flex flex-row w-full gap-4 py-4">
      <router-link
        to="/transactions/expenses"
        class="bg-background-200 w-full rounded-lg px-10 py-6 hover:bg-background-100 transition-all ease-in-out duration-300"
        >Wydatki</router-link
      >
      <router-link
        to="/transactions/incomes"
        class="bg-background-200 w-full rounded-lg px-10 py-6 hover:bg-background-100 transition-all ease-in-out duration-300"
        >Wpływy</router-link
      >
    </div>
    <router-link
      to="/transactions/1"
      class="bg-background-200 w-full rounded-lg px-10 py-6 hover:bg-background-100 transition-all ease-in-out duration-300"
    >
      Transackcja #1
    </router-link>
    <router-link
      to="/transactions/2"
      class="bg-background-200 w-full rounded-lg px-10 py-6 hover:bg-background-100 transition-all ease-in-out duration-300"
    >
      Transackcja #2
    </router-link>
    <router-link
      to="/transactions/3"
      class="bg-background-200 w-full rounded-lg px-10 py-6 hover:bg-background-100 transition-all ease-in-out duration-300"
    >
      Transackcja #3
    </router-link>
  </div>
</template>
