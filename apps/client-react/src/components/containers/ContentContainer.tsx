import { Outlet } from 'react-router-dom'

const ContentContainer = () => {
  return (
    <div className="content-container">
      <Outlet />
    </div>
  )
}

export default ContentContainer
