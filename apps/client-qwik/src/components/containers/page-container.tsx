import { component$, Slot } from '@builder.io/qwik'

const PageContainer = component$(() => {
  return (
    <div class="qwik-light text-text-900 font-mulish w-full min-h-[100vh] h-full relative bg-background-50 flex flex-col justify-start items-start">
      <div class="flex flex-row justify-between h-full w-full px-5 py-5 gap-5 overflow-auto">
        <Slot />
      </div>
    </div>
  )
})

export default PageContainer
