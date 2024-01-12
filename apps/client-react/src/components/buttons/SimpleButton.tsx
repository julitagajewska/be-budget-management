import React from 'react'

type SimpleButtonProps = {
  text: string
  Icon: React.ElementType
}

const STYLES =
  'text-text-50 bg-primary-600 hover:bg-primary-700 react-primary h-6 pl-2 pr-4 text-xs rounded-md w-max gap-2 button-small text-base'

const SimpleButton = ({ text, Icon }: SimpleButtonProps) => {
  return (
    <button type="button" className={STYLES}>
      <Icon />
      {text}
    </button>
  )
}

export default SimpleButton
