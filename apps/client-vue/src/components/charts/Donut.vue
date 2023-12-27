<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import TransactionDTO from 'shared-types/types/dto/TransactionDTO'
import { Doughnut } from 'vue-chartjs'
import dayjs from 'dayjs'
import IsBetween from 'dayjs/plugin/isBetween'
import { computed } from 'vue'
import { CategoryDTO } from 'shared-types'

dayjs.extend(IsBetween)
ChartJS.register(ArcElement, Tooltip, Legend)

// PROPS
type DonutChartProps = {
  transactions: TransactionDTO[]
  categories: CategoryDTO[]
  dataType: 'SUM' | 'COUNT'
  transactionType: 'INCOMES' | 'EXPENSES' | 'BOTH'
  startDate: string
  endDate: string
}

const props = withDefaults(defineProps<DonutChartProps>(), {})

// CONFIG
let categories = computed(() => props.categories.filter((c) => c.categoryType === 'TRANSACTION'))
let start = computed(() => dayjs(props.startDate))
let end = computed(() => dayjs(props.endDate))

const transactions = computed(() =>
  props.transactions.filter((t) => {
    return dayjs(t.date).isBetween(start.value, end.value, 'day')
  })
)

// INCOMES
const incomes = computed(() => transactions.value.filter((t) => !t.isExpense))
const incomeCategoryIds = computed(() => [...new Set(incomes.value.map((i) => i.categoryId))])
const incomeCategories = computed(() =>
  categories.value.filter((c) => incomeCategoryIds.value.includes(c.id))
)
const incomesSum = computed(() =>
  incomeCategories.value
    .map((c) => incomes.value.filter((i) => i.categoryId === c?.id))
    .map((ta) => ta?.reduce((acc, cur) => acc + cur.value, 0))
)
const incomesCount = computed(() =>
  incomeCategories.value
    .map((c) => incomes.value.filter((i) => i.categoryId === c?.id))
    .map((ta) => ta?.reduce((acc, _) => acc + 1, 0))
)

const incomesTotalSum = computed(() => incomes.value.reduce((prev, curr) => prev + curr.value, 0))
const incomesTotalCount = computed(() => incomes.value.reduce((prev, _) => prev + 1, 0))

// EXPENSES
const expenses = computed(() => transactions.value.filter((t) => t.isExpense))
const expenseCategoryIds = computed(() => [...new Set(expenses.value.map((i) => i.categoryId))])
const expenseCategories = computed(() =>
  categories.value.filter((c) => expenseCategoryIds.value.includes(c.id))
)

const expensesSum = computed(() =>
  expenseCategories.value
    .map((c) => expenses.value.filter((i) => i.categoryId === c?.id))
    .map((ta) => ta?.reduce((acc, cur) => acc + cur.value, 0))
)
const expensesCount = computed(() =>
  expenseCategories.value
    .map((c) => expenses.value.filter((i) => i.categoryId === c?.id))
    .map((ta) => ta?.reduce((acc, _) => acc + 1, 0))
)

const expensesTotalSum = computed(() => expenses.value.reduce((prev, curr) => prev + curr.value, 0))
const expensesTotalCount = computed(() => expenses.value.reduce((prev, _) => prev + 1, 0))

const incomesColors = ['#3C6255', '#61876E', '#A6BB8D', '#EAE7B1']
const expensesColors = ['#FFBB5C', '#FF9B50', '#E25E3E', '#C63D2F']
const allTransactionsColors = ['#8DBE88', '#E68080']

const dataSets = computed(() => {
  switch (props.transactionType) {
    case 'INCOMES':
      return {
        labels: incomeCategories.value.map((c) => c?.name),
        dataset: props.dataType === 'SUM' ? incomesSum.value : incomesCount.value
      }
    case 'EXPENSES':
      return {
        labels: expenseCategories.value.map((c) => c?.name),
        dataset: props.dataType === 'SUM' ? expensesSum.value : expensesCount.value
      }
    case 'BOTH':
      return {
        labels: ['Dochody', 'Wydatki'],
        dataset:
          props.dataType === 'SUM'
            ? [incomesTotalSum.value, expensesTotalSum.value]
            : [incomesTotalCount.value, expensesTotalCount.value]
      }
  }
})

const chartColors = computed(() => {
  switch (props.transactionType) {
    case 'INCOMES':
      return incomesColors
    case 'EXPENSES':
      return expensesColors
    case 'BOTH':
      return allTransactionsColors
  }
})

const data = computed(() => ({
  labels: dataSets.value.labels,
  datasets: [
    {
      data: dataSets.value.dataset,
      label: props.dataType === 'SUM' ? 'Suma' : 'Liczba',
      backgroundColor: chartColors.value,
      rotation: -90
    }
  ]
}))

const options = computed(() => ({
  plugins: {
    legend: {
      display: false
    }
  }
}))

// OPTIONS
</script>

<template>
  <div className="w-full h-64 flex flex-row justify-center">
    <Doughnut :data="data" :options="options" />
  </div>
</template>
