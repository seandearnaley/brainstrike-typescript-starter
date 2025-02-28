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
    id: category.id,
    name: category.name || "",
    created: category.created,
    updated: category.updated,
    parent: category.parent ? transformCategory(category.parent) : null,
    children: category.children ? category.children.map(transformCategory) : [],
    cards: category.cards ? transformCardConnection(category.cards) : [],
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
): Array<Card> => {
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
};
