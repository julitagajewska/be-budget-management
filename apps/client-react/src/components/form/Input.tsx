import React, { HTMLInputTypeAttribute, ReactNode, useState } from 'react'

type InputProps = {
  label: string
  type: HTMLInputTypeAttribute
  placeholder: string
  Icon?: React.ElementType
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const highlightClasses = {
  base: 'text-background-500 focus:text-primary-600 border-background-200 focus:text-primary-600 focus:shadow-primary-100 [&:not(:focus)]:hover:shadow-background-100 [&:not(:focus)]:hover:border-background-400',
  error:
    'placeholder-red-300 focus:placeholder-red-300 text-red-500 border-red-500 text-red-500 focus:text-red-600 focus:shadow-red-200 focus:border-red-400 [&:not(:focus)]:hover:shadow-red-100 [&:not(:focus)]:hover:border-red-400',
  peerBase: 'text-background-400 peer-hover:text-background-400 peer-focus:text-primary-500',
  peerError: 'text-red-400 peer-hover:text-red-600 peer-focus:text-red-600',
  labelBase: 'text-background-600',
  labelFocus: 'text-primary-600',
  labelError: 'text-red-400'
}

const Input = ({ label, type, placeholder, Icon, handleChange }: InputProps) => {
  const [value, setValue] = useState('')
  const [errorMessage, setErrorMessage] = useState<string[]>([
    // 'Here is very long error message.'
    // 'Here is very long error message. Here is very long error message.',
    // 'Here is very long error message. Here is very long error message. Here is very long error message.'
  ])

  const [labelClass, setLabelClass] = useState<keyof typeof highlightClasses>('labelBase')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value
    setValue(input)
    handleChange(event)
  }

  return (
    <div className="flex flex-col relative w-full gap-1">
      <label
        htmlFor={`${label}-input-id`}
        className={`text-sm font-bold pb-1 ${highlightClasses[labelClass]}`}
      >
        {label}
      </label>
      <input
        type={type}
        id={`${label}-input-id`}
        placeholder={placeholder}
        onInput={handleInputChange}
        onFocus={() => setLabelClass('labelFocus')}
        onBlur={() => setLabelClass('labelBase')}
        className={`peer pl-10 py-2 text-sm rounded-md custom-input ${
          !errorMessage.length ? highlightClasses.base : highlightClasses.error
        }`}
      />
      {Icon && (
        <Icon
          className={`${
            !errorMessage.length ? highlightClasses.peerBase : highlightClasses.peerError
          } absolute top-[36px] left-3 text-lg`}
        />
      )}
      {errorMessage && (
        <ul>
          {errorMessage.map((e) => (
            <li className="text-sm font-medium text-red-600">{e}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Input
