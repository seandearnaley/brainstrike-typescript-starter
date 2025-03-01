import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './graphql.schema.json',
  documents: ['src/**/*.graphql'],
  generates: {
    './src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
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
        gqlImport: '@apollo/client#gql',
      },
    },
  },
};

export default config;
