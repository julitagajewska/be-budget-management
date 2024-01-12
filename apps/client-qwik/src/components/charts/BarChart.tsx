import { component$, useSignal, useTask$ } from '@builder.io/qwik'
import { Chart, registerables } from 'chart.js'
import type { Dataset } from 'shared-types/types/components/charts/Doughnut'

type BarChartProps = {
  id: string
  labels: string[]
  datasets: Dataset[]
}

export const BarChart = component$(({ id, labels, datasets }: BarChartProps) => {
  const barChartRef = useSignal<HTMLCanvasElement>()

  useTask$(({ track }) => {
    track(() => [labels, datasets, barChartRef.value])

    if (barChartRef.value) {
      const existingChart = Chart.getChart(id)

      if (existingChart) {
        existingChart.destroy()
      }

      Chart.register(...registerables)
      new Chart(barChartRef.value, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: datasets
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      })
    }
  })

  return (
    <div class="w-96">
      <canvas ref={barChartRef} id={id}></canvas>
    </div>
  )
})
