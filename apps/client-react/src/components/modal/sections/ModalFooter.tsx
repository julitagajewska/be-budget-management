import Button from '../../buttons/Button'
import { ArrowLeft, Check } from '../../icons'

type ModalFooterProps = {
  handleClose: () => void
  handleConfirm: () => void
  confirmText?: string
  icon?: React.ElementType
}

const ModalFooter = ({
  handleClose,
  handleConfirm,
  confirmText = 'Potwierdź',
  icon = Check
}: ModalFooterProps) => {
  return (
    <div className="flex flex-row w-full justify-end gap-4">
      <Button
        variant="filled"
        color="neutral"
        size="small"
        text="Powrót"
        IconLeft={ArrowLeft}
        onClick={handleClose}
      />
      <Button
        variant="filled"
        color="primary"
        size="small"
        text={confirmText}
        IconLeft={icon}
        onClick={handleConfirm}
      />
    </div>
  )
}

export default ModalFooter
