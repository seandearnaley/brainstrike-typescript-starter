export const transformCategory = (category: any): any => {
  return {
    __typename: "Category",
    ...category,
    cards: category.cards
      ? transformCardConnection(category.cards)
      : { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } },
  };
};

export const transformCard = (card: any): any => {
  return {
    __typename: "Card",
    ...card,
    categories: card.categories ? card.categories.map(transformCategory) : [],
  };
};

export const transformCardConnection = (connection: any): any => {
  if (!connection) {
    return {
      edges: [],
      pageInfo: { hasNextPage: false, hasPreviousPage: false },
    };
  }
  // If connection already has edges and pageInfo, optionally map nodes
  if (connection.edges && Array.isArray(connection.edges)) {
    return {
      ...connection,
      edges: connection.edges.map((edge: any) => ({
        ...edge,
        node: transformCard(edge.node),
      })),
    };
  }
  return connection;
};
