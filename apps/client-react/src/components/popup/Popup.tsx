import { PropsWithChildren, ReactNode, useEffect, useRef } from 'react'

type Side = 'left' | 'right' | 'top' | 'bottom-left'
const sideStyles: Record<Side, string> = {
  left: 'right-[30px]',
  right: 'left-[30px]',
  top: 'bottom-[30px]',
  'bottom-left': 'top-[30px] right-[30px]'
}

type PopupProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  side?: Side
  content?: ReactNode
}

const Popup = ({
  children,
  open,
  setOpen,
  side = 'bottom-left',
  content
}: PropsWithChildren<PopupProps>) => {
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (popupRef.current !== null) {
        if (!popupRef.current.contains(e.target as Node)) {
          setOpen(false)
        }
      }
    }
    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  })

  return (
    <div className="relative flex flex-row justify-center items-center">
      <div>{children}</div>

      {open && (
        <div
          ref={popupRef}
          className={`${sideStyles[side]} shadow-md shadow-background-300 text-text-950 transition-all ease-in-out duration-300 bg-background-50 absolute flex flex-col justify-center items-center z-20 rounded-md text-sm w-max`}
        >
          {content}
        </div>
      )}
    </div>
  )
}

export default Popup
