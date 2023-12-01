import { useEffect } from 'react'
import { setPageName } from '../../redux/slices/pageHeaderSlice'
import { useDispatch } from 'react-redux'

const TransactionsListPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPageName('Transakcje'))
  }, [])

  return <div>Lista transakcji użytkownika</div>
}

export default TransactionsListPage
