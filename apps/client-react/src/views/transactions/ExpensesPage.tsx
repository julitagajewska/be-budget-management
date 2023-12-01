import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageName } from '../../redux/slices/pageHeaderSlice'

const ExpensesPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPageName('Wydatki'))
  }, [])

  return <div>Lista wydatków</div>
}

export default ExpensesPage
