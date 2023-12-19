import React from 'react'

type RadioProps = {
  value: string
  name: string
  label: string
  id: string
  checked?: boolean
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Radio = ({ value, name, label, id, checked, handleChange }: RadioProps) => {
  return (
    <label htmlFor={id}>
      <input
        type="radio"
        value={value}
        name={name}
        id={id}
        checked={checked}
        onChange={(e) => handleChange(e)}
      />{' '}
      {label}
    </label>
  )
}

export default Radio
