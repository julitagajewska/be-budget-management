import React from 'react'

type TableHeadCellProps = {
  label: string
  align?: 'center' | 'left' | 'right' | 'justify' | 'char' | undefined
}

const TableHeadCell = ({ label, align }: TableHeadCellProps) => {
  return (
    <th className={`py-2 px-4 text-sm font-light text-background-800`} align={align}>
      {label}
    </th>
  )
}

export default TableHeadCell
