import {
  Resolvers,
  Category,
  CategoryUpdatedResponse,
  QueryCategoriesArgs,
  QueryCategoryArgs,
  MutationAddCategoryArgs,
  MutationUpdateCategoryArgs,
  MutationRemoveCategoryArgs,
  ResolversParentTypes,
  DirectionEnum,
  Card,
} from "../../generated/graphql";
import {
  transformCategory,
  transformCardConnection,
} from "../../utils/transformers";
import { ApolloContext } from "../../types/context";

// Define CategoryCardsArgs locally since it's no longer exported from generated types
interface CategoryCardsArgs {
  first?: number | null;
  last?: number | null;
  after?: string | null;
  before?: string | null;
  orderByColumn?: string | null;
  orderByDirection?: DirectionEnum | null;
}

export const resolvers: Resolvers = {
  Query: {
    categories: async (
      _: unknown,
      args: QueryCategoriesArgs,
      { dataSources }: ApolloContext
    ): Promise<Category[]> => {
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
    category: async (
      _: unknown,
      { id }: QueryCategoryArgs,
      { dataSources }: ApolloContext
    ): Promise<Category> => {
      if (!id) throw new Error("Missing id");
      const result = await dataSources.categoryAPI.getCategory(id);
      return transformCategory(result);
    },
  },
  Mutation: {
    addCategory: async (
      _: unknown,
      { input }: MutationAddCategoryArgs,
      { dataSources }: ApolloContext
    ): Promise<CategoryUpdatedResponse> => {
      if (!input) throw new Error("Missing category input");
      const response = await dataSources.categoryAPI.addCategory(input);
      return { ...response, category: transformCategory(response.category) };
    },
    updateCategory: async (
      _: unknown,
      { id, input }: MutationUpdateCategoryArgs,
      { dataSources }: ApolloContext
    ): Promise<CategoryUpdatedResponse> => {
      if (!id || !input) throw new Error("Missing id or input");
      const response = await dataSources.categoryAPI.updateCategory(id, input);
      return { ...response, category: transformCategory(response.category) };
    },
    removeCategory: async (
      _: unknown,
      { id }: MutationRemoveCategoryArgs,
      { dataSources }: ApolloContext
    ): Promise<CategoryUpdatedResponse> => {
      if (!id) throw new Error("Missing id");
      const response = await dataSources.categoryAPI.removeCategory(id);
      return { ...response, category: transformCategory(response.category) };
    },
  },
  Category: {
    cards(
      root: ResolversParentTypes["Category"],
      args: CategoryCardsArgs,
      { dataSources }: ApolloContext
    ): Promise<Array<Card>> {
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
        .then(transformCardConnection)
        .then((result) => {
          // Ensure we always return Card[]
          return Array.isArray(result) ? result : [];
        });
    },
  },
};
