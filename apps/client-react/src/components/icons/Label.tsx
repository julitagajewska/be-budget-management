import { SVGProps } from 'react'

export function Label(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="m20.175 13.15l-3.525 5q-.275.4-.712.625T15 19H5q-.825 0-1.412-.587T3 17V7q0-.825.588-1.412T5 5h10q.5 0 .938.225t.712.625l3.525 5q.375.525.375 1.15t-.375 1.15ZM15 17l3.55-5L15 7H5v10h10ZM5 7v10V7Z"
      ></path>
    </svg>
  )
}
