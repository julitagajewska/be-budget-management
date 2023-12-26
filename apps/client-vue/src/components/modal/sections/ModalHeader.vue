<script setup lang="ts">
import Button from '@/components/buttons/Button.vue'
import Cross from '@/components/icons/Cross.vue'
type ModalHeaderProps = {
  handleClose: () => void
  title: string
  subtitle?: string
}

const props = withDefaults(defineProps<ModalHeaderProps>(), {})
</script>

<template>
  <div class="w-full flex flex-row justify-between items-start">
    <div class="flex flex-col gap-2">
      <h2 class="text-lg font-semibold text-background-700">{{ props.title }}</h2>
      <h3 v-if="props.subtitle" className="text-bs text-background-500">{{ props.subtitle }}</h3>
    </div>
    <Button color="neutral" size="small"><Cross /></Button>
  </div>
</template>
