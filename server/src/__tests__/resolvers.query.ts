import { ApolloContext } from "../../src/types/context";
import resolvers from "../graphql/resolvers";
import { CardAPI, CategoryAPI } from "../datasources";
import {
  ResolverFn,
  CardConnection,
  Node,
  QueryNodeArgs,
} from "../generated/graphql";
import { GraphQLResolveInfo } from "graphql";

import {
  mockCardsConnectionResult,
  mockFirstCardResponse,
  mockFirstCardQueryId,
} from "./__testData";

type ParentType = Record<string, unknown>;

describe("[Query.cards]", () => {
  const mockContext: ApolloContext = {
    dataSources: {
      cardAPI: {
        getCards: jest.fn(),
        getCard: jest.fn(),
        addCard: jest.fn(),
        updateCard: jest.fn(),
        removeCard: jest.fn(),
        encodeCard: jest.fn(),
        createEdges: jest.fn(),
        cardLoader: { load: jest.fn(), loadMany: jest.fn() },
      } as unknown as CardAPI,
      categoryAPI: {
        getCategory: jest.fn(),
        getCategories: jest.fn(),
        getCategoriesFor: jest.fn(),
        addCategory: jest.fn(),
        updateCategory: jest.fn(),
        removeCategory: jest.fn(),
      } as unknown as CategoryAPI,
    },
    connection: undefined,
  };

  const getCards = mockContext.dataSources.cardAPI.getCards as jest.Mock;

  it("calls getCards from card api", async () => {
    getCards.mockReturnValueOnce(Promise.resolve(mockCardsConnectionResult));

    // check the resolver response
    const cardsResolver = resolvers.Query?.cards as ResolverFn<
      CardConnection,
      ParentType,
      ApolloContext,
      Record<string, unknown>
    >;
    const res = await cardsResolver(
      {} as ParentType,
      {} as Record<string, unknown>,
      mockContext,
      {} as GraphQLResolveInfo,
    );
    expect(res).toStrictEqual(mockCardsConnectionResult);
  });
});

describe("[Query.node card]", () => {
  const mockContext: ApolloContext = {
    dataSources: {
      cardAPI: {
        getCards: jest.fn(),
        getCard: jest.fn(),
        addCard: jest.fn(),
        updateCard: jest.fn(),
        removeCard: jest.fn(),
        encodeCard: jest.fn(),
        createEdges: jest.fn(),
        cardLoader: { load: jest.fn(), loadMany: jest.fn() },
      } as unknown as CardAPI,
      categoryAPI: {
        getCategory: jest.fn(),
        getCategories: jest.fn(),
        getCategoriesFor: jest.fn(),
        addCategory: jest.fn(),
        updateCategory: jest.fn(),
        removeCategory: jest.fn(),
      } as unknown as CategoryAPI,
    },
    connection: undefined,
  };

  const getCard = mockContext.dataSources.cardAPI.getCard as jest.Mock;

  it("calls getCard from card api", async () => {
    getCard.mockReturnValueOnce(Promise.resolve(mockFirstCardResponse));

    // check the resolver response
    const nodeResolver = resolvers.Query?.node as ResolverFn<
      Node,
      ParentType,
      ApolloContext,
      QueryNodeArgs
    >;
    const res = await nodeResolver(
      {} as ParentType,
      { id: mockFirstCardQueryId },
      mockContext,
      {} as GraphQLResolveInfo,
    );

    // make sure the dataSources were called properly
    expect(getCard).toHaveBeenCalledWith(mockFirstCardQueryId);
    expect(res).toStrictEqual(mockFirstCardResponse);
  });
});
