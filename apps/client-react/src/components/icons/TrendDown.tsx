import { SVGProps } from 'react'

export function TrendDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="m18.6 16l-5.2-5.15l-2.575 2.575Q10.25 14 9.4 14t-1.425-.575L2.7 8.1q-.275-.275-.288-.687T2.7 6.7q.275-.275.7-.275t.7.275L9.4 12l2.575-2.575q.575-.575 1.425-.575t1.425.575L20 14.6V13q0-.425.288-.712T21 12q.425 0 .713.288T22 13v4q0 .425-.288.713T21 18h-4q-.425 0-.712-.288T16 17q0-.425.288-.712T17 16h1.6Z"
      ></path>
    </svg>
  )
}
