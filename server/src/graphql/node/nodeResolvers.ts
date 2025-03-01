import {
  Resolvers,
  Card,
  Category,
  QueryNodeArgs,
} from "../../generated/graphql";
import { getTypeName } from "../../datasources/__utils";
import { transformCard, transformCategory } from "../../utils/transformers";
import { ApolloContext } from "../../types/context";

export const resolvers: Resolvers = {
  Query: {
    node: async (
      parent: unknown,
      { id }: QueryNodeArgs,
      { dataSources }: ApolloContext,
    ): Promise<Card | Category> => {
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
    __isTypeOf: (obj: unknown): boolean => {
      return getTypeName((obj as Card).id) === "Card";
    },
  },
  Category: {
    __isTypeOf: (obj: unknown): boolean => {
      return getTypeName((obj as Category).id) === "Category";
    },
  },
};
