import { component$, useSignal, useTask$ } from '@builder.io/qwik'
import { Chart, registerables } from 'chart.js'
import type { Dataset } from 'shared-types/types/components/charts/Doughnut'

type DoughnutChartProps = {
  id: string
  labels: string[]
  datasets: Dataset[]
}

export const DoughnutChart = component$(({ id, labels, datasets }: DoughnutChartProps) => {
  const doughnutChartRef = useSignal<HTMLCanvasElement>()

  console.log(labels, datasets)

  useTask$(({ track }) => {
    track(() => [labels, datasets, doughnutChartRef.value])

    if (doughnutChartRef.value) {
      const existingChart = Chart.getChart(id)

      if (existingChart) {
        existingChart.destroy()
      }

      Chart.register(...registerables)
      new Chart(doughnutChartRef.value, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: datasets
        },
        options: {
          plugins: {
            legend: {
              display: false
            }
          }
        }
      })
    }
  })

  return <canvas ref={doughnutChartRef} id={id}></canvas>
})
