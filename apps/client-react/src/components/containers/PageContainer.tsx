import React from 'react'

const PageContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="react-light page-container">
      <div className="page-content-wrapper">{children}</div>
    </div>
  )
}

export default PageContainer
