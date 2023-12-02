import { useEffect } from 'react'
import { setPageHeaderState, setPageName } from '../../redux/slices/pageHeaderSlice'
import { useDispatch } from 'react-redux'

const TransactionsListPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      setPageHeaderState({
        pageName: 'Transakcje',
        isMonthPickerVisible: true,
        isSideButtonVisible: false
      })
    )
  }, [])

  return <div>Lista transakcji użytkownika</div>
}

export default TransactionsListPage
