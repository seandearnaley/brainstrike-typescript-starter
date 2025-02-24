import { Resolvers, Card, Category } from "../../generated/graphql";
import { getTypeName } from "../../datasources/__utils";
import { transformCard, transformCategory } from "../../utils/transformers";

export const resolvers: Resolvers = {
  Query: {
    node: async (parent, { id }, { dataSources }): Promise<Card | Category> => {
      if (!id || id === "") throw new Error("ID is required");
      const typeName = getTypeName(id);
      if (typeName === "Card") {
        const card = await dataSources.cardAPI.getCard(id);
        return transformCard(card);
      } else if (typeName === "Category") {
        const category = await dataSources.categoryAPI.getCategory(id);
        return transformCategory(category);
      } else {
        throw new Error("Invalid ID");
      }
    },
  },
  Card: {
    __isTypeOf: (obj): boolean => {
      return getTypeName(obj.id) === "Card";
    },
  },
  Category: {
    __isTypeOf: (obj): boolean => {
      return getTypeName(obj.id) === "Category";
    },
  },
};
