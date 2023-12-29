import type { QwikIntrinsicElements } from '@builder.io/qwik'

export function BasilOther2Outline(props: QwikIntrinsicElements['svg'], key: string) {
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
        fill="currentColor"
        stroke="currentColor"
        stroke-width="1.5"
        d="M12 5.25a.75.75 0 1 1 0 1.5a.75.75 0 0 1 0-1.5Zm0 6a.75.75 0 1 1 0 1.5a.75.75 0 0 1 0-1.5Zm0 6a.75.75 0 1 1 0 1.5a.75.75 0 0 1 0-1.5Z"
      ></path>
    </svg>
  )
}
