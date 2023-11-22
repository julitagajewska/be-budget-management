import { SidebarLinkType } from 'shared-types'

type SidebarLinkProps = {
  link: SidebarLinkType
}

const SidebarLink = ({ link }: SidebarLinkProps) => {
  if (link) return <div></div>
}

export default SidebarLink
