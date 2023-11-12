<script setup lang="ts">
defineProps<{
  isOpen: boolean
  toggleFunction: () => void
}>()

const openClasses = 'w-72'
const closedClasses = 'w-10'
</script>

<template>
  <!-- Sidebar wrapper -->
  <div
    :class="`h-full sticky top-0 left-0 transition-all ease-in-out duration-300 flex justify-between ${
      isOpen ? openClasses : closedClasses
    }`"
  >
    <!-- Sidebar tile -->
    <div
      class="bg-background-50 w-full h-full shadow-large rounded-xl px-4 py-4 flex flex-col justify-between"
    >
      <!-- <span v-if="isOpen">Open</span>
      <span v-else>Closed</span> -->

      <!-- <button @click="toggleFunction">Toggle</button> -->
      <slot> </slot>
    </div>
  </div>
</template>
