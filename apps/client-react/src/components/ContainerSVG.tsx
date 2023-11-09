import React from 'react'

const ContainerSVG = ({ children }: React.PropsWithChildren) => {
  return (
    <div className=" fixed z-0 right-[-800px] top-[-60px]">{children}</div>
  )
}

export default ContainerSVG
