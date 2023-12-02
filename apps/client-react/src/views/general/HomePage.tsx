import React, { useEffect } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/page-header/PageHeader'
import ContentContainer from '../../components/containers/ContentContainer'
import { useDispatch } from 'react-redux'
import {
  setButtonType,
  setIsMonthPickerVisible,
  setIsSideButtonVisible,
  setPageName
} from '../../redux/slices/pageHeaderSlice'
import { setSelectedDate } from '../../redux/slices/monthPickerSlice'
import dayjs from 'dayjs'
import SummaryTile from '../../components/tile/SummaryTile'
import { Bag, Savings, TrendDown, TrendUp } from '../../components/icons'

const HomePage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPageName('Strona główna'))
    dispatch(setIsMonthPickerVisible(true))
    dispatch(setIsSideButtonVisible(true))
    dispatch(setButtonType('DASHBOARD_SETTINGS'))
    dispatch(setSelectedDate(dayjs().toString()))
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

  return (
    <div className="w-full flex flex-col gap-6 py-6">
      <div className="flex flex-row w-full h-24 gap-6">
        <SummaryTile text={'Nazwa konta'} value={'123 456'} Icon={Bag} color={'primary'} />
        <SummaryTile text={'Dochody'} value={'123 456'} Icon={TrendUp} color={'green'} />
        <SummaryTile text={'Wydatki'} value={'123 456'} Icon={TrendDown} color={'red'} />
        <SummaryTile text={'Oszczędności'} value={'123 456'} Icon={Savings} color={'secondary'} />
      </div>
      <div className="flex flex-row w-full h-64 gap-6">
        <div className="w-2/3 h-full bg-neutral-50 rounded-lg shadow-md">Wykres</div>
        <div className="w-1/3 h-full bg-neutral-50 rounded-lg shadow-md">Wykres</div>
      </div>
      <div className="flex flex-row w-full h-64 gap-6">
        <div className="w-1/2 h-full bg-neutral-50 rounded-lg shadow-md">Wykres</div>
        <div className="w-1/2 h-full bg-neutral-50 rounded-lg shadow-md">Tabela</div>
      </div>
    </div>
  )
}

export default HomePage
