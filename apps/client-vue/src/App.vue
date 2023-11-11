<script lang="ts">
// IMPORTS
// import  ExampleComponent  from './views/template.vue'
// import  Navbar  from './components/Navbar.vue';
import PageContainer from './components/containers/PageContainer.vue'

export default {
  props: [],
  data: () => ({}),
  components: { PageContainer }
}
</script>

<template>
  <div class="w-full h-screen flex flex-col justify-center items-center">
    <!-- <Navbar />
    <h1 class="bg-vue px-24 py-10 flex flex-row justify-center items-center">VUE CLIENT</h1>
    {{ $t('page.title.home') }}
    <ExampleComponent />
    <h2>Router outlet:</h2>
    <router-view></router-view> -->
    <PageContainer />
  </div>
</template>
