<script>
export default {
  props: {
    width: {
      type: String,
      default: 'w-1/2',
    },
  },
  components: {},
  data() {
    return {};
  },
};
</script>

<template>
  <div class="h-full flex flex-col justify-start items-start (${width})">
    <slot />
  </div>
</template>
