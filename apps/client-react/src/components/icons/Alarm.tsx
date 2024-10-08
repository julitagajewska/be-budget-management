import { SVGProps } from 'react'

export function Alarm(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
        <path d="M12 5.75a7.25 7.25 0 1 0 0 14.5a7.25 7.25 0 0 0 0-14.5ZM3.25 13a8.75 8.75 0 1 1 17.5 0a8.75 8.75 0 0 1-17.5 0Z"></path>
        <path d="M12 7.25a.75.75 0 0 1 .75.75v4.584l2.648 1.655a.75.75 0 1 1-.796 1.272l-3-1.875A.75.75 0 0 1 11.25 13V8a.75.75 0 0 1 .75-.75ZM6.53 3.47a.75.75 0 0 1 0 1.06l-2.5 2.5a.75.75 0 0 1-1.06-1.06l2.5-2.5a.75.75 0 0 1 1.06 0Zm10.94 0a.75.75 0 0 0 0 1.06l2.5 2.5a.75.75 0 1 0 1.06-1.06l-2.5-2.5a.75.75 0 0 0-1.06 0Z"></path>
      </g>
    </svg>
  )
}
