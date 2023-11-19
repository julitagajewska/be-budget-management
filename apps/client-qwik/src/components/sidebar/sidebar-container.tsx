import { component$, Slot } from '@builder.io/qwik';

export const SidebarContainer = component$(() => {
  return (
    <div>
      <Slot />
    </div>
  );
});