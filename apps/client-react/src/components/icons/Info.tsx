import { SVGProps } from 'react'

export function BasilInfoCircleOutline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12 10.75a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0v-5a.75.75 0 0 1 .75-.75M12 9a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
      ></path>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M3.25 12a8.75 8.75 0 1 1 17.5 0a8.75 8.75 0 0 1-17.5 0M12 4.75a7.25 7.25 0 1 0 0 14.5a7.25 7.25 0 0 0 0-14.5"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}
