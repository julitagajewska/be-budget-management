<script lang="ts">
import { PropType } from 'vue'
import {
  Color,
  Size,
  colors,
  sizes,
  baseClasses
} from 'shared-types/types/components/button/ButtonTypes.ts'

export default {
  name: 'ButtonOptions',
  props: {
    color: {
      type: String as PropType<Color>,
      default: 'primary'
    },
    size: {
      type: String as PropType<Size>,
      default: 'small'
    }
  },
  methods: {
    handleClick() {
      console.log('Options button clicked!')
    }
  },
  data() {
    return {
      colors,
      sizes,
      baseClasses
    }
  }
}
</script>

<template>
  <button @click="handleClick" :class="`${baseClasses} ${colors[color]} ${sizes[size]}`">
    <slot></slot>
  </button>
</template>
