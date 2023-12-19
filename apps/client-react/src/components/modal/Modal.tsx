import React, { useEffect, useRef } from 'react'

type ModalProps = {
  handleClose: () => void
}

const Modal = ({ children, handleClose }: React.PropsWithChildren<ModalProps>) => {
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let handler = (e: MouseEvent) => {
      console.log('Here!')
      if (popupRef.current !== null) {
        if (!popupRef.current.contains(e.target as Node)) {
          handleClose()
        }
      }
    }
    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  })

  return (
    <div className="relative">
      <div className="w-screen h-screen fixed z-10 top-0 left-0 bg-black bg-opacity-25 flex flex-col justify-center items-center">
        <div
          ref={popupRef}
          className="bg-background-50 w-96 left-auto rounded-lg shadow-md px-8 py-6 flex flex-col justify-start gap-4"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
