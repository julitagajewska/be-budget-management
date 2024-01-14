import { component$, Slot, useContextProvider, useSignal } from '@builder.io/qwik'
import PageContainer from '~/components/containers/page-container'
import NavigationSidebar from '~/components/sidebar/navigation-sidebar'
import ContentContainer from '~/components/containers/content-container'
import { OverviewSidebar } from '~/components/sidebar/overview-sidebar'
import type { Theme } from '~/context/appContext'
import { DarkModeContext, ThemeContext, themes } from '~/context/appContext'

export default component$(() => {
  const darkMode = useSignal<boolean>(false)
  useContextProvider(DarkModeContext, darkMode)

  const theme = useSignal<Theme>(themes[2])
  useContextProvider(ThemeContext, theme)

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
