import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageName } from '../../redux/slices/pageHeaderSlice'

const SettingsPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPageName('Ustawienia'))
  }, [])

  return <div>Ustawienia</div>
}

export default SettingsPage
