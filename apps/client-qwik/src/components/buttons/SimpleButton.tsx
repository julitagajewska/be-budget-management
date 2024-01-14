import type { QRL } from '@builder.io/qwik'
import { Slot, component$ } from '@builder.io/qwik'

export type Color = 'primary' | 'seconadry' | 'neutral'
export type Size = 'small' | 'medium' | 'large'

export const sizes: Record<Size, string> = {
  small: 'text-xs px-4 py-1 rounded-md',
  medium: '',
  large: ''
}

export const colors: Record<Color, string> = {
  primary: 'bg-primary-600 hover:bg-primary-700 text-background-50',
  seconadry: 'bg-secondary-600 hover:bg-secondary-700 text-background-50',
  neutral: 'bg-background-100 hover:bg-background-200 text-background-900'
}

export const baseClasses =
  'flex flex-row justify-center items-center gap-2 transition-all duration-300 ease-in-out'

type ButtonProps = {
  onClick: QRL<() => void>
  color?: Color
  size?: Size
}

export const SimpleButton = component$(
  ({ onClick, color = 'primary', size = 'small' }: ButtonProps) => {
    return (
      <button class={`${colors[color]} ${sizes[size]} ${baseClasses}`} onClick$={onClick}>
        <Slot />
      </button>
    )
  }
)
