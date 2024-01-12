import { component$, Slot } from '@builder.io/qwik'
import PageContainer from '~/components/containers/page-container'
import NavigationSidebar from '~/components/sidebar/navigation-sidebar'
import ContentContainer from '~/components/containers/content-container'
import { OverviewSidebar } from '~/components/sidebar/overview-sidebar'

export default component$(() => {
  return (
    <PageContainer>
      <NavigationSidebar />
      <ContentContainer>
        <Slot />
      </ContentContainer>
      <OverviewSidebar />
    </PageContainer>
  )
})
