import { SetStateAction } from 'react'

type CheckboxProps = {
  label: string
  id: string
  checked: boolean | undefined
  handleChange: React.Dispatch<SetStateAction<boolean>>
}

const Checkbox = ({ label, id, checked, handleChange }: CheckboxProps) => {
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    let isChecked = e.target.checked
    handleChange(isChecked)
  }
  return (
    <div className="flex flex-row items-center gap-2">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => handleCheck(e)}
        className="accent-primary-600"
      />
      <label id={`${id}-label`} htmlFor={id} className="text-sm text-background-600">
        {label}
      </label>
    </div>
  )
}

export default Checkbox
