import { useEffect } from 'react'
import { setPageName } from '../../redux/slices/pageHeaderSlice'
import { useDispatch } from 'react-redux'

const IncomesPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPageName('Dochody'))
  }, [])

  return <div>Lista dochodów</div>
}

export default IncomesPage
