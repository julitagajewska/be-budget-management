import { component$, Slot } from '@builder.io/qwik'
import PageContainer from '~/components/containers/page-container'
import NavigationSidebar from '~/components/sidebar/navigation-sidebar'
import ContentContainer from '~/components/containers/content-container'

export default component$(() => {
  return (
    <PageContainer>
      <NavigationSidebar />
      <ContentContainer>
        <Slot />
      </ContentContainer>
    </PageContainer>
  )
})
