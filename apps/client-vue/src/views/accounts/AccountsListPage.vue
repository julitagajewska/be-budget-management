<script lang="ts">
export default {
  props: [],
  data: () => ({})
}
</script>

<template>
  <div class="content-container">
    <h1>Konta</h1>
    <router-link
      to="/accounts/1"
      class="bg-background-200 w-full rounded-lg px-10 py-6 hover:bg-background-100 transition-all ease-in-out duration-300"
    >
      Konto #1
    </router-link>
    <router-link
      to="/accounts/2"
      class="bg-background-200 w-full rounded-lg px-10 py-6 hover:bg-background-100 transition-all ease-in-out duration-300"
    >
      Konto #2
    </router-link>
    <router-link
      to="/accounts/3"
      class="bg-background-200 w-full rounded-lg px-10 py-6 hover:bg-background-100 transition-all ease-in-out duration-300"
    >
      Konto #3
    </router-link>
  </div>
</template>
