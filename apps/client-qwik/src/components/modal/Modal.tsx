import type { QRL } from '@builder.io/qwik'
import { component$, $, Slot } from '@builder.io/qwik'
import { Button } from '../buttons/Button'
import { IconOnlyButton } from '../buttons/IconOnlyButton'
import { ArrowLeft, Check, Cross } from '~/icons'

type ModalProps = {
  title: string
  subtitle?: string
  handleConfirm: QRL<() => void>
  handleCancel: QRL<() => void>
  footer?: boolean
}

export const Modal = component$(
  ({ title, subtitle, handleConfirm, handleCancel, footer = true }: ModalProps) => {
    const handleConfirmClick = $(() => handleConfirm())
    const handleCancelClick = $(() => handleCancel())
    return (
      <div class="w-full h-full bg-black bg-opacity-25 backdrop-blur-sm fixed top-0 left-0 z-10 flex flex-row justify-center items-center">
        <div class="bg-background-50 w-[400px] rounded-md shadow-md flex flex-col py-4 px-6 gap-4">
          <div class="w-full flex flex-row justify-between items-start">
            <div class="flex flex-col">
              <h4 class="text-base font-bold text-background-700">{title}</h4>
              {subtitle && <h5 class="text-xs">{subtitle}</h5>}
            </div>
            <IconOnlyButton color="neutral" size="small" onClick={handleCancelClick}>
              <Cross />
            </IconOnlyButton>
          </div>
          <Slot />

          {footer && (
            <div class="flex flex-row justify-end gap-4">
              <Button color="neutral" onClick={handleCancelClick}>
                <ArrowLeft class="text-sm" />
                Anuluj
              </Button>
              <Button color="primary" onClick={handleConfirmClick}>
                <Check class="text-sm" /> Zapisz
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }
)
