import { $localize } from '@angular/localize/init';
import { component$ } from '@builder.io/qwik';
import {} from '@angular/localize/init';

export const App = component$(() => {
  return (
    <div class="w-full h-screen flex flex-col justify-center items-center">
      <h1 class="bg-qwik px-24 py-10 flex flex-row justify-center items-center">QWIK CLIENT</h1>
      {$localize`Hello there!`}
    </div>
  );
});
