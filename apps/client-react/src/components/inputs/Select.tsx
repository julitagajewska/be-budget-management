import React from 'react'

type OptionBase = {
  id: number | string
  name: string
}

export type Option = unknown & OptionBase

type SelectProps = {
  label?: string
  options: Option[] | undefined
  placeholder: string
  handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void
  variant?: Variant
  Icon?: React.ElementType
  required?: boolean
  fullWidth?: boolean
  value: string | number | undefined
  className?: string
}

type Variant = 'small' | 'medium'
// const styles: Record<
//   Variant,
//   {
//     container: string
//     label: string
//     input: string
//     icon: string
//     error: string
//   }
// > = {
//   small: {
//     container: '',
//     label: '',
//     input: '',
//     icon: '',
//     error: ''
//   },
//   medium: {
//     container: '',
//     label: '',
//     input: '',
//     icon: '',
//     error: ''
//   }
// }

// const highlightClasses = {
//   base: 'text-background-500 focus:text-primary-600 border-background-200 focus:text-primary-600 focus:shadow-primary-100 [&:not(:focus)]:hover:shadow-background-100 [&:not(:focus)]:hover:border-background-400',
//   error:
//     'placeholder-red-300 focus:placeholder-red-300 text-red-500 border-red-500 text-red-500 focus:text-red-600 focus:shadow-red-200 focus:border-red-400 [&:not(:focus)]:hover:shadow-red-100 [&:not(:focus)]:hover:border-red-400',
//   peerBase: 'text-background-400 peer-hover:text-background-400 peer-focus:text-primary-500',
//   peerError: 'text-red-400 peer-hover:text-red-600 peer-focus:text-red-600',
//   labelBase: 'text-background-600',
//   labelFocus: 'text-primary-600',
//   labelError: 'text-red-600'
// }

const Select = ({
  label,
  options,
  placeholder,
  handleSelect,
  // variant = 'small',
  // Icon,
  // required,
  fullWidth,
  value,
  className
}: SelectProps) => {
  let widthClasses = fullWidth ? 'w-full' : ''

  console.log(value)

  return (
    <div className={`flex flex-col align ${widthClasses}`}>
      {label && <label className={``}>{label}</label>}
      <select
        placeholder={placeholder}
        onChange={handleSelect}
        value={value}
        className={`custom-input rounded-md text-sx placeholder:text-xs py-[6px] pl-[16px] pr-[16px] resize-none text-background-500 border-background-200 focus:text-primary-600 focus:shadow-primary-100 [&:not(:focus)]:hover:shadow-background-100 [&:not(:focus)]:hover:border-background-400 ${className}`}
      >
        <option disabled selected hidden value={undefined}>
          {placeholder}
        </option>
        {options?.map((o: Option) => <option value={o.id}>{o.name}</option>)}
      </select>
    </div>
  )
}

export default Select
