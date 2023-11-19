import { component$, Slot } from '@builder.io/qwik';

const PageContainer = component$(() => {
  return <div class="text-text-900 font-mulish w-full min-h-[100vh] relative bg-red-300 flex flex-col justify-start items-start">
  Tutaj jest page container
  <Slot /></div>;
});

export default PageContainer;
