import { SVGProps } from 'react'

export function Lock(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path fill="currentColor" d="M10.5 16a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0Z"></path>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="m7.622 10.597l-.316-2.839a4.96 4.96 0 0 1 0-1.095l.023-.205a4.7 4.7 0 0 1 9.342 0l.023.205c.04.364.04.731 0 1.095l-.316 2.84l.687.054a2.36 2.36 0 0 1 2.142 1.972a20.89 20.89 0 0 1 0 6.752a2.361 2.361 0 0 1-2.142 1.972l-1.496.12c-2.376.19-4.762.19-7.138 0l-1.496-.12a2.361 2.361 0 0 1-2.142-1.972a20.891 20.891 0 0 1 0-6.752a2.361 2.361 0 0 1 2.142-1.972l.687-.055ZM11.626 3.8a3.2 3.2 0 0 1 3.554 2.825l.023.205c.028.253.028.51 0 .764l-.321 2.89a44.84 44.84 0 0 0-5.764 0l-.32-2.89a3.46 3.46 0 0 1 0-.764l.022-.205A3.2 3.2 0 0 1 11.626 3.8Zm3.824 8.229a43.367 43.367 0 0 0-6.9 0l-1.495.12a.861.861 0 0 0-.782.719a19.39 19.39 0 0 0 0 6.266a.861.861 0 0 0 .782.72l1.496.12c2.296.183 4.602.183 6.899 0l1.496-.12a.861.861 0 0 0 .781-.72a19.39 19.39 0 0 0 0-6.266a.861.861 0 0 0-.781-.72l-1.497-.12Z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}
