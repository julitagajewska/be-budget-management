<script setup lang="ts">
type TextWithDescriptionProps = {
  text: string | undefined
  description: string | undefined
}

const props = withDefaults(defineProps<TextWithDescriptionProps>(), {})
</script>

<template>
  <div class="pl-4">
    <h3 class="font-semibold text-background-700">{{ props.text }}</h3>
    <span class="text-background-600">{{ props.description }}</span>
  </div>
</template>
