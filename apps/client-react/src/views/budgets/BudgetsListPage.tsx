import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageName } from '../../redux/slices/pageHeaderSlice'

const BudgetsListPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPageName('Budżety'))
  }, [])

  return <div>Lista budżetów użytkownika</div>
}

export default BudgetsListPage
