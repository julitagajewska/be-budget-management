import { Link } from 'react-router-dom'
import { SidebarLinkType } from 'shared-types'
import { CaretDown } from '../icons'
import { ReactNode, useState } from 'react'

type SidebarLinkProps = {
  link: SidebarLinkType
  tabIndex: 0 | -1
  Icon?: React.ElementType
}

const SidebarLink = ({ link, tabIndex, Icon }: SidebarLinkProps) => {
  const [open, setOpen] = useState(false)

  const toggle = () => {
    setOpen(!open)
  }

  const getSubMenuHeight = () => {
    if (!link.links) return 'h-[0px]'
    return `h-[${link.links?.length * 24 + 4}px]`
  }

  if (link.links)
    return (
      <div>
        <li className="sidebar-button-list-item-wrapper">
          <button className="sidebar-button" onClick={toggle}>
            <span>{link.label}</span>
            <CaretDown
              className={`${open ? 'rotate-[-180deg]' : 'rotate-[0deg]'} sidebar-button-caret`}
            />
          </button>
        </li>
        <div className={`${open ? getSubMenuHeight() : 'h-0'} sidebar-button-menu-container`}>
          {link.links.map((l: SidebarLinkType) => {
            return <SidebarLink link={l} tabIndex={open ? 0 : -1} />
          })}
        </div>
      </div>
    )

  return (
    <Link to={link.to} className="sidebar-link" tabIndex={tabIndex}>
      {Icon && <Icon />}
      {link.label}
    </Link>
  )
}

export default SidebarLink
