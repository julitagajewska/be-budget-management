<script setup lang="ts">
import { defineProps } from 'vue'

type Color = 'primary' | 'seconadry' | 'neutral'
type Size = 'small' | 'medium' | 'large'

type ButtonProps = {
  color: Color
  size: Size
}

const sizes: Record<Size, string> = {
  small: 'text-xs px-4 py-1 rounded-md',
  medium: '',
  large: ''
}

const colors: Record<Color, string> = {
  primary: 'bg-primary-600 hover:bg-primary-700 text-background-50',
  seconadry: 'bg-secondary-600 hover:bg-secondary-700 text-background-50',
  neutral: 'bg-background-100 hover:bg-background-200 text-background-900'
}

const baseClasses =
  'flex flex-row justify-center items-center gap-2 transition-all duration-300 ease-in-out'

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
