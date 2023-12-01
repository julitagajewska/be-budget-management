import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageName } from '../../redux/slices/pageHeaderSlice'

const AccountsListPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPageName('Konta'))
  }, [])

  return <div>Konta użytkownika</div>
}

export default AccountsListPage
