import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://aa-oren.test/graphql',
  documents: 'src/graphql/*/*.graphql',
  generates: {
    'src/generated/graphqlOperations.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-vue-apollo'],
      config: {
        addDocBlocks: true,
        withCompositionFunctions: true,
        vueCompositionApiImportFrom: 'vue',
      },
    },
  },
}

export default config
