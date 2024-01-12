import { component$, useComputed$ } from '@builder.io/qwik'
import type { TransactionDTO } from 'shared-types'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import utc from 'dayjs/plugin/utc'
import utils from 'shared-utils'
import { BarChart } from '../BarChart'
import type { Dataset } from 'shared-types/types/components/charts/Doughnut'

type TransactionsBarChartProps = {
  transactions: TransactionDTO[]
  dataType: 'SUM' | 'COUNT'
  transactionType: 'INCOMES' | 'EXPENSES' | 'BOTH'
  startDate: string
  endDate: string
}

export const TransactionsBarChart = component$(
  ({
    transactions: allTransactions,
    dataType,
    transactionType,
    startDate,
    endDate
  }: TransactionsBarChartProps) => {
    const start = useComputed$(() => {
      dayjs.extend(utc)
      return dayjs(startDate).utc(true).toString()
    })
    const end = useComputed$(() => {
      dayjs.extend(utc)
      return dayjs(endDate).utc(true).toString()
    })

    // MONTHS
    const diff = useComputed$(() => dayjs(end.value).diff(dayjs(start.value), 'month'))
    const monthsArray = useComputed$(() => {
      const array = []
      for (let i = 0; i < diff.value; i++) {
        array.push(dayjs(start.value).add(i, 'month').toString())
      }
      return array
    })

    const monthsNames = useComputed$(() =>
      monthsArray.value.map((m) => utils.capitalizeFirstLetter(dayjs(m).format('MMMM').toString()))
    )

    // TRANSACTIONS
    const transactions = useComputed$(() => {
      dayjs.extend(isBetween)
      return allTransactions.filter((t) => {
        return dayjs(t.date).isBetween(start.value, end.value, 'day')
      })
    })

    // INCOMES
    const incomes = useComputed$(() => transactions.value.filter((t) => !t.isExpense))

    const incomesPerMonth = useComputed$(() =>
      monthsArray.value.map((date) =>
        incomes.value.filter((i) => {
          const first = dayjs(date).startOf('month')
          const last = dayjs(date).endOf('month')
          return dayjs(i.date).isBetween(first, last, 'day', '[)')
        })
      )
    )

    const incomesSumPerMonth = useComputed$(() =>
      incomesPerMonth.value.map((a) => a.reduce((acc, cur) => acc + cur.value, 0))
    )

    const incomesCountPerMonth = useComputed$(() =>
      incomesPerMonth.value.map((a) => a.reduce((acc) => acc + 1, 0))
    )

    // EXPENSES
    const expenses = transactions.value.filter((t) => t.isExpense)
    const expensesPerMonth = monthsArray.value.map((date) =>
      expenses.filter((i) => {
        const first = dayjs(date).startOf('month')
        const last = dayjs(date).endOf('month')
        return dayjs(i.date).isBetween(first, last, 'day', '[)')
      })
    )
    const expensesSumPerMonth = useComputed$(() =>
      expensesPerMonth.map((a) => a.reduce((acc, cur) => acc + cur.value, 0))
    )
    const expensesCountPerMonth = useComputed$(() =>
      expensesPerMonth.map((a) => a.reduce((acc) => acc + 1, 0))
    )

    const datasets = useComputed$<Dataset[]>(() => {
      switch (transactionType) {
        case 'INCOMES':
          return [
            {
              label: dataType === 'SUM' ? 'Suma dochodów' : 'Liczba dochodów',
              data: dataType === 'SUM' ? incomesSumPerMonth.value : incomesCountPerMonth.value,
              backgroundColor: ['#3C6255', '#61876E', '#A6BB8D', '#EAE7B1']
            }
          ]
        case 'EXPENSES':
          return [
            {
              label: dataType === 'SUM' ? 'Suma wydatków' : 'Liczba wydatków',
              data: dataType === 'SUM' ? expensesSumPerMonth.value : expensesCountPerMonth.value,
              backgroundColor: ['#FFBB5C', '#FF9B50', '#E25E3E', '#C63D2F']
            }
          ]
        case 'BOTH':
          return [
            {
              label: dataType === 'SUM' ? 'Suma dochodów' : 'Liczba dochodów',
              data: dataType === 'SUM' ? incomesSumPerMonth.value : incomesCountPerMonth.value,
              backgroundColor: ['#8DBE88']
            },
            {
              label: dataType === 'SUM' ? 'Suma wydatków' : 'Liczba wydatków',
              data: dataType === 'SUM' ? expensesSumPerMonth.value : expensesCountPerMonth.value,
              backgroundColor: ['#E68080']
            }
          ]
      }
    })

    return (
      <div>
        <BarChart
          labels={monthsNames.value}
          datasets={datasets.value}
          id="transactions-overview-bar-chart"
        />
      </div>
    )
  }
)
