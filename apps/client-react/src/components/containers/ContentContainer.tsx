import React, { useEffect } from 'react'

const ContentContainer = ({ children }: React.PropsWithChildren) => {
  // useEffect(() => {
  //   const token = localStorage.getItem('token')
  // }, [])

  return <div className="content-container">{children}</div>
}

export default ContentContainer
