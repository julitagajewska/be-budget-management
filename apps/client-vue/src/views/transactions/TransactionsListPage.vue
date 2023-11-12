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
      <a
        href="/transactions/expenses"
        class="bg-background-200 w-full rounded-lg px-10 py-6 hover:bg-background-100 transition-all ease-in-out duration-300"
        >Wydatki</a
      >
      <a
        href="/transactions/incomes"
        class="bg-background-200 w-full rounded-lg px-10 py-6 hover:bg-background-100 transition-all ease-in-out duration-300"
        >Wpływy</a
      >
    </div>
    <a
      href="/transactions/1"
      class="bg-background-200 w-full rounded-lg px-10 py-6 hover:bg-background-100 transition-all ease-in-out duration-300"
    >
      Transackcja #1
    </a>
    <a
      href="/transactions/2"
      class="bg-background-200 w-full rounded-lg px-10 py-6 hover:bg-background-100 transition-all ease-in-out duration-300"
    >
      Transackcja #2
    </a>
    <a
      href="/transactions/3"
      class="bg-background-200 w-full rounded-lg px-10 py-6 hover:bg-background-100 transition-all ease-in-out duration-300"
    >
      Transackcja #3
    </a>
  </div>
</template>
