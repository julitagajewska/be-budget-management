import React from 'react'

type IconOnlyButtonProps = {
  handleClick: () => void
}

const IconOnlyButton = ({
  children,
  handleClick
}: React.PropsWithChildren<IconOnlyButtonProps>) => {
  return (
    <div
      onClick={handleClick}
      className="bg-background-50 p-[6px] cursor-pointer rounded-full text-background-600 hover:bg-background-200 transition-all duration-300 ease-in-out"
    >
      {children}
    </div>
  )
}

export default IconOnlyButton
