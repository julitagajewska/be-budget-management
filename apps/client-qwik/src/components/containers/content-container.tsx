import { component$, Slot } from '@builder.io/qwik'

const ContentContainer = component$(() => {
  return (
    <div class="h-[200vh] w-full">
      <Slot />
    </div>
  )
})

export default ContentContainer
