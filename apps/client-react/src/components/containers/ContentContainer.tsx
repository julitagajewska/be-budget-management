import React from 'react'

const ContentContainer = ({ children }: React.PropsWithChildren) => {
  return <div className="content-container">{children}</div>
}

export default ContentContainer
