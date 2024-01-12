import type { QwikIntrinsicElements } from '@builder.io/qwik'

export function BasilSettingsAdjustOutline(props: QwikIntrinsicElements['svg'], key: string) {
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
        fillRule="evenodd"
        d="M13.354 8.75H4a.75.75 0 0 1 0-1.5h9.354a2.751 2.751 0 0 1 5.293 0H20a.75.75 0 0 1 0 1.5h-1.354a2.751 2.751 0 0 1-5.293 0ZM14.75 8a1.25 1.25 0 1 1 2.5 0a1.25 1.25 0 0 1-2.5 0Zm-4.104 8.75H20a.75.75 0 0 0 0-1.5h-9.354a2.751 2.751 0 0 0-5.292 0H4a.75.75 0 0 0 0 1.5h1.354a2.751 2.751 0 0 0 5.292 0ZM6.75 16a1.25 1.25 0 1 1 2.5 0a1.25 1.25 0 0 1-2.5 0Z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}
