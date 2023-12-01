import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageName } from '../../redux/slices/pageHeaderSlice'

const AccountPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPageName('Szczegóły konta'))
  }, [])

  return <div>Konto - ID: ...</div>
}

export default AccountPage
