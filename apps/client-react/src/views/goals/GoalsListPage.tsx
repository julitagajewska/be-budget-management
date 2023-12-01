import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageName } from '../../redux/slices/pageHeaderSlice'

const GoalsListPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPageName('Cele'))
  }, [])

  return <div>Lista celów użytkownika</div>
}

export default GoalsListPage
