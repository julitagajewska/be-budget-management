import { SVGProps } from 'react'

export function Edit(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M15.137 3.47a.75.75 0 0 0-1.06 0l-9.193 9.192a.75.75 0 0 0-.195.34l-1 3.83a.75.75 0 0 0 .915.915l3.828-1a.75.75 0 0 0 .341-.196l9.192-9.192a.75.75 0 0 0 0-1.06l-2.828-2.83ZM6.088 13.579l8.519-8.518l1.767 1.767l-8.518 8.519l-2.393.625l.625-2.393Z"
        clipRule="evenodd"
      ></path>
      <path fill="currentColor" d="M4 19.25a.75.75 0 0 0 0 1.5h15a.75.75 0 0 0 0-1.5H4Z"></path>
    </svg>
  )
}
