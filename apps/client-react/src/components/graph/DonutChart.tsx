import React from 'react'
import { useGetUsersTransactionsQuery } from '../../redux/api/slices/transactionSlice'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useGetUsersCategoriesQuery } from '../../redux/api/slices/categorySlice'
import { Doughnut } from 'react-chartjs-2'

type DonutChartProps = {
  transactionType: 'incomes' | 'expenses' | 'both'
  dataType: 'count' | 'sum'
  half?: boolean
}

const DonutChart = ({ transactionType, dataType, half }: DonutChartProps) => {
  const { id } = useParams()
  const currentUser = useSelector((state: RootState) => state.currentUser.currentUser)

  // ACCOUNT'S TRANSACTIONS
  const { data: allTransactions, isSuccess: isTransactionsQuerySuccess } =
    useGetUsersTransactionsQuery({ id: currentUser?.id })
  const transactions = allTransactions?.filter((t) => t.accountId === id)

  const incomes = transactions?.filter((t) => !t.isExpense)
  const expenses = transactions?.filter((t) => t.isExpense)

  // TRANSACTION CATEGORIES
  const { data: allCategories, isSuccess: isCategoriesQuerySuccess } = useGetUsersCategoriesQuery({
    id: currentUser?.id
  })

  // Działa
  const incomesCategoriesIds = [...new Set(incomes?.map((i) => i.categoryId))]
  const incomesCategories = incomesCategoriesIds.map(
    (id) => allCategories?.find((c) => c.id === id)
  )

  const incomesLabels = incomesCategories.map((c) => c?.name)

  // Działa
  const expensesCategoriesIds = [...new Set(expenses?.map((i) => i.categoryId))]
  const expensesCategories = expensesCategoriesIds.map(
    (id) => allCategories?.find((c) => c.id === id)
  )

  const expensesLabels = expensesCategories.map((c) => c?.name)

  // INCOMES DATA
  const incomesSumPerCategory = incomesCategoriesIds
    ?.map((id) => incomes?.filter((i) => i.categoryId === id))
    .map((ta) => ta?.reduce((acc, cur) => acc + cur.value, 0))

  const incomesCountPerCategory = incomesCategoriesIds?.map(
    (id) => incomes?.filter((i) => i.categoryId === id).length
  )

  // EXPENSES DATA
  const expensesSumPerCategory = expensesCategoriesIds
    ?.map((id) => expenses?.filter((i) => i.categoryId === id))
    .map((ta) => ta?.reduce((acc, cur) => acc + cur.value, 0))

  const expensesCountPerCategory = expensesCategoriesIds?.map(
    (id) => expenses?.filter((i) => i.categoryId === id).length
  )

  // ALL TRANSACTIONS LABELS
  const allTransactionsChartLabels = ['Dochody', 'Wydatki']
  const incomesTotalSum = incomesSumPerCategory.reduce((acc, cur) => {
    if (acc !== undefined && cur !== undefined) return acc + cur
    return 0
  }, 0)

  const expensesTotalSum = expensesSumPerCategory.reduce((acc, cur) => {
    if (acc !== undefined && cur !== undefined) return acc + cur
    return 0
  }, 0)

  const incomesTotalCount = incomesCountPerCategory.reduce((acc, cur) => {
    console.log(acc, cur)
    if (acc !== undefined && cur !== undefined) return acc + cur
    return 0
  }, 0)

  console.log(incomesTotalCount)

  const expensesTotalCount = expensesCountPerCategory.reduce((acc, cur) => {
    if (acc !== undefined && cur !== undefined) return acc + cur
    return 0
  }, 0)

  const datasets = {
    incomes: {
      sum: {
        title: 'Suma dochodów - podział na kategorie',
        tooltip: 'Suma transakcji: ',
        labels: incomesLabels,
        data: incomesSumPerCategory
      },
      count: {
        title: 'Liczba dochodów - podział na kategorie',
        tooltip: 'Liczba transakcji: ',
        labels: incomesLabels,
        data: incomesCountPerCategory
      },
      backgroundColors: ['#3C6255', '#61876E', '#A6BB8D', '#EAE7B1']
    },
    expenses: {
      sum: {
        title: 'Suma wydatków - podział na kategorie',
        tooltip: 'Suma transakcji: ',
        labels: expensesLabels,
        data: expensesSumPerCategory
      },
      count: {
        title: 'Liczba wydatków - podział na kategorie',
        tooltip: 'Liczba transakcji: ',
        labels: expensesLabels,
        data: expensesCountPerCategory
      },
      backgroundColors: ['#FFBB5C', '#FF9B50', '#E25E3E', '#C63D2F']
    },
    both: {
      sum: {
        title: 'Suma transakcji - wydatki i dochody',
        tooltip: 'Suma transakcji: ',
        labels: allTransactionsChartLabels,
        data: [incomesTotalSum, expensesTotalSum]
      },
      count: {
        title: 'Liczba transakcji - wydatki i dochody',
        tooltip: 'Liczba transakcji: ',
        labels: allTransactionsChartLabels,
        data: [incomesTotalCount, expensesTotalCount]
      },
      backgroundColors: ['#8DBE88', '#E68080']
    }
  }

  if (half) {
    return (
      <div className="flex flex-row justify-center items-center h-56">
        <Doughnut
          options={{
            plugins: {
              legend: {
                position: 'right',
                display: false
              }
            }
          }}
          data={{
            labels: datasets['both'][dataType].labels,
            datasets: [
              {
                label: datasets['both'][dataType].tooltip,
                data: datasets['both'][dataType].data,
                backgroundColor: datasets['both'].backgroundColors,
                circumference: 180,
                rotation: 270
              }
            ]
          }}
        />
      </div>
    )
  }

  return (
    <div className="w-[80%] flex flex-row justify-center">
      <Doughnut
        options={{
          plugins: {
            legend: {
              position: 'right'
            }
          }
        }}
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

export default DonutChart
