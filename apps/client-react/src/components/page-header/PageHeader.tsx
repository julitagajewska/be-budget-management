import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

const PageHeader = () => {
  // Check if logged in
  const pageName = useSelector((state: RootState) => state.pageHeader.pageName)
  const isLoggedIn = true

  if (isLoggedIn)
    return (
      <div className="bg-pink-200 h-10 w-full flex flex-row justify-between items-center">
        <div>
          <h1>{pageName}</h1>
        </div>
      </div>
    )

  return (
    <div className="bg-pink-200 h-10 w-full flex flex-row justify-between items-center">
      <div>Logo</div>
      <div>Naviagtion</div>
      <div>Login and register</div>
    </div>
  )
}

export default PageHeader
