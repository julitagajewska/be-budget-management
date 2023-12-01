import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageName } from '../../redux/slices/pageHeaderSlice'

const GoalPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPageName('Szczegóły celu'))
  }, [])

  return <div>Cel - ID: ...</div>
}

export default GoalPage
