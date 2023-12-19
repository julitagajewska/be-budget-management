import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from '../../redux/store'
import { useGetUsersTransactionsQuery } from '../../redux/api/slices/transactionSlice'
import isBetween from 'dayjs/plugin/isBetween'
import { Bar } from 'react-chartjs-2'

type BarChartProps = {
  transactionType: 'incomes' | 'expenses' | 'both'
  dataType: 'sum' | 'count'
  startDate: string
  endDate: string
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const BarChart = ({ transactionType, dataType, startDate, endDate }: BarChartProps) => {
  dayjs.extend(isBetween)

  let start = dayjs(startDate)
  let end = dayjs(endDate)
  let diff = end.diff(start, 'month')
  let monthsArray = []

  for (let i = 0; i < diff; i++) {
    monthsArray.push(dayjs(start).add(i, 'month'))
  }

  let monthsNames = monthsArray.map((m) => capitalizeFirstLetter(m.format('MMMM').toString()))

  const { id } = useParams()
  const currentUser = useSelector((state: RootState) => state.currentUser.currentUser)

  const { data: allTransactions } = useGetUsersTransactionsQuery({ id: currentUser?.id })
  const transactions = allTransactions?.filter((t) => t.accountId === id)

  const incomes = transactions
    ?.filter((t) => !t.isExpense)
    .filter((t) => dayjs(t.date).isBetween(start, end, 'day', '[]'))

  const expenses = transactions
    ?.filter((t) => t.isExpense)
    .filter((t) => dayjs(t.date).isBetween(start, end, 'month'))

  const incomesPerMonth = monthsArray.map(
    (date) =>
      incomes?.filter((i) => {
        let first = date.startOf('month')
        let last = date.endOf('month')
        return dayjs(i.date).isBetween(first, last, 'day', '[)')
      })
  )

  const expensesPerMonth = monthsArray.map(
    (date) =>
      expenses?.filter((i) => {
        let first = date.startOf('month')
        let last = date.endOf('month')
        return dayjs(i.date).isBetween(first, last, 'day', '[)')
      })
  )

  const incomesSumPerMonth = incomesPerMonth.map((a) => a?.reduce((acc, cur) => acc + cur.value, 0))
  const incomesCountPerMonth = incomesPerMonth.map((a) => a?.reduce((acc) => acc + 1, 0))

  const expensesSumPerMonth = expensesPerMonth.map(
    (a) => a?.reduce((acc, cur) => acc + cur.value, 0)
  )
  const expensesCountPerMonth = expensesPerMonth.map((a) => a?.reduce((acc) => acc + 1, 0))

  const datasets = {
    incomes: {
      sum: {
        title: 'Suma dochodów na przestrzeni miesięcy',
        tooltip: 'Suma transakcji: ',
        labels: monthsNames,
        data: incomesSumPerMonth
      },
      count: {
        title: 'Liczba dochodów na przestrzeni miesięcy',
        tooltip: 'Liczba transakcji: ',
        labels: monthsNames,
        data: incomesCountPerMonth
      },
      backgroundColors: ['#3C6255', '#61876E', '#A6BB8D', '#EAE7B1']
    },
    expenses: {
      sum: {
        title: 'Suma wydatków na przestrzeni miesięcy',
        tooltip: 'Suma transakcji: ',
        labels: monthsNames,
        data: expensesSumPerMonth
      },
      count: {
        title: 'Liczba wydatków na przestrzeni miesięcy',
        tooltip: 'Liczba transakcji: ',
        labels: monthsNames,
        data: expensesCountPerMonth
      },
      backgroundColors: ['#FFBB5C', '#FF9B50', '#E25E3E', '#C63D2F']
    }
  }

  if (transactionType === 'both') {
    return (
      <div>
        <Bar
          options={{}}
          data={{
            labels: monthsNames,
            datasets: [
              {
                label: dataType === 'count' ? 'Liczba dochodów: ' : 'Suma dochodów: ',
                data: dataType === 'count' ? incomesCountPerMonth : incomesSumPerMonth,
                backgroundColor: ['#8DBE88']
              },
              {
                label: dataType === 'count' ? 'Liczba wydatków: ' : 'Suma wydatków: ',
                data: dataType === 'count' ? expensesCountPerMonth : expensesSumPerMonth,
                backgroundColor: ['#E68080']
              }
            ]
          }}
        />
      </div>
    )
  }

  return (
    <div>
      <Bar
        options={{}}
        data={{
          labels: datasets[transactionType][dataType].labels,
          datasets: [
            {
              label: datasets[transactionType][dataType].tooltip,
              data: datasets[transactionType][dataType].data,
              backgroundColor: datasets[transactionType].backgroundColors
            }
          ]
        }}
      />
    </div>
  )
}
