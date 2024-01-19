import React, { HTMLInputTypeAttribute, useState } from 'react'

type Variant = 'small' | 'medium'
const styles: Record<
  Variant,
  { container: string; label: string; input: string; icon: string; error: string }
> = {
  small: {
    container: 'gap-[4px]',
    label: 'pb-0 font-medium text-xs ',
    input: 'py-[6px]',
    icon: 'top-[28px] text-[16px] left-[10px]',
    error: 'text-xs pl-1 text-red-600'
  },
  medium: {
    container: 'gap-1',
    label: 'pb-1 font-bold pl-1',
    input: 'py-2 pl-10',
    icon: 'top-[36px] text-[20px] left-3',
    error: 'text-sm font-medium pl-1 text-red-600'
  }
}

type InputProps = {
  label?: string
  value: string | number | undefined | null
  type: HTMLInputTypeAttribute
  placeholder: string
  Icon?: React.ElementType
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  variant?: Variant
  min?: number
}

const highlightClasses = {
  base: 'text-background-500 focus:text-primary-600 border-background-200 focus:text-primary-600 focus:shadow-primary-100 [&:not(:focus)]:hover:shadow-background-100 [&:not(:focus)]:hover:border-background-400',
  error:
    'placeholder-red-300 focus:placeholder-red-300 text-red-500 border-red-500 text-red-500 focus:text-red-600 focus:shadow-red-200 focus:border-red-400 [&:not(:focus)]:hover:shadow-red-100 [&:not(:focus)]:hover:border-red-400',
  peerBase: 'text-background-400 peer-hover:text-background-400 peer-focus:text-primary-500',
  peerError: 'text-red-400 peer-hover:text-red-600 peer-focus:text-red-600',
  labelBase: 'text-background-600',
  labelFocus: 'text-primary-600',
  labelError: 'text-red-600'
}

const Input = ({
  label,
  value,
  type,
  placeholder,
  Icon,
  handleChange,
  variant = 'small',
  min
}: InputProps) => {
  const [errorMessage, setErrorMessage] = useState<string[]>([])

  const [labelClass, setLabelClass] = useState<keyof typeof highlightClasses>('labelBase')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event)
  }

  return (
    <div className={`flex flex-col relative w-full ${styles[variant]['container']}`}>
      {label && (
        <label
          htmlFor={`${label}-input-id`}
          className={`text-sm ${styles[variant]['label']} ${
            !errorMessage.length ? highlightClasses[labelClass] : highlightClasses.labelError
          }`}
        >
          {label}
        </label>
      )}

      <input
        value={value ? value : ''}
        type={type}
        id={`${label}-input-id`}
        min={min}
        placeholder={placeholder}
        onInput={handleInputChange}
        onFocus={() => setLabelClass('labelFocus')}
        onBlur={() => setLabelClass('labelBase')}
        className={`peer text-sm rounded-md custom-input pl-[6px] ${styles[variant]['input']} ${
          !errorMessage.length ? highlightClasses.base : highlightClasses.error
        }`}
      />
      {Icon && (
        <Icon
          className={`${
            !errorMessage.length ? highlightClasses.peerBase : highlightClasses.peerError
          } ${styles[variant]['icon']} ${!label ? 'top-[8px]' : ''} absolute pl-[34px]`}
        />
      )}
      {errorMessage && (
        <ul>
          {errorMessage.map((e) => (
            <li className={`${styles[variant]['error']}`}>{e}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Input
