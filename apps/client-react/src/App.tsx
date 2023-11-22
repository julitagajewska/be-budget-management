import PageContainer from './components/containers/PageContainer'
import NavigationSidebar from './components/sidebar/NavigationSidebar'
import ContentContainer from './components/containers/ContentContainer'
import OverviewSidebar from './components/sidebar/OverviewSidebar'
import Routing from './routing/Routing'

const App = () => {
  return (
    <PageContainer>
      <NavigationSidebar />
      <ContentContainer>
        <Routing />
      </ContentContainer>
      <OverviewSidebar />
    </PageContainer>
  )
}

export default App
