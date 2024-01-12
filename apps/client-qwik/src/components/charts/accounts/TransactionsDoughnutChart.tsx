import { component$, useComputed$ } from '@builder.io/qwik'
import { DoughnutChart } from '../DoughnutChart'
import type { TransactionDTO, CategoryDTO } from 'shared-types'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import utc from 'dayjs/plugin/utc'
import type { Dataset } from 'shared-types/types/components/charts/Doughnut'

type TransactionsDoughnutChartProps = {
  transactions: TransactionDTO[]
  categories: CategoryDTO[]
  dataType: 'SUM' | 'COUNT'
  transactionType: 'INCOMES' | 'EXPENSES' | 'BOTH'
  startDate: string
  endDate: string
}

export const TransactionsDoughnutChart = component$(
  ({
    transactions: allTransactions,
    categories: allCategories,
    dataType,
    transactionType,
    startDate,
    endDate
  }: TransactionsDoughnutChartProps) => {
    const start = useComputed$(() => {
      dayjs.extend(utc)
      return dayjs(startDate).utc(true).toString()
    })
    const end = useComputed$(() => {
      dayjs.extend(utc)
      return dayjs(endDate).utc(true).toString()
    })

    // CATEGORIES
    const categories = useComputed$(() =>
      allCategories.filter((c) => c.categoryType === 'TRANSACTION')
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
    const incomeCategoryIds = useComputed$(() => [
      ...new Set(incomes.value.map((i) => i.categoryId))
    ])
    const incomeCategories = useComputed$(() =>
      categories.value.filter((c) => incomeCategoryIds.value.includes(c.id))
    )
    const incomesSum = useComputed$(() =>
      incomeCategories.value
        .map((c) => incomes.value.filter((i) => i.categoryId === c.id))
        .map((ta) => ta.reduce((acc, cur) => acc + cur.value, 0))
    )
    const incomesCount = useComputed$(() =>
      incomeCategories.value
        .map((c) => incomes.value.filter((i) => i.categoryId === c.id))
        .map((ta) => ta.reduce((acc) => acc + 1, 0))
    )

    const incomesTotalSum = useComputed$(() =>
      incomes.value.reduce((prev, curr) => prev + curr.value, 0)
    )
    const incomesTotalCount = useComputed$(() => incomes.value.reduce((prev) => prev + 1, 0))

    // EXPENSES
    const expenses = useComputed$(() => transactions.value.filter((t) => t.isExpense))
    const expenseCategoryIds = useComputed$(() => [
      ...new Set(expenses.value.map((i) => i.categoryId))
    ])
    const expenseCategories = useComputed$(() =>
      categories.value.filter((c) => expenseCategoryIds.value.includes(c.id))
    )

    const expensesSum = useComputed$(() =>
      expenseCategories.value
        .map((c) => expenses.value.filter((i) => i.categoryId === c.id))
        .map((ta) => ta.reduce((acc, cur) => acc + cur.value, 0))
    )
    const expensesCount = useComputed$(() =>
      expenseCategories.value
        .map((c) => expenses.value.filter((i) => i.categoryId === c.id))
        .map((ta) => ta.reduce((acc) => acc + 1, 0))
    )

    const expensesTotalSum = useComputed$(() =>
      expenses.value.reduce((prev, curr) => prev + curr.value, 0)
    )
    const expensesTotalCount = useComputed$(() => expenses.value.reduce((prev) => prev + 1, 0))

    const incomesColors = ['#3C6255', '#61876E', '#A6BB8D', '#EAE7B1']
    const expensesColors = ['#FFBB5C', '#FF9B50', '#E25E3E', '#C63D2F']
    const allTransactionsColors = ['#8DBE88', '#E68080']

    const datasets = useComputed$<Dataset[]>(() => {
      switch (transactionType) {
        case 'INCOMES':
          return [
            {
              label: dataType === 'SUM' ? 'Suma dochodów' : 'Liczba dochodów',
              data: dataType === 'SUM' ? incomesSum.value : incomesCount.value,
              backgroundColor: incomesColors
            }
          ]
        case 'EXPENSES':
          return [
            {
              label: dataType === 'SUM' ? 'Suma wydatków' : 'Liczba wydatków',
              data: dataType === 'SUM' ? expensesSum.value : expensesCount.value,
              backgroundColor: expensesColors
            }
          ]
        case 'BOTH':
          return [
            {
              label: dataType === 'SUM' ? 'Suma transakcji' : 'Liczba transakcji',
              data:
                dataType === 'SUM'
                  ? [incomesTotalSum.value, expensesTotalSum.value]
                  : [incomesTotalCount.value, expensesTotalCount.value],
              backgroundColor: allTransactionsColors
            }
          ]
      }
    })

    const chartLabels = useComputed$(() => {
      switch (transactionType) {
        case 'INCOMES':
          return incomeCategories.value.map((c) => c.name)
        case 'EXPENSES':
          return expenseCategories.value.map((c) => c.name)
        case 'BOTH':
          return ['Dochody', 'Wydatki']
      }
    })

    return (
      <div class="flex flex-row justify-center items-center h-56">
        <DoughnutChart
          labels={chartLabels.value}
          datasets={datasets.value}
          id="transactions-categories-overview-doughnut-chart"
        />
      </div>
    )
  }
)
