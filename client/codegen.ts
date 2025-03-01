import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './graphql.schema.json',
  documents: ['src/**/*.graphql'],
  generates: {
    './src/generated/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
        fragmentMasking: false,
      },
      config: {
        apolloClientVersion: 3,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        skipTypename: false,
        withResultType: true,
        withMutationOptionsType: true,
        withMutationFn: true,
        addDocBlocks: true,
      },
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
  hooks: {
    afterOneFileWrite: ['prettier --write'],
  },
};

export default config;
