import { defineComponent, defineProps } from 'vue'
import {
  Color,
  Size,
  colors,
  sizes,
  baseClasses
} from 'shared-types/types/components/button/ButtonTypes.ts'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'ButtonOptions',
  props: {
    color: { type: Object as PropType<Color>, required: true },
    size: { type: Object as PropType<Size>, required: true }
  },
  setup(props) {
    const color = colors[props.color]
    const size = sizes[props.size]

    return { color, size }
  },
  methods: {
    handleClick() {
      console.log('Option button clicked!')
    }
  },
  template: `
         <button :class="[baseClasses, color, size]">
            <slot></slot>
        </button>
    `
})
