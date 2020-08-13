/** @type {import('@types/relay-compiler/lib/bin/RelayCompilerMain').Config} */
const config = {
  src: './',
  language: 'typescript',
  extensions: ['ts', 'tsx', 'graphql', 'gql'],
  artifactDirectory: 'src/__generated__',
  schema: 'schema.graphql',
  exclude: ['**/node_modules/**', '**/__mocks__/**', '**/__generated__/**'],
  customScalars: {
    DateTime: 'String',
  },
}

module.exports = config
