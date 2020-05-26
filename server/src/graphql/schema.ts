import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";

export default loadSchemaSync("src/graphql/schema.graphql", {
  loaders: [new GraphQLFileLoader()],
}); /* Warning: Must be an absolute path */
