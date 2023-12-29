import type { QRL } from '@builder.io/qwik'
import { Slot, component$ } from '@builder.io/qwik'

type Color = 'primary' | 'seconadry' | 'neutral'
type Size = 'small' | 'medium' | 'large'

type IconOnlyButtonProps = {
  onClick: QRL<() => void>
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

export const IconOnlyButton = component$(({ onClick, color, size }: IconOnlyButtonProps) => {
  return (
    <button class={`${baseClasses} ${colors[color]} ${sizes[size]}`} onClick$={onClick}>
      <Slot />
    </button>
  )
})
