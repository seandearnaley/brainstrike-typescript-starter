import { Resolvers, Card, Category } from "../../generated/graphql";
import { getTypeName } from "../../datasources/__utils";

export const resolvers: Resolvers = {
  Query: {
    node: async (
      parent,
      { id },
      { dataSources }
    ): Promise<Card | Category | null> => {
      switch (getTypeName(id)) {
        case "Card":
          return dataSources.cardAPI.getCard(id);
        case "Category":
          return dataSources.categoryAPI.getCategory(id);
        default:
          throw new Error("Invalid ID");
      }
    }
  },
  Card: {
    __isTypeOf: (obj): boolean => {
      return getTypeName(obj.id) === "Card";
    }
  },
  Category: {
    __isTypeOf: (obj): boolean => {
      return getTypeName(obj.id) === "Category";
    }
  }
};
