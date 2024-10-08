import Button from '../../buttons/Button'
import { Cross } from '../../icons'

type ModalHeaderProps = {
  handleClose: () => void
  title: string
  subtitle?: string
}

const ModalHeader = ({ handleClose, title, subtitle }: ModalHeaderProps) => {
  return (
    <div className="w-full flex flex-row justify-between items-start">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-background-700">{title}</h2>
        {subtitle && <h3 className="text-bs text-background-500">{subtitle}</h3>}
      </div>
      {/* <Button
        variant="icon-only"
        color="neutral"
        size="small"
        IconLeft={Cross}
        onClick={handleClose}
      /> */}
      <button
        className="text-xl h-6 rounded-md gap-2 button-small text-text-50 bg-primary-600"
        onClick={handleClose}
      >
        <Cross />
      </button>
    </div>
  )
}

export default ModalHeader
