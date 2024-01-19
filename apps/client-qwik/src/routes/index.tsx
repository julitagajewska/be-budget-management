import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

export default component$(() => {
  return (
    <div class="qwik-light">
      <p>Dashboard</p>
    </div>
  )
})

export const head: DocumentHead = {
  title: 'Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description'
    }
  ]
}
