import type { QwikIntrinsicElements } from '@builder.io/qwik'

export function BasilCrossOutline(props: QwikIntrinsicElements['svg'], key: string) {
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
        d="m8.464 15.535l7.072-7.07m-7.072 0l7.072 7.07"
      ></path>
    </svg>
  )
}
