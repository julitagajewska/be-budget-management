import React from 'react'

type Color = 'neutral' | 'green' | 'red' | 'blue' | 'primary' | 'secondary'
const colors: Record<Color, string> = {
  neutral: 'text-neutral-800',
  green: 'text-green-600',
  red: 'text-red-600',
  blue: 'text-blue-600',
  primary: 'text-primary-600',
  secondary: 'text-secondary-600'
}

const backgrounds: Record<Color, string> = {
  neutral: 'bg-neutral-200',
  green: 'bg-green-200',
  red: 'bg-red-200',
  blue: 'bg-blue-200',
  primary: 'bg-primary-200',
  secondary: 'bg-secondary-200'
}

type SummaryTileProps = {
  text: string
  value: number | string
  Icon: React.ElementType
  color: Color
}

const SummaryTile = ({ text, value, Icon, color }: SummaryTileProps) => {
  return (
    <div className="flex flex-row items-center w-full shadow-md rounded-md h-full bg-neutral-50 px-6 gap-6">
      <div
        className={`${backgrounds[color]} ${colors[color]} rounded-lg flex flex-col justify-center items-center text-2xl w-10 h-10`}
      >
        <Icon />
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-sm text-background-600">{text}</span>
        <span className={`text-lg font-bold ${colors[color]}`}>{value} zł</span>
      </div>
    </div>
  )
}

export default SummaryTile
