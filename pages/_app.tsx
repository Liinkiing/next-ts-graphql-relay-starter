import React, { useMemo } from 'react'
import { AppProps } from 'next/app'
import NProgress from '~/components/NProgress'
import AppNav from '~/components/layout/AppNav'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from '~/styles/global'
import { light } from '~/styles/themes'
import { createEnvironment } from '~/relay'
import { RelayEnvironmentProvider } from 'relay-hooks'

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
