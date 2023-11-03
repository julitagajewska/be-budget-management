import React from 'react'
import { Link } from 'react-router-dom'

type NavigationLinkProps = {
    text: string,
    to: string
}

const NavigationLink = ({ text, to }: NavigationLinkProps) => {
  return (
    <Link to={to} className="text-base font-mulish">{text}</Link>
  )
}

export default NavigationLink
