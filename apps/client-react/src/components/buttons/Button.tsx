import React from 'react'

type Variant = 'filled' | 'outlined' | 'text-only' | 'icon-only'
const variants: Record<Variant, string> = {
  filled: '',
  outlined: '',
  'text-only': '',
  'icon-only': ''
}

type Size = 'small' | 'medium' | 'large'
const sizes: Record<Size, string> = {
  small: 'h-6',
  medium: 'h-8',
  large: 'h-10 rounded-xl'
}

type Color = 'primary' | 'secondary'
const colors: Record<Color, string> = {
  primary: 'text-text-50 bg-primary-600 hover:bg-primary-700 react-primary',
  secondary: 'shadow-secondary'
}

type ButtonProps = {
  text?: string
  IconLeft?: React.ElementType
  IconRight?: React.ElementType
  variant?: Variant
  size?: Size
  color?: Color
  onClick: () => void
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
  fullWidth?: boolean
}

const Button = ({
  text,
  IconLeft,
  IconRight,
  variant = 'filled',
  size = 'medium',
  color = 'primary',
  onClick,
  type,
  fullWidth
}: ButtonProps) => {
  let classesBase = 'bg-primary-600 transition-all ease-in-out duration-300'
  let widthClasses = fullWidth ? 'w-full' : ''
  let sizeClasses = `${sizes[size]} ${widthClasses}`

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${classesBase} ${sizeClasses} ${colors[color]} ${variants[variant]}`}
    >
      {IconLeft && <IconLeft />}
      <span>{text}</span>
      {IconRight && <IconRight />}
    </button>
  )
}

Button.defaultProps = {
  variant: 'filled',
  size: 'medium',
  color: 'primary'
} as Pick<ButtonProps, keyof ButtonProps>

export default Button
