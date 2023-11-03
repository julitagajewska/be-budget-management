import React from 'react'

const NavigationContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="flex flex-row gap-16">{children}</div>
  )
}

export default NavigationContainer
