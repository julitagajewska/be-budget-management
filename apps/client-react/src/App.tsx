import PageContainer from './components/containers/PageContainer'
import NavigationSidebar from './components/sidebar/NavigationSidebar'
import ContentContainer from './components/containers/ContentContainer'
import OverviewSidebar from './components/sidebar/OverviewSidebar'
import Routing from './routing/Routing'
import { useLocation } from 'react-router-dom'
import PageHeader from './components/page-header/PageHeader'
import dayjs from 'dayjs'
import 'dayjs/locale/pl'

const App = () => {
  const location = useLocation()
  const locationsWithoutsidebars = ['/', '/login', '/register']
  dayjs.locale('pl')

  return (
    <PageContainer>
      {!locationsWithoutsidebars.includes(location.pathname) && <NavigationSidebar />}

      <ContentContainer>
        {/* <PageHeader /> */}
        <Routing />
      </ContentContainer>
      {!locationsWithoutsidebars.includes(location.pathname) && <OverviewSidebar />}
    </PageContainer>
  )
}

export default App
