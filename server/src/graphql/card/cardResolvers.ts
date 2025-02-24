import {
  Resolvers,
  CardsUpdatedResponse,
  CardConnection,
  Card,
  Category,
} from "../../generated/graphql";

/* Begin transformation helpers */
function transformCategory(category: any): any {
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
  if ((result as any).hasOwnProperty("__typename")) {
    delete (result as any)["__typename"];
  }
  return result;
}

function transformCard(card: any): any {
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

  const transformed: any = {
    id: card.id,
    number: card.number,
    label: card.label,
    description: card.description,
    created: created,
    updated,
    categories: (card.categories || []).map(transformCategory),
  };
  if (card.rowNumber !== undefined) {
    transformed.rowNumber = card.rowNumber;
  }
  if ((transformed as any).hasOwnProperty("__typename")) {
    delete (transformed as any)["__typename"];
  }
  return transformed;
}

function transformCardConnection(connection: any): any {
  return {
    ...connection,
    edges: connection.edges.map((edge: any) => ({
      ...edge,
      node: transformCard(edge.node),
    })),
  };
}

/* Updated helper to deep remove __typename from objects using Reflect.ownKeys to capture non-enumerable properties */
function removeTypename(obj: any): any {
  if (obj instanceof Date) {
    return obj.toISOString();
  }
  if (Array.isArray(obj)) {
    return obj.map(removeTypename);
  } else if (obj && typeof obj === "object") {
    const newObj: any = {};
    for (const key of Reflect.ownKeys(obj)) {
      if (key !== "__typename") {
        newObj[key] = removeTypename(obj[key]);
      }
    }
    return newObj;
  }
  return obj;
}
/* End transformation helpers */

/* Begin: Update helper function for cleaning GetCards arguments */
function cleanGetCardsArgs(args: any): any {
  return {
    ...args,
    before: args.before == null ? undefined : String(args.before),
    after: args.after == null ? undefined : String(args.after),
  };
}
/* End: Update helper function */

/* Add new helper to remove __typename using JSON replacer with explicit top-level deletion */
function jsonStringifyClean(obj: any): any {
  const result = JSON.parse(
    JSON.stringify(obj, (key, value) =>
      key === "__typename" ? undefined : value
    )
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
    cards: async (_, args, { dataSources }): Promise<CardConnection> => {
      const cleanedArgs = cleanGetCardsArgs(args);
      const result = await dataSources.cardAPI.getCards(cleanedArgs);
      return jsonStringifyClean(
        removeTypename(transformCardConnection(result))
      );
    },
    card: async (_, { id }, { dataSources }): Promise<Card> =>
      jsonStringifyClean(
        removeTypename(transformCard(await dataSources.cardAPI.getCard(id!)))
      ),
  },
  Mutation: {
    addCard: async (
      _,
      { input },
      { dataSources }
    ): Promise<CardsUpdatedResponse> => {
      if (!input) throw new Error("Missing Card input");
      const response = await dataSources.cardAPI.addCard(input);
      return jsonStringifyClean(
        removeTypename({
          ...response,
          card: transformCard(response.card),
        })
      );
    },
    updateCard: async (
      _,
      { id, input },
      { dataSources }
    ): Promise<CardsUpdatedResponse> => {
      if (!input) throw new Error("Missing Card input");
      const response = await dataSources.cardAPI.updateCard(id, input);
      return jsonStringifyClean(
        removeTypename({
          ...response,
          card: transformCard(response.card),
        })
      );
    },
    removeCard: async (
      _,
      { id },
      { dataSources }
    ): Promise<CardsUpdatedResponse> => {
      const response = await dataSources.cardAPI.removeCard(id);
      return jsonStringifyClean(
        removeTypename({
          ...response,
          card: transformCard(response.card),
        })
      );
    },
  },
  Card: {
    // Override __typename resolver to return undefined (so the property is omitted in JSON)
    __typename: () => undefined,
    categories(root, args, { dataSources }): Promise<Category[]> {
      return dataSources.categoryAPI
        .getCategoriesFor(root.id)
        .then((cats: any) => cats.map(transformCategory));
    },
  },
};
