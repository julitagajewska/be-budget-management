import { ReactNode } from 'react'

type MenuButtonProps = {
  text: string
  icon?: ReactNode
  handleClick: () => void
}

const MenuButton = ({ text, icon, handleClick }: MenuButtonProps) => {
  return (
    <button
      onClick={handleClick}
      className="flex w-32 px-4 py-2 gap-4 flex-row items-center justify-start hover:bg-background-100 transition-all duration-150 ease-in-out"
    >
      {icon}
      {text}
    </button>
  )
}

export default MenuButton
