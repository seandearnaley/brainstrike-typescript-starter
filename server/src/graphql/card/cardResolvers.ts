import {
  Resolvers,
  CardsUpdatedResponse,
  CardConnection,
  Card,
  Category,
  QueryCardsArgs,
  QueryCardArgs,
  MutationAddCardArgs,
  MutationUpdateCardArgs,
  MutationRemoveCardArgs,
  ResolversParentTypes,
} from "../../generated/graphql";
import { ApolloContext } from "../../types/context";

// Import the CardObject and CategoryObject types
import { CardAPI } from "../../datasources/card";
import { CategoryAPI } from "../../datasources/category";

// Type aliases for the non-exported types
type CardObject =
  ReturnType<CardAPI["getCard"]> extends Promise<infer T> ? T : never;
type CategoryObject =
  ReturnType<CategoryAPI["getCategoriesFor"]> extends Promise<Array<infer T>>
    ? T
    : never;

/* Begin transformation helpers */
function transformCategory(
  category: CategoryObject | Record<string, unknown>,
): Record<string, unknown> {
  const result = {
    id: category.id,
    name: category.name,
    created:
      category.created instanceof Date
        ? category.created.toISOString()
        : category.created,
    updated:
      category.updated instanceof Date
        ? category.updated.toISOString()
        : category.updated,
    cards: {
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: "",
        endCursor: "",
        totalCount: 0,
      },
      edges: [],
    },
  };
  if ((result as Record<string, unknown>).hasOwnProperty("__typename")) {
    delete (result as Record<string, unknown>)["__typename"];
  }
  return result;
}

function transformCard(
  card: CardObject | Record<string, unknown>,
): Record<string, unknown> {
  let updated;
  if (card.updated) {
    const iso =
      card.updated instanceof Date ? card.updated.toISOString() : card.updated;
    updated = iso === "1970-01-01T00:00:00.000Z" ? null : iso;
  } else {
    updated = card.updated;
  }
  const created =
    card.created instanceof Date ? card.created.toISOString() : card.created;

  const transformed: Record<string, unknown> = {
    id: card.id,
    number: card.number,
    label: card.label,
    description: card.description,
    created: created,
    updated,
    categories: (
      (card.categories as Array<CategoryObject | Record<string, unknown>>) || []
    ).map(transformCategory),
  };
  if (card.rowNumber !== undefined) {
    transformed.rowNumber = card.rowNumber;
  }
  if ((transformed as Record<string, unknown>).hasOwnProperty("__typename")) {
    delete (transformed as Record<string, unknown>)["__typename"];
  }
  return transformed;
}

function transformCardConnection(
  connection: Record<string, unknown>,
): Record<string, unknown> {
  return {
    ...connection,
    edges: (connection.edges as Array<Record<string, unknown>>).map(
      (edge: Record<string, unknown>) => ({
        ...edge,
        node: transformCard(edge.node as CardObject | Record<string, unknown>),
      }),
    ),
  };
}

/* Updated helper to deep remove __typename from objects using Reflect.ownKeys to capture non-enumerable properties */
function removeTypename(obj: unknown): unknown {
  if (obj instanceof Date) {
    return obj.toISOString();
  }
  if (Array.isArray(obj)) {
    return obj.map(removeTypename);
  } else if (obj && typeof obj === "object") {
    const newObj: Record<string | symbol, unknown> = {};
    for (const key of Reflect.ownKeys(obj)) {
      if (key !== "__typename") {
        newObj[key] = removeTypename(
          (obj as Record<string | symbol, unknown>)[key],
        );
      }
    }
    return newObj;
  }
  return obj;
}
/* End transformation helpers */

/* Begin: Update helper function for cleaning GetCards arguments */
function cleanGetCardsArgs(args: QueryCardsArgs): Record<string, unknown> {
  return {
    ...args,
    before: args.before == null ? undefined : String(args.before),
    after: args.after == null ? undefined : String(args.after),
  };
}
/* End: Update helper function */

/* Add new helper to remove __typename using JSON replacer with explicit top-level deletion */
function jsonStringifyClean(obj: unknown): unknown {
  const result = JSON.parse(
    JSON.stringify(obj, (key, value) =>
      key === "__typename" ? undefined : value,
    ),
  );
  if (
    result &&
    typeof result === "object" &&
    Object.prototype.hasOwnProperty.call(result, "__typename")
  ) {
    delete result.__typename;
  }
  return result;
}

export const resolvers: Resolvers = {
  Query: {
    cards: async (
      _: unknown,
      args: QueryCardsArgs,
      { dataSources }: ApolloContext,
    ): Promise<CardConnection> => {
      const cleanedArgs = cleanGetCardsArgs(args);
      const result = await dataSources.cardAPI.getCards(cleanedArgs);
      return jsonStringifyClean(
        removeTypename(transformCardConnection(result)),
      ) as CardConnection;
    },
    card: async (
      _: unknown,
      args: QueryCardArgs,
      { dataSources }: ApolloContext,
    ): Promise<Card> =>
      jsonStringifyClean(
        removeTypename(
          transformCard(await dataSources.cardAPI.getCard(args.id || "")),
        ),
      ) as Card,
  },
  Mutation: {
    addCard: async (
      _: unknown,
      { input }: MutationAddCardArgs,
      { dataSources }: ApolloContext,
    ): Promise<CardsUpdatedResponse> => {
      if (!input) throw new Error("Missing Card input");
      const response = await dataSources.cardAPI.addCard(input);
      return jsonStringifyClean(
        removeTypename({
          ...response,
          card: transformCard(response.card),
        }),
      ) as CardsUpdatedResponse;
    },
    updateCard: async (
      _: unknown,
      { id, input }: MutationUpdateCardArgs,
      { dataSources }: ApolloContext,
    ): Promise<CardsUpdatedResponse> => {
      if (!input) throw new Error("Missing Card input");
      const response = await dataSources.cardAPI.updateCard(id, input);
      return jsonStringifyClean(
        removeTypename({
          ...response,
          card: transformCard(response.card),
        }),
      ) as CardsUpdatedResponse;
    },
    removeCard: async (
      _: unknown,
      { id }: MutationRemoveCardArgs,
      { dataSources }: ApolloContext,
    ): Promise<CardsUpdatedResponse> => {
      const response = await dataSources.cardAPI.removeCard(id);
      return jsonStringifyClean(
        removeTypename({
          ...response,
          card: transformCard(response.card),
        }),
      ) as CardsUpdatedResponse;
    },
  },
  Card: {
    // Override __typename resolver to return undefined (so the property is omitted in JSON)
    __typename: (): undefined => undefined,
    categories(
      root: ResolversParentTypes["Card"],
      _args: unknown,
      { dataSources }: ApolloContext,
    ): Promise<Category[]> {
      return dataSources.categoryAPI
        .getCategoriesFor(root.id)
        .then((cats: CategoryObject[]) =>
          cats.map(transformCategory),
        ) as Promise<Category[]>;
    },
  },
};
