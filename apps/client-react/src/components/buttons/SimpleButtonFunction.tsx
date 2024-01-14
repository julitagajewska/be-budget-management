import { ReactElement } from 'react'

type Variant = 'primary' | 'neutral'
type SimpleButtonProps = {
  text: string
  icon: ReactElement
  variant?: Variant
  handleClick: () => void
}

const styles: Record<Variant, string> = {
  primary:
    'flex flex-row items-center justify-center text-text-50 bg-primary-600 hover:bg-primary-700 react-primary h-6 pl-2 pr-4 text-xs rounded-md w-max gap-2 button-small text-base',
  neutral:
    'flex flex-row items-center justify-center text-text-50 bg-neutral-600 hover:bg-neutral-700 h-6 pl-2 pr-4 text-xs rounded-md w-max gap-2 button-small text-base'
}

const SimpleButton = ({ text, icon, variant = 'primary', handleClick }: SimpleButtonProps) => {
  return (
    <button type="button" className={styles[variant]} onClick={handleClick}>
      {icon}
      {text}
    </button>
  )
}

export default SimpleButton
