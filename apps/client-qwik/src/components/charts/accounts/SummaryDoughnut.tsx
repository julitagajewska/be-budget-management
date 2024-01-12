import { component$, useSignal } from '@builder.io/qwik'
import { DoughnutChart } from '../DoughnutChart'
import type { TransactionDTO } from 'shared-types'
import type { Dataset } from 'shared-types/types/components/charts/Doughnut'

type SummaryDoughnutProps = {
  transactions: TransactionDTO[]
}

export const SummaryDoughnut = component$(({ transactions }: SummaryDoughnutProps) => {
  const incomesSum = useSignal(
    transactions.filter((t) => !t.isExpense).reduce((prev, curr) => prev + curr.value, 0)
  )
  const expensesSum = useSignal(
    transactions.filter((t) => t.isExpense).reduce((prev, curr) => prev + curr.value, 0)
  )

  const labels = ['Dochody', 'Wydatki']
  const datasets = useSignal<Dataset[]>([
    {
      label: 'Suma',
      data: [incomesSum.value, expensesSum.value],
      backgroundColor: ['#8DBE88', '#E68080'],
      circumference: 180,
      rotation: 270
    }
  ])

  return (
    <div class="flex flex-row justify-center items-center h-56">
      <DoughnutChart id="overview-doughnut-chart" labels={labels} datasets={datasets.value} />
    </div>
  )
})
