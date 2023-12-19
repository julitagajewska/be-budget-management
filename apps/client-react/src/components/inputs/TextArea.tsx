type TextAreaProps = {
  label?: string
  id: string
  value: string | undefined
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const TextArea = ({ label, id, value, handleChange }: TextAreaProps) => {
  return (
    <div className="flex flex-col gap-[4px]">
      {label && (
        <label
          id={`${id}-label`}
          htmlFor={id}
          className="pb-0 focus:text-primary-600 peer-focus:text-primary-600 font-medium text-xs pl-1 text-background-400 peer-hover:text-background-400"
        >
          {label}
        </label>
      )}

      <textarea
        id={id}
        rows={6}
        value={value}
        onChange={handleChange}
        className="`peer rounded-md custom-input py-[6px] pl-[16px] pr-[16px] resize-none text-background-500 border-background-200 focus:text-primary-600 focus:shadow-primary-100 [&:not(:focus)]:hover:shadow-background-100 [&:not(:focus)]:hover:border-background-400"
      />
    </div>
  )
}

export default TextArea
