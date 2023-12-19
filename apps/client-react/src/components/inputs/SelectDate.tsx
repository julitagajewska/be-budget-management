import React from 'react'

type SelectDateProps = {
  value: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
}

const SelectDate = ({ value, handleChange, label }: SelectDateProps) => {
  return (
    <input
      type="date"
      value={value}
      onChange={handleChange}
      className="custom-input rounded-md text-sx placeholder:text-xs py-[6px] pl-[16px] pr-[16px] resize-none text-background-500 border-background-200 focus:text-primary-600 focus:shadow-primary-100 [&:not(:focus)]:hover:shadow-background-100 [&:not(:focus)]:hover:border-background-400"
    />
  )
}

export default SelectDate
