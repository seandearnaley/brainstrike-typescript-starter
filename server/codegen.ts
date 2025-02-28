import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/graphql/combined-schema.graphql",
  documents: [],
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        useIndexSignature: true,
        noSchemaStitching: true,
        contextType: "../types/context#ApolloContext",
        optionalResolveType: true,
        scalars: {
          Date: "Date",
          DateTime: "Date",
          Time: "string",
        },
        enumsAsTypes: false,
        avoidOptionals: false,
      },
      hooks: {
        afterOneFileWrite: ["prettier --write"],
      },
    },
  },
};

export default config;
