import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import PageContainer from "~/components/containers/page-container";

export default component$(() => {
  return (
    <div class="qwik-light">
      <h1 class="font-slab text-5xl">Hi 👋</h1>
      <h1 class="font-mulish text-primary-400 text-5xl">Hi 👋</h1>
      <PageContainer />
      <p>
        Can't wait to see what you build with qwik!
        <br />
        Happy coding.
      </p>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
