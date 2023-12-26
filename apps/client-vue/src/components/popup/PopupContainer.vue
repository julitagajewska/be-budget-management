<script setup lang="ts">
import { ref, watchEffect } from 'vue'

// PROPS
type Side = 'left' | 'right' | 'top' | 'bottom-left'
const sideStyles: Record<Side, string> = {
  left: 'right-[30px]',
  right: 'left-[30px]',
  top: 'bottom-[30px]',
  'bottom-left': 'top-[30px] right-[30px]'
}

type PopupProps = {
  open: boolean
  setOpen: () => void
  side?: Side
}

// STATE
const popupRef = ref(null)

// HOOKS
watchEffect(() => {
  const handler = (e) => {
    if (popupRef.value && !popupRef.value.contains(e.target)) {
      props.setOpen(false)
    }
  }
  document.addEventListener('mousedown', handler)

  return () => {
    document.removeEventListener('mousedown', handler)
  }
})
</script>

<template>
  <div class="relative flex flex-row justify-center items-center">
    <div>
      <slot name="trigger"></slot>
    </div>

    <div
      v-if="open"
      :ref="popupRef"
      :class="`${sideStyles[side]} shadow-md shadow-background-300 text-text-950 transition-all ease-in-out duration-300 bg-background-50 absolute flex flex-col justify-center items-center z-20 rounded-md text-sm w-max`"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>
