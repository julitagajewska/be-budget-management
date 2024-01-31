type TextWithDescriptionProps = {
  text: string
  description: string | undefined
}

const TextWithDescription = ({ text, description }: TextWithDescriptionProps) => {
  return (
    <div>
      <h3 className="font-semibold text-background-700">{text}</h3>
      <span className="text-background-600">{description ? description : '-'}</span>
    </div>
  )
}

export default TextWithDescription
