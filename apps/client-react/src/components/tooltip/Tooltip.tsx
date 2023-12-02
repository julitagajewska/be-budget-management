import React, { useState } from 'react'

type Side = 'left' | 'right' | 'top' | 'bottom'
const sideStyles: Record<Side, string> = {
  left: 'right-[30px]',
  right: 'left-[30px]',
  top: 'bottom-[30px]',
  bottom: 'top-[30px]'
}

type TooltipProps = {
  text: string
  side?: Side
}

const Tooltip = ({ children, text, side = 'bottom' }: React.PropsWithChildren<TooltipProps>) => {
  const [visible, setVisible] = useState(false)

  return (
    <div className="relative flex flex-row justify-center items-center">
      <div onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
        {children}
      </div>

      {visible && (
        <div
          className={`${sideStyles[side]} shadow-md shadow-background-300 text-text-950 transition-all ease-in-out duration-300 bg-background-50 absolute flex flex-col justify-center items-center z-20 rounded-md px-4 py-1 text-sm w-max`}
        >
          {text}
        </div>
      )}
    </div>
  )
}

export default Tooltip
