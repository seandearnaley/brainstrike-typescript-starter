import { Resolvers } from "../../generated/graphql";
import { Card } from "../../entity";
import { decodeGlobalID } from "../../datasources/__utils";

interface CardWithTypeName extends Card {
  __typename: string;
}

type NodeResolverTypes = Promise<CardWithTypeName> | null;

export const resolvers: Resolvers = {
  Query: {
    node: async (parent, { id }, { dataSources }): NodeResolverTypes => {
      const __typename = decodeGlobalID(id).__typename;
      let node;

      switch (__typename) {
        case "Card": {
          node = await dataSources.cardAPI.getCard(id);
          break;
        }
        default: {
          return null;
        }
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
