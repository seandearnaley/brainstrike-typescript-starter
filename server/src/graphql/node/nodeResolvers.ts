import { Resolvers, Card } from "../../generated/graphql";
import { decodeGlobalID } from "../../datasources/__utils";

export const resolvers: Resolvers = {
  Query: {
    node: async (parent, { id }, { dataSources }): Promise<Card | null> => {
      const __typename = decodeGlobalID(id).__typename;
      let node;

      if (__typename === "Card") {
        node = await dataSources.cardAPI.getCard(id);
      } else {
        throw Error("Invalid ID");
      }

      return {
        ...node,
        __typename
      };
    }
  },
  Card: {
    __isTypeOf: (obj): boolean => {
      return obj.number && obj.label && obj.description;
    }
  }
};
