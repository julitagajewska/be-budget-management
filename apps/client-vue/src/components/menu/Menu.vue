<template>
  <div class="relative flex flex-row justify-center items-center">
    <slot></slot>
    <div
      v-if="isOpen"
      ref="popupRef"
      :class="[
        sideStyles[side],
        'shadow-md shadow-background-300 text-text-950 transition-all ease-in-out duration-300 bg-background-50 absolute flex flex-col justify-center items-center z-20 rounded-md text-sm w-max'
      ]"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

type Side = 'left' | 'right' | 'top' | 'bottom-left'
const sideStyles: Record<Side, string> = {
  left: 'right-[30px]',
  right: 'left-[30px]',
  top: 'bottom-[30px]',
  'bottom-left': 'top-[10px] right-[30px]'
}

export default defineComponent({
  name: 'Popup',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    open: {
      type: Function as unknown as () => () => void,
      required: true
    },
    close: {
      type: Function as unknown as () => () => void,
      required: true
    },
    side: {
      type: String as () => Side,
      default: 'bottom-left'
    }
  },
  setup(props) {
    const popupRef = ref<HTMLDivElement | null>(null)

    const handleClick = (e: MouseEvent) => {
      if (popupRef.value !== null && !popupRef.value.contains(e.target as Node)) {
        props.close()
      }
    }

    onMounted(() => {
      document.addEventListener('mousedown', handleClick)
      return () => {
        document.removeEventListener('mousedown', handleClick)
      }
    })

    return {
      popupRef,
      sideStyles,
      side: props.side
    }
  }
})
</script>
