import type { QwikIntrinsicElements } from '@builder.io/qwik'

export function BasilPlusOutline(props: QwikIntrinsicElements['svg'], key: string) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
      key={key}
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-width="1.5"
        d="M12 17V7m-5 5h10"
      ></path>
    </svg>
  )
}
