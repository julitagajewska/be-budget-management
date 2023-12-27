<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import TransactionDTO from 'shared-types/types/dto/TransactionDTO'
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

// PROPS
type SummaryDonutChartProps = {
  transactions: TransactionDTO[]
}

const props = withDefaults(defineProps<SummaryDonutChartProps>(), {})

// STATE
const incomesSum = computed(() =>
  props.transactions.filter((t) => !t.isExpense).reduce((prev, curr) => prev + curr.value, 0)
)

const expensesSum = computed(() =>
  props.transactions.filter((t) => t.isExpense).reduce((prev, curr) => prev + curr.value, 0)
)

const data = computed(() => ({
  labels: ['Dochody', 'Wydatki'],
  datasets: [
    {
      data: [incomesSum.value, expensesSum.value],
      label: 'Suma',
      backgroundColor: ['#8DBE88', '#E68080'],
      circumference: 180,
      rotation: 270
    }
  ]
}))

const options = {
  plugins: {
    legend: {
      display: false
    }
  }
}

// OPTIONS
</script>

<template>
  <div class="flex flex-row justify-center items-center h-56">
    <Doughnut :data="data" :options="options" />
  </div>
</template>
