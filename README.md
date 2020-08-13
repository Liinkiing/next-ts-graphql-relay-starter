# Next GraphQL Relay Starter

A starter to bootstrap your **Next** application (nice pun gg) with some noice GraphQL
(**🎊 With SSR/SSG support 🎊**) with Relay

## Usage

```bash
$ yarn
# install dependencies

$ yarn dev
# launch concurrently relay:watch and dev:next

$ yarn relay
# launch Relay code generation based on your graphql`` template literals

$ yarn relay:watch
# same as above, with watch mode

$ yarn dev:next
# launch Next dev script

$ yarn build
# launch Next build script

$ yarn start
# launch Next start script

$ yarn test
# launch test suite

$ yarn ts:check
# check TypeScript

$ yarn lint
# run ESLint
```

## GraphQL support

The starter comes by default with Relay. All Relay related code and config is located under `~/relay` folder. It contains a
relay environment for the client and the server. The `~/relay/index.ts` file choose the appropriate
environment based on the execution context (server side / client)
It uses environment variables to define the API endpoint, so you have to copy/paste the `.env.sample`
file and rename it to `.env` (not committed). The variable name is `NEXT_PUBLIC_GRAPHQL_API`

To make the relay compiler work, you must have a `schema.graphql` at the root (can be
modified in the `relay.config.js`, see [the configuration reference](https://relay.dev/docs/en/installation-and-setup#set-up-relay-with-a-single-config-file)).

I have annotated the file with a `/** @type {import('@types/relay-compiler/lib/bin/RelayCompilerMain').Config} */` jsdoc,
so normally your editor should pick the TypeScript definitions and you should have autocomplete on the configuration file.

Based on this and your graphql template literals in the `src` and `pages` folder, it will auto generate
corresponding the corresponding types.

### SSR / SSG

If you wanna use SSR / SSG, you can use for exemple the `getStaticProps` from Next to load some data
and inject them in your Relay store. By default, this template assumes that we should pre populate the store in
the client side when a prop named `relayRecords` is set, for exemple in getStaticProps. Then, you could for
exemple use a `QueryRenderer` from Relay, and set the **fetchPolicy** to `store-and-network` so when the client
mount the application, the store of Relay will be populated (it's done in the `_app.tsx` file) by what you've put here.
In the server side / build side, you could use something like this

```typescript jsx
// pages/index.tsx
import { GetStaticProps, NextPage } from 'next'
import { QueryRenderer } from 'react-relay'
import { fetchQuery, graphql, useRelayEnvironment } from 'react-relay/hooks'
// The bottom line imports what Relay compiler generate
import { pages_indexQuery } from '~/__generated__/pages_indexQuery.graphql'
import { initEnvironment } from '~/relay'
import { WithRelayRecords } from '~/@types'
import StarWarsList from '~/components/StarWarsList'

const QUERY = graphql`
  # The relay compiler forces you to have some particular namings. Next pages
  # must begin with pages_<your_module_name> or Relay will throw an error

  query pages_indexQuery {
    allFilms {
      ...StarWarsList_films
    }
  }
`

const Index: NextPage = () => {
  const environment = useRelayEnvironment()
  return (
    <div>
      <QueryRenderer<pages_indexQuery>
        variables={{}}
        fetchPolicy="store-and-network"
        environment={environment}
        query={QUERY}
        render={({ error, props }) => {
          if (error) return <div>{error.message}</div>
          else if (props && props.allFilms) return <StarWarsList films={props.allFilms} />
          return <div>Loading...</div>
        }}
      />
    </div>
  )
}

export const getStaticProps: GetStaticProps<WithRelayRecords> = async () => {
  const { environment } = initEnvironment()

  await fetchQuery(environment, QUERY, {}).toPromise()

  // This is what the _app.tsx will use to populate the initial Relay store.
  // Thanks to this and the "store-and-network" policy, when the page will be
  // mounted on the client-side, Relay will already have the data in it's store
  // so there will be no loading and it will be prerendered on your page, so
  // it may be useful if your page have some data requirements / SEO that needs
  // to be rendered on the server
  const records = environment.getStore().getSource().toJSON()

  return {
    props: {
      records,
    },
  }
}

export default Index
```

A very small exemple application using this starter with Relay and proper TypeScript
typings can be found here: https://github.com/Liinkiing/ts-test-relay-next, because it
may be hard to guess what types to use, for example when using fragments, or that `QueryRenderer` is a React
component that accept a generic type, so you can write this in your JSX to have proper
typings `<QueryRenderer<pages_indexQuery>>...</QueryRenderer>`

### Configuration

All configuration related files are located in the `relay.config.js` file
A `.graphqlconfig` file is also provided, if you use a GraphQL extension in your IDE, it will allow you
to introspect the schema of a given endpoint and writing it in a `schema.graphql` file.
You must enter your API url here

## Next config

It comes already configured with some nice plugin. You can see in `next.config.js` what is
used. In short, it allows support of importing images files and fonts within webpack.
It also comes with **NProgress** support, by default so it shows a small loading bar in top of
the page when loading. You can find the component in `~/components/NProgress.tsx`, and it is used in the
custom `_app.tsx`

## Styled component

The template comes with [styled-components](https://github.com/styled-components/styled-components).
Again, you can either choose to not use it, this is a personal choice.
You can also find a `styles` folder, which contains many related
styled-components files to keep things organized. It's also includes all themes-related stuff in here.
It's again a personal convention that I follow, feel free to annihilate this directory if you want 😢

## Styled system

It also comes with [styled-components](https://github.com/styled-system/styled-system). It is a great way to
build reusable UI blocks with a great props API and consistent spaces / typography.
A lot comes from the theme, provided in `~/styles/themes/base.ts` where we define some
breakpoints, spacings and typography stuff. It allows then the custom `AppBox` component (`~/ui/AppBox`)
to be aware of your theme and then build something amazing with the primitives.
By default, this starter provides some basic examples components that uses this pattern, for
example the `AppNav` component (`~/components/layout/AppNav`).

## Framer motion

Again, personal preference here, but the starter comes with framer motion already configured
to handle Next pages changes and enable some smooth transitions when navigating. You
can find the default variant used for the page transitions in `~/common/framer.ts`.

## Testing

[Jest](https://github.com/facebook/jest) and [@testing-library/react](https://github.com/testing-library/react-testing-library) is used to run your tests. It comes preconfigured
with [ts-jest](https://github.com/kulshekhar/ts-jest) so your tests also checks your types.
You can look the **jest.config.js** and the file **setupTest.ts** to see what's in there.
[jest-styled-components](https://github.com/styled-components/jest-styled-components) is also used to have deterministic classNames
within your styled components that you are testing.

## Aliases

It includes by default support for aliases in `tsconfig.json`.
They are 1 defaulted alias, ready to use :

```typescript
// ~ refers to src folder
import { something } from '~/file'
```

You can also use for your convenience the global `__DEV__` variable, which is
injected by webpack with the DefinePlugin (see **next.config.js**).

## @types and extending modules

It also includes a `@types` directory under **src**, so you can easily
separate your types or extends some external modules. They are also included in the `tsconfig.json`
For example, if some package named `foo` does not have any types in [DefinitelyTyped](https://definitelytyped.org/), you could
add a `index.d.ts` under `src/@types/foo/index.d.ts`. It is just my personal convention, so do as you want!

```typescript
// src/@types/foo/index.d.ts

// to make sure Typescript get the original types from the module (if any)
import * as foo from 'foo'

declare module 'foo' {
  declare function foo(bar: string): boolean
}
```

Because the `@types` directory is declared in `typeRoots`, Typescript will no longer complain if you imported your package with missing types

## Tooling

The template includes [Prettier](https://prettier.io/), [ESLint](https://eslint.org/) (with [Typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)), [Babel](https://babeljs.io/) and [lint-staged](https://github.com/okonet/lint-staged).
All their related configurations are in the `*rc` files (except for lint-staged, which is located in the `package.json`).
