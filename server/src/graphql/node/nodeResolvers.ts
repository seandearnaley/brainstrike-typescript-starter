import { Resolvers, Card } from "../../generated/graphql";
import { decodeGlobalID } from "../../datasources/__utils";

export const resolvers: Resolvers = {
  Query: {
    node: async (parent, { id }, { dataSources }): Promise<Card | null> => {
      const typename = decodeGlobalID(id).__typename;

      if (typename === "Card") {
        return dataSources.cardAPI.getCard(id);
      } else {
        throw new Error("Invalid ID");
      }
    }
  },
  Card: {
    __isTypeOf: (obj): boolean => {
      return obj.number && obj.label && obj.description;
    }
  }
};
