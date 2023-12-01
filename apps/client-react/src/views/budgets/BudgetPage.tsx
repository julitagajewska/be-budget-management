import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageName } from '../../redux/slices/pageHeaderSlice'

const BudgetPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPageName('Szczegóły budżetu'))
  }, [])

  return <div>Budżet - ID: ...</div>
}

export default BudgetPage
