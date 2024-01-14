import { component$ } from '@builder.io/qwik'

type TextWithDescriptionProps = {
  text: string | undefined
  description: string | undefined
}

export default component$(({ text, description }: TextWithDescriptionProps) => {
  return (
    <div class="pl-4">
      <h3 class="font-semibold text-background-700">{text}</h3>
      <span class="text-background-600">{description}</span>
    </div>
  )
})
