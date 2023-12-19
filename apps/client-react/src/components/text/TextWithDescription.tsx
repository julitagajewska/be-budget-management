type TextWithDescriptionProps = {
  text: string
  description: string | undefined
}

const TextWithDescription = ({ text, description }: TextWithDescriptionProps) => {
  return (
    <div>
      <h3 className="text-sm font-bold">{text}</h3>
      <span className="text-sm text-background-600">{description ? description : '-'}</span>
    </div>
  )
}

export default TextWithDescription
