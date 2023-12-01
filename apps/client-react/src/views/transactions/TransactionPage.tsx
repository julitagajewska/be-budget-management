import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageName } from '../../redux/slices/pageHeaderSlice'

const TransactionPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPageName('Szczegóły transakcji'))
  }, [])

  return <div>Transakcja - ID: ...</div>
}

export default TransactionPage
