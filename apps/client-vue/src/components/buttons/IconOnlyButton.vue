<script setup lang="ts">
type Color = 'primary' | 'seconadry' | 'neutral'
type Size = 'small' | 'medium' | 'large'

type IconOnlyButtonProps = {
  color: Color
  size: Size
}

const sizes: Record<Size, string> = {
  small: 'w-6 h-4 rounded-md text-lg',
  medium: '',
  large: ''
}

const colors: Record<Color, string> = {
  primary: 'bg-primary-600 hover:bg-primary-700 text-background-50',
  seconadry: 'bg-secondary-600 hover:bg-secondary-700 text-background-50',
  neutral: 'bg-background-100 hover:bg-background-200 text-background-700'
}

const baseClasses =
  'flex flex-row justify-center items-center gap-2 transition-all duration-300 ease-in-out'

const props = withDefaults(defineProps<IconOnlyButtonProps>(), {
  color: 'primary',
  size: 'small'
})
</script>

<template>
  <button :class="`${baseClasses} ${colors[props.color]} ${sizes[props.size]}`">
    <slot></slot>
  </button>
</template>
