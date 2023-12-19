<script setup lang="tsx">
import IconOnlyButton from '../buttons/IconOnlyButton.vue'
import Button from '../buttons/Button.vue'
import Cross from '@icons/Cross.vue'
import ArrowLeft from '@icons/ArrowLeft.vue'
import Check from '@icons/Check.vue'

type ModalProps = {
  title: string
  subtitle?: string
  handleConfirm: () => void
  handleCancel: () => void
}

const props = withDefaults(defineProps<ModalProps>(), {})
</script>

<template>
  <div
    class="w-full h-full bg-black bg-opacity-25 backdrop-blur-sm fixed top-0 left-0 z-10 flex flex-row justify-center items-center"
  >
    <div class="bg-background-50 w-[400px] rounded-md shadow-md flex flex-col py-4 px-6 gap-4">
      <div class="w-full flex flex-row justify-between items-center">
        <h4 class="text-base font-bold text-background-700">{{ props.title }}</h4>
        <h5 v-if="props.subtitle">{{ props.subtitle }}</h5>
        <IconOnlyButton color="neutral" size="small" class="px-1 h-6" @click="handleCancel"
          ><Cross
        /></IconOnlyButton>
      </div>
      <slot></slot>

      <div class="flex flex-row justify-end gap-4">
        <Button color="neutral" @click="handleCancel"><ArrowLeft class="text-sm" />Anuluj</Button>
        <Button color="primary" @click="handleConfirm"><Check class="text-sm" /> Zapisz</Button>
      </div>
    </div>
  </div>
</template>
