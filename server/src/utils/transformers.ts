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
  category: CategoryLike | CategoryEntity
): Category => {
  return {
    __typename: "Category",
    ...category,
    cards: category.cards
      ? transformCardConnection(category.cards)
      : {
          edges: [],
          pageInfo: {
            hasNextPage: false,
            hasPreviousPage: false,
            totalCount: 0,
          },
        },
  };
};

export const transformCard = (card: CardLike | CardEntity): Card => {
  return {
    __typename: "Card",
    ...card,
    categories: card.categories ? card.categories.map(transformCategory) : [],
  };
};

export const transformCardConnection = (
  connection: CardConnectionLike
): CardConnection => {
  if (!connection) {
    return {
      edges: [],
      pageInfo: { hasNextPage: false, hasPreviousPage: false, totalCount: 0 },
    };
  }

  // If connection already has edges and pageInfo, optionally map nodes
  if (
    typeof connection === "object" &&
    !Array.isArray(connection) &&
    "edges" in connection &&
    Array.isArray(connection.edges)
  ) {
    const edges = connection.edges.map((edge: EdgeLike) => ({
      ...edge,
      cursor: edge.cursor || edge.node.id,
      node: transformCard(edge.node),
    }));

    // Ensure pageInfo has all required properties
    const pageInfo = connection.pageInfo || {};
    return {
      edges,
      pageInfo: {
        hasNextPage: pageInfo.hasNextPage || false,
        hasPreviousPage: pageInfo.hasPreviousPage || false,
        totalCount: pageInfo.totalCount || edges.length,
      },
    };
  }

  // If connection is an array of cards, transform it to a CardConnection
  const cards = Array.isArray(connection) ? connection : [];
  return {
    edges: cards.map((card: CardLike) => ({
      cursor: card.id,
      node: transformCard(card),
    })),
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
      totalCount: cards.length,
    },
  };
};
