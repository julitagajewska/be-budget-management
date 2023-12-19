<script setup lang="ts">
import dayjs, { Dayjs } from 'dayjs'
import accountsService from '../../services/accountsService'
import { computed, onMounted, ref } from 'vue'
import { TransactionDTO } from '../../../../../packages/shared-types/types'
import { useRoute } from 'vue-router'
import isBetween from 'dayjs/plugin/isBetween'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

type BarChartProps = {
  transactionType: 'incomes' | 'expenses' | 'both'
  dataType: 'sum' | 'count'
  startDate: string
  endDate: string
}

const props = withDefaults(defineProps<BarChartProps>(), {
  transactionType: 'incomes',
  dataType: 'sum',
  startDate: dayjs().toString(),
  endDate: dayjs().add(6, 'month').toString()
})

const id = ref()
const transactions = ref<TransactionDTO[]>([])
const route = useRoute()

dayjs.extend(isBetween)

async function getTransactions(accountId: string) {
  transactions.value = await accountsService.getAccountsTransactions('123', accountId)
}

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

let start = dayjs(props.startDate)
let end = dayjs(props.endDate)
let diff = end.diff(start, 'month')
let monthsArray: Dayjs[] = []

for (let i = 0; i < diff; i++) {
  monthsArray.push(dayjs(start).add(i, 'month'))
}

let monthsNames = monthsArray.map((m) => capitalizeFirstLetter(m.format('MMMM').toString()))

// const incomes = computed(
//   () =>
//     transactions.value
//       ?.filter((t) => !t.isExpense)
//       .filter((t) => dayjs(t.date).isBetween(start, end, 'day', '[]'))
// )

// const expenses = computed(
//   () =>
//     transactions.value
//       ?.filter((t) => t.isExpense)
//       .filter((t) => dayjs(t.date).isBetween(start, end, 'month'))
// )

// const incomesPerMonth = computed(() =>
//   monthsArray.map(
//     (date) =>
//       incomes.value?.filter((i) => {
//         let first = date.startOf('month')
//         let last = date.endOf('month')
//         return dayjs(i.date).isBetween(first, last, 'day', '[)')
//       })
//   )
// )

// const expensesPerMonth = computed(() =>
//   monthsArray.map(
//     (date) =>
//       expenses.value?.filter((i) => {
//         let first = date.startOf('month')
//         let last = date.endOf('month')
//         return dayjs(i.date).isBetween(first, last, 'day', '[)')
//       })
//   )
// )

onMounted(() => {
  id.value = route.params.id
  getTransactions(id.value)
})

const charOptions = {
  responsive: true
}

const charData = {
  labels: ['January', 'February', 'March'],
  datasets: [{ data: [40, 20, 12] }]
}
</script>

<template>
  <div>
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div>
</template>
