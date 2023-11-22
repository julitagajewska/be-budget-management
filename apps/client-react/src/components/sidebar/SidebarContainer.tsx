import React, { useState } from 'react'

type SidebarContainerProps = {
  side: 'left' | 'right'
}

const SidebarContainer = ({ children, side }: React.PropsWithChildren<SidebarContainerProps>) => {
  const [open, setOpen] = useState(true)

  const toggle = () => {
    setOpen(!open)
  }

  return (
    <div className={`sidebar-container ${open ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="sidebar-content-container">{children}</div>
    </div>
  )
}

export default SidebarContainer
