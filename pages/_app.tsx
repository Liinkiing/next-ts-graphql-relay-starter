import { AppProps } from 'next/app'
import React, { useMemo } from 'react'
import { RelayEnvironmentProvider } from 'relay-hooks'
import { ThemeProvider } from 'styled-components'

import NProgress from '~/components/NProgress'
import AppNav from '~/components/layout/AppNav'
import { createEnvironment } from '~/relay'
import GlobalStyle from '~/styles/global'
import { light } from '~/styles/themes'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const environment = useMemo(() => createEnvironment(pageProps.relayRecords), [pageProps.relayRecords])
  return (
    <React.StrictMode>
      <RelayEnvironmentProvider environment={environment}>
        <ThemeProvider theme={light}>
          <GlobalStyle />
          <NProgress color={light.colors.primary} spinner={false} />
          <AppNav />
          <Component {...pageProps} />
        </ThemeProvider>
      </RelayEnvironmentProvider>
    </React.StrictMode>
  )
}

export default App
