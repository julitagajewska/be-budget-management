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
  small: 'h-6 pl-2 pr-4 text-xs rounded-md gap-2 button-small',
  medium: 'h-8 pl-4 pr-6 text-base rounded-lg w-max gap-2',
  large: 'h-10 pl-6 pr-8 text-base rounded-xl w-max gap-2'
}

const iconSizes: Record<Size, string> = {
  small: 'text-base',
  medium: 'text-md',
  large: 'text-lg'
}

const iconOnlySizes: Record<Size, string> = {
  small: 'h-6 px-[2px] text-xl rounded-md',
  medium: 'h-8 px-1 text-2xl rounded-lg',
  large: 'h-10 px-[6px] text-3xl rounded-xl'
}

type Color = 'primary' | 'secondary' | 'transparent' | 'neutral'
const colors: Record<Color, string> = {
  primary: 'text-text-50 bg-primary-600 hover:bg-primary-700 react-primary',
  secondary: 'shadow-secondary',
  transparent: 'text-primary-700 bg-transparent hover:bg-primary-500 hover:bg-opacity-20',
  neutral: 'text-neutral-700 bg-transparent hover:bg-neutral-500 hover:bg-opacity-20'
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
  className?: string
  iconClassName?: string
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
  fullWidth,
  className,
  iconClassName
}: ButtonProps) => {
  let classesBase =
    'bg-primary-600 transition-all ease-in-out duration-300 flex flex-row justify-center items-center'
  let widthClasses = fullWidth ? 'w-full' : ''
  let sizeClasses = `${widthClasses} `

  sizeClasses += variant === 'icon-only' ? `${iconOnlySizes[size]}` : `${sizes[size]}`

  return (
    <button
      type={type}
      onClick={onClick}
      // className={`${classesBase} ${sizeClasses} ${colors[color]} ${variants[variant]} ${className}`}
      className={`${sizeClasses} bg-primary-600 rounded-md w-full h-6 flex flex-row items-center justify-center text-text-50 text-sm gap-2 overflow-hidden ${sizeClasses}`}
    >
      {IconLeft && <IconLeft className={`${iconSizes[size]} ${iconClassName}`} />}
      <span className="w-full text-ellipsis overflow-hidden text-nowrap">{text}</span>
      {IconRight && <IconRight className={`${iconSizes[size]} ${iconClassName}`} />}
    </button>
  )
}

Button.defaultProps = {
  variant: 'filled',
  size: 'medium',
  color: 'primary'
} as Pick<ButtonProps, keyof ButtonProps>

export default Button
