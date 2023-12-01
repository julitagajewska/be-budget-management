import React, { useEffect } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/page-header/PageHeader'
import ContentContainer from '../../components/containers/ContentContainer'
import { useDispatch } from 'react-redux'
import { setPageName } from '../../redux/slices/pageHeaderSlice'

const HomePage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPageName('Strona główna'))
  }, [])

  const getUserData = () => {
    // get id from the token
    // get user's data
  }

  useEffect(() => {
    // const token = localStorage.getItem('token')
    // if (token) {
    //   const user = jwt.decode(token)
    //   if (!user) {
    //     localStorage.removeItem('token')
    //     navigate('/login')
    //   } else {
    //     getUserData()
    //   }
    // }
  }, [])

  return <div>Dashboard</div>
}

export default HomePage
