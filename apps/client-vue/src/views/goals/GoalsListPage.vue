<script lang="ts">
export default {
  props: [],
  data: () => ({})
}
</script>

<template>
  <div class="content-container">
    <h1>Cele</h1>
    <router-link
      to="/goals/1"
      class="bg-background-200 w-full rounded-lg px-10 py-6 hover:bg-background-100 transition-all ease-in-out duration-300"
    >
      Cel #1
    </router-link>
    <router-link
      to="/goals/2"
      class="bg-background-200 w-full rounded-lg px-10 py-6 hover:bg-background-100 transition-all ease-in-out duration-300"
    >
      Cel #2
    </router-link>
    <router-link
      to="/goals/3"
      class="bg-background-200 w-full rounded-lg px-10 py-6 hover:bg-background-100 transition-all ease-in-out duration-300"
    >
      Cel #3
    </router-link>
  </div>
</template>
