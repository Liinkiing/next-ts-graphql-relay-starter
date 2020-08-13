import React, { useMemo } from 'react'
import { AppProps } from 'next/app'
import NProgress from '~/components/NProgress'
import AppNav from '~/components/layout/AppNav'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from '~/styles/global'
import { light } from '~/styles/themes'
import { createEnvironment } from '~/relay'
import { RelayEnvironmentProvider } from 'react-relay/hooks'

const App: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const environment = useMemo(() => createEnvironment(pageProps.relayRecords), [pageProps.relayRecords])
  return (
    <React.StrictMode>
      <RelayEnvironmentProvider environment={environment}>
        <ThemeProvider theme={light}>
          <GlobalStyle />
          <NProgress color={light.colors.primary} spinner={false} />
          <AppNav />
          <AnimatePresence exitBeforeEnter initial={false}>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </ThemeProvider>
      </RelayEnvironmentProvider>
    </React.StrictMode>
  )
}

export default App
