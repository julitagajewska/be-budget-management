import { component$, Slot } from '@builder.io/qwik'

export const SidebarContainer = component$(() => {
  // TODO: Change to context later
  const isOpen = true

  const openClasses = 'w-72'
  const closedClasses = 'w-10'

  return (
    <div
      class={`h-full sticky top-0 left-0 transition-all ease-in-out duration-300 flex justify-between ${
        isOpen ? openClasses : closedClasses
      }`}
    >
      <div class="bg-background-50 w-full h-full shadow-large rounded-xl px-4 py-4 flex flex-col justify-between">
        <Slot />
      </div>
    </div>
  )
})
