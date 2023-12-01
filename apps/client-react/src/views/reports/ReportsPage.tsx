import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageName } from '../../redux/slices/pageHeaderSlice'

const ReportsPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPageName('Raporty'))
  }, [])

  return <div>Raporty</div>
}

export default ReportsPage
