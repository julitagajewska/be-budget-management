<script lang="ts">
import PageContainer from './components/containers/PageContainer.vue'

export default {
  props: [],
  data: () => ({}),
  components: { PageContainer }
}
</script>

<template>
  <div class="w-full h-screen flex flex-col justify-center items-center">
    <PageContainer />
  </div>
</template>
