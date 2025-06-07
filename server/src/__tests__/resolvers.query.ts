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
import { vi, Mock } from "vitest";

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
        getCards: vi.fn(),
        getCard: vi.fn(),
        addCard: vi.fn(),
        updateCard: vi.fn(),
        removeCard: vi.fn(),
        encodeCard: vi.fn(),
        createEdges: vi.fn(),
        cardLoader: { load: vi.fn(), loadMany: vi.fn() },
      } as unknown as CardAPI,
      categoryAPI: {
        getCategory: vi.fn(),
        getCategories: vi.fn(),
        getCategoriesFor: vi.fn(),
        addCategory: vi.fn(),
        updateCategory: vi.fn(),
        removeCategory: vi.fn(),
      } as unknown as CategoryAPI,
    },
    connection: undefined,
  };

  const getCards = mockContext.dataSources.cardAPI.getCards as Mock;

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
        getCards: vi.fn(),
        getCard: vi.fn(),
        addCard: vi.fn(),
        updateCard: vi.fn(),
        removeCard: vi.fn(),
        encodeCard: vi.fn(),
        createEdges: vi.fn(),
        cardLoader: { load: vi.fn(), loadMany: vi.fn() },
      } as unknown as CardAPI,
      categoryAPI: {
        getCategory: vi.fn(),
        getCategories: vi.fn(),
        getCategoriesFor: vi.fn(),
        addCategory: vi.fn(),
        updateCategory: vi.fn(),
        removeCategory: vi.fn(),
      } as unknown as CategoryAPI,
    },
    connection: undefined,
  };

  const getCard = mockContext.dataSources.cardAPI.getCard as Mock;

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
