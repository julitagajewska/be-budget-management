<script setup lang="ts">
import dayjs from 'dayjs'
import { TransactionDTO } from 'shared-types'
import { computed } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import utils from 'shared-utils'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// PROPS
type BarChartProps = {
  transactions: TransactionDTO[]
  dataType: 'SUM' | 'COUNT'
  transactionType: 'INCOMES' | 'EXPENSES' | 'BOTH'
  startDate: string
  endDate: string
}

const props = withDefaults(defineProps<BarChartProps>(), {})

// STATE
let start = computed(() => dayjs(props.startDate))
let end = computed(() => dayjs(props.endDate))

const transactions = computed(() =>
  props.transactions.filter((t) => {
    return dayjs(t.date).isBetween(start.value, end.value, 'day')
  })
)

// MONTHS
let diff = computed(() => end.value.diff(start.value, 'month'))
let monthsArray = computed(() => {
  let array = []
  for (let i = 0; i < diff.value; i++) {
    array.push(start.value.add(i, 'month'))
  }

  return array
})

let monthsNames = computed(() =>
  monthsArray.value.map((m) => utils.capitalizeFirstLetter(m.format('MMMM').toString()))
)

// INCOMES
const incomes = computed(() => transactions.value.filter((t) => !t.isExpense))
const incomesPerMonth = computed(() =>
  monthsArray.value.map((date) =>
    incomes.value.filter((i) => {
      let first = date.startOf('month')
      let last = date.endOf('month')
      return dayjs(i.date).isBetween(first, last, 'day', '[)')
    })
  )
)
const incomesSumPerMonth = incomesPerMonth.value.map(
  (a) => a?.reduce((acc, cur) => acc + cur.value, 0)
)
const incomesCountPerMonth = incomesPerMonth.value.map((a) => a?.reduce((acc) => acc + 1, 0))

// EXPENSES
const expenses = computed(() => transactions.value.filter((t) => t.isExpense))
const expensesPerMonth = computed(() =>
  monthsArray.value.map((date) =>
    expenses.value.filter((i) => {
      let first = date.startOf('month')
      let last = date.endOf('month')
      return dayjs(i.date).isBetween(first, last, 'day', '[)')
    })
  )
)

const expensesSumPerMonth = expensesPerMonth.value.map(
  (a) => a?.reduce((acc, cur) => acc + cur.value, 0)
)
const expensesCountPerMonth = expensesPerMonth.value.map((a) => a?.reduce((acc) => acc + 1, 0))

const dataSets = computed(() => {
  switch (props.transactionType) {
    case 'INCOMES':
      return {
        datasets: [
          {
            label: props.dataType === 'SUM' ? 'Suma dochodów' : 'Liczba dochodów',
            data: props.dataType === 'SUM' ? incomesSumPerMonth : incomesCountPerMonth,
            backgroundColor: ['#3C6255', '#61876E', '#A6BB8D', '#EAE7B1']
          }
        ]
      }
    case 'EXPENSES':
      return {
        datasets: [
          {
            label: props.dataType === 'SUM' ? 'Suma wydatków' : 'Liczba wydatków',
            data: props.dataType === 'SUM' ? expensesSumPerMonth : expensesCountPerMonth,
            backgroundColor: ['#FFBB5C', '#FF9B50', '#E25E3E', '#C63D2F']
          }
        ]
      }
    case 'BOTH':
      return {
        datasets: [
          {
            label: props.dataType === 'SUM' ? 'Suma dochodów' : 'Liczba dochodów',
            data: props.dataType === 'SUM' ? incomesSumPerMonth : incomesCountPerMonth,
            backgroundColor: ['#8DBE88']
          },
          {
            label: props.dataType === 'SUM' ? 'Suma wydatków' : 'Liczba wydatków',
            data: props.dataType === 'SUM' ? expensesSumPerMonth : expensesCountPerMonth,
            backgroundColor: ['#E68080']
          }
        ]
      }
  }
})

const data = computed(() => ({
  labels: monthsNames.value,
  datasets: dataSets.value.datasets
}))
</script>

<template>
  <Bar :data="data" />
</template>
