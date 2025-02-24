import {
  Resolvers,
  Category,
  CategoryUpdatedResponse,
  CardConnection,
} from "../../generated/graphql";
import {
  transformCategory,
  transformCardConnection,
} from "../../utils/transformers";

export const resolvers: Resolvers = {
  Query: {
    categories: async (_, args, { dataSources }): Promise<Category[]> => {
      const cleanedArgs = {
        ...args,
        orderByColumn:
          args.orderByColumn === null ? undefined : args.orderByColumn,
        orderByDirection:
          args.orderByDirection === null ? undefined : args.orderByDirection,
        cardIds: args.cardIds === null ? undefined : args.cardIds,
      };
      const result = await dataSources.categoryAPI.getCategories(cleanedArgs);
      return result.map(transformCategory);
    },
    category: async (_, { id }, { dataSources }): Promise<Category> => {
      if (!id) throw new Error("Missing id");
      const result = await dataSources.categoryAPI.getCategory(id);
      return transformCategory(result);
    },
  },
  Mutation: {
    addCategory: async (
      _,
      { input },
      { dataSources }
    ): Promise<CategoryUpdatedResponse> => {
      if (!input) throw new Error("Missing category input");
      const response = await dataSources.categoryAPI.addCategory(input);
      return { ...response, category: transformCategory(response.category) };
    },
    updateCategory: async (
      _,
      { id, input },
      { dataSources }
    ): Promise<CategoryUpdatedResponse> => {
      if (!id || !input) throw new Error("Missing id or input");
      const response = await dataSources.categoryAPI.updateCategory(id, input);
      return { ...response, category: transformCategory(response.category) };
    },
    removeCategory: async (
      _,
      { id },
      { dataSources }
    ): Promise<CategoryUpdatedResponse> => {
      if (!id) throw new Error("Missing id");
      const response = await dataSources.categoryAPI.removeCategory(id);
      return { ...response, category: transformCategory(response.category) };
    },
  },
  Category: {
    cards(root, args, { dataSources }): Promise<CardConnection> {
      const cleanedArgs = {
        ...args,
        before: args.before === null ? undefined : args.before,
        after: args.after === null ? undefined : args.after,
        first: args.first === null ? undefined : args.first,
        last: args.last === null ? undefined : args.last,
        orderByColumn:
          args.orderByColumn === null ? undefined : args.orderByColumn,
        orderByDirection:
          args.orderByDirection === null ? undefined : args.orderByDirection,
      };
      return dataSources.cardAPI
        .getCardConnectionFor(root.id, cleanedArgs)
        .then(transformCardConnection);
    },
  },
};
