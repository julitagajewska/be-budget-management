type ChipProps = {
  text: string
  color: string
}

const Chip = ({ text, color }: ChipProps) => {
  return (
    <div
      className={`${color} w-24 px-4 py-1 rounded-full text-xs whitespace-nowrap overflow-hidden text-ellipsis`}
    >
      {text}
    </div>
  )
}

export default Chip
