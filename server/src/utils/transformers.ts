import { Card, Category, CardConnection } from "../generated/graphql";
// Import types from entity
import { Card as CardEntity, Category as CategoryEntity } from "../entity";

// Define a more flexible type for the category input
type CategoryLike = {
  id: string;
  name?: string | null;
  created: Date;
  updated?: Date | null;
  cards?: CardLike[] | CardConnectionLike | null;
  children?: CategoryLike[] | null;
  parent?: CategoryLike | null;
};

// Define a more flexible type for the card input
type CardLike = {
  id: string;
  number?: number | null;
  label?: string | null;
  description?: string | null;
  created: Date;
  updated?: Date | null;
  categories?: CategoryLike[] | null;
};

// Define a type for card connection-like objects
type CardConnectionLike =
  | {
      edges?: Array<{ cursor?: string; node: CardLike }>;
      pageInfo?: {
        hasNextPage?: boolean;
        hasPreviousPage?: boolean;
        startCursor?: string;
        endCursor?: string;
        totalCount?: number;
      };
    }
  | CardLike[];

// Define a type for edge objects
type EdgeLike = {
  cursor?: string;
  node: CardLike;
};

// Export the transformer functions with more flexible parameter types
export const transformCategory = (
  category: CategoryLike | CategoryEntity,
): Category => {
  // Create a dummy CardConnection for the cards field
  // This is a placeholder that will be replaced by the actual resolver
  const dummyCardConnection: CardConnection = {
    edges: [],
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: "",
      endCursor: "",
      totalCount: 0,
    },
  };

  return {
    __typename: "Category",
    id: category.id,
    name: category.name || "",
    created: category.created,
    updated: category.updated,
    parent: category.parent ? transformCategory(category.parent) : null,
    children: category.children ? category.children.map(transformCategory) : [],
    cards: dummyCardConnection,
  };
};

// Helper function to extract Card[] from CardConnectionLike
function extractCardsFromConnection(connection: CardConnectionLike): Card[] {
  if (!connection) {
    return [];
  }

  if (Array.isArray(connection)) {
    return connection.map(transformCard);
  }

  if (connection.edges) {
    return connection.edges.map((edge) => transformCard(edge.node));
  }

  return [];
}

export const transformCard = (card: CardLike | CardEntity): Card => {
  return {
    __typename: "Card",
    ...card,
    categories: card.categories ? card.categories.map(transformCategory) : [],
  };
};

export const transformCardConnection = (
  connection: CardConnectionLike,
): CardConnection => {
  if (!connection) {
    // Return an empty CardConnection
    return {
      edges: [],
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: "",
        endCursor: "",
        totalCount: 0,
      },
    };
  }

  if (Array.isArray(connection)) {
    // Convert array of cards to CardConnection
    const transformedCards = connection.map(transformCard);
    return {
      edges: transformedCards.map((card) => ({
        cursor: card.id,
        node: card,
      })),
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: transformedCards.length > 0 ? transformedCards[0].id : "",
        endCursor:
          transformedCards.length > 0
            ? transformedCards[transformedCards.length - 1].id
            : "",
        totalCount: transformedCards.length,
      },
    };
  }

  if (connection.edges) {
    // If we already have a CardConnection-like object
    return {
      edges: connection.edges.map((edge) => ({
        cursor: edge.cursor || "",
        node: transformCard(edge.node),
      })),
      pageInfo: {
        hasNextPage: connection.pageInfo?.hasNextPage || false,
        hasPreviousPage: connection.pageInfo?.hasPreviousPage || false,
        startCursor: connection.pageInfo?.startCursor || "",
        endCursor: connection.pageInfo?.endCursor || "",
        totalCount: connection.pageInfo?.totalCount || 0,
      },
    };
  }

  // Return an empty CardConnection as fallback
  return {
    edges: [],
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: "",
      endCursor: "",
      totalCount: 0,
    },
  };
};
