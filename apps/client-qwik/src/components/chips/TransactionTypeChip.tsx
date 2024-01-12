import { component$ } from '@builder.io/qwik'
import { ArrowDown, ArrowUp } from '~/icons'

type TransactionTypeChipProps = {
  isExpense: boolean
}

export const TransactionTypeChip = component$(({ isExpense }: TransactionTypeChipProps) => {
  const colors = isExpense ? 'bg-red-600' : 'bg-green-600'
  return (
    <div
      class={`${colors} w-5 h-5 rounded-full flex flex-row items-center justify-center text-white`}
    >
      {isExpense ? <ArrowUp /> : <ArrowDown />}
    </div>
  )
})
