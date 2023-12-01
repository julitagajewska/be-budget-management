import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageName } from '../../redux/slices/pageHeaderSlice'

const UserProfilePage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPageName('Profil użytkownika'))
  }, [])

  return <div>Profil użytkownika</div>
}

export default UserProfilePage
