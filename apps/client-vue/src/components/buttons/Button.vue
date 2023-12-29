<script setup lang="ts">
import { defineProps } from 'vue'
import {
  Color,
  Size,
  colors,
  sizes,
  baseClasses
} from 'shared-types/types/components/button/ButtonTypes.ts'

type ButtonProps = {
  color: Color
  size: Size
}

const props = withDefaults(defineProps<ButtonProps>(), {
  color: 'primary',
  size: 'small'
})
</script>

<template>
  <button :class="`${baseClasses} ${colors[props.color]} ${sizes[props.size]}`">
    <slot></slot>
  </button>
</template>
