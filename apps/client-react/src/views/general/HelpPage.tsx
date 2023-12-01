import { useEffect } from 'react'
import { setPageName } from '../../redux/slices/pageHeaderSlice'
import { useDispatch } from 'react-redux'

const HelpPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPageName('Pomoc'))
  }, [])

  return <div>Pomoc</div>
}

export default HelpPage
