import React from 'react'
import Select from './Select'
import { Option } from './Select'

const garphs: Option[] = [
  {
    id: 0,
    name: 'Słupkowy - transakcje na przestrzeni miesięcy'
  },
  {
    id: 1,
    name: 'Kołowy - trasnsakcje według typu lub kategorii'
  }
]

type SelectGraphProps = {
  value: number
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  className?: string
}

const SelectGraph = ({ value, handleChange, className }: SelectGraphProps) => {
  return (
    <Select
      options={garphs}
      placeholder={''}
      handleSelect={handleChange}
      value={value}
      className={className}
    />
  )
}

export default SelectGraph
