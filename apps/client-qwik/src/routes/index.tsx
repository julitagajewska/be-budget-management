import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

export default component$(() => {
  return (
    <div class="qwik-light">
      <h1 class="font-slab text-5xl">Hi 👋</h1>
      <h1 class="font-mulish text-primary-400 text-5xl">Hi 👋</h1>
      <p>Strona powitalna lub dashboard</p>
    </div>
  )
})

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description'
    }
  ]
}
