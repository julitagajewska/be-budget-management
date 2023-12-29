import { Slot, component$, useSignal, useStyles$ } from '@builder.io/qwik'

import { Popover, PopoverTrigger, usePopover } from '@qwik-ui/headless'
import { More } from '~/icons'

export const Menu = component$(() => {
  useStyles$(`
  .my-transition {
    transition: opacity 0.5s, display 0.5s, overlay 0.5s;
    transition-behavior: allow-discrete;
    opacity: 0;
  }

  .popover-showing {
    opacity: 1;
  }

  .popover-closing {
    opacity: 0;
  }`)

  const { showPopover } = usePopover(`anchor-ref-id`)
  const triggerRef = useSignal<HTMLButtonElement>()
  const popoverRef = useSignal<HTMLElement>()

  return (
    <>
      <PopoverTrigger
        ref={triggerRef}
        onClick$={() => {
          showPopover()
        }}
        popovertarget="anchor-ref-id"
        class="rounded-md  px-1 py-1 hover:bg-background-100 transition-all duration-150 ease-in-out"
      >
        <More />
      </PopoverTrigger>

      <Popover
        ref={popoverRef}
        anchorRef={triggerRef}
        floating={true}
        placement="left"
        gutter={4}
        id="anchor-ref-id"
        class="my-transition listbox shadow-dark-low rounded-md "
      >
        <Slot name="content" />
      </Popover>
    </>
  )
})
