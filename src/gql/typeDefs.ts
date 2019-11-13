import { importSchema } from "graphql-import";

export const typeDefs = importSchema(
  "src/gql/schema.graphql"
); /* Warning: Must be an absolute path */

export default typeDefs;
