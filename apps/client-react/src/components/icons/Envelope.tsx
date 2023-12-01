import { SVGProps } from 'react'

export function Envelope(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M2.804 8.353c-.28 2.603-.268 5.605.122 8.197a3.138 3.138 0 0 0 2.831 2.66l1.51.131c3.15.274 6.316.274 9.466 0l1.51-.13a3.138 3.138 0 0 0 2.831-2.66c.39-2.593.402-5.595.122-8.198a30.348 30.348 0 0 0-.122-.904a3.138 3.138 0 0 0-2.831-2.66l-1.51-.13a54.647 54.647 0 0 0-9.466 0l-1.51.13a3.138 3.138 0 0 0-2.831 2.66a31.1 31.1 0 0 0-.122.904Zm4.593-2.2a53.145 53.145 0 0 1 9.205 0l1.51.131a1.64 1.64 0 0 1 1.479 1.389l.034.233l-5.561 3.09a4.25 4.25 0 0 1-4.128 0l-5.561-3.09l.034-.233a1.638 1.638 0 0 1 1.478-1.389l1.51-.131ZM19.808 9.52a29.099 29.099 0 0 1-.217 6.807a1.638 1.638 0 0 1-1.478 1.389l-1.51.131a53.152 53.152 0 0 1-9.206 0l-1.51-.131a1.638 1.638 0 0 1-1.478-1.389a29.1 29.1 0 0 1-.218-6.807l5.016 2.787a5.75 5.75 0 0 0 5.585 0l5.016-2.787Z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}
