import { ApolloContext } from "../../src/types/context";
import resolvers from "../graphql/resolvers";

import {
  mockCardsConnectionResult,
  mockFirstCardResponse,
  mockFirstCardQueryId,
} from "./__testData";

describe("[Query.cards]", () => {
  const mockContext: ApolloContext = {
    dataSources: {
      cardAPI: { getCards: jest.fn() } as any,
      categoryAPI: {} as any,
    },
    connection: undefined,
  };

  const getCards = mockContext.dataSources.cardAPI.getCards as jest.Mock;

  it("calls getCards from card api", async () => {
    getCards.mockReturnValueOnce(Promise.resolve(mockCardsConnectionResult));

    // check the resolver response
    const res = await resolvers.Query!.cards!(
      {} as any,
      {},
      mockContext,
      {} as any
    );
    expect(res).toStrictEqual(mockCardsConnectionResult);
  });
});

describe("[Query.node card]", () => {
  const mockContext: ApolloContext = {
    dataSources: {
      cardAPI: { getCard: jest.fn() } as any,
      categoryAPI: {} as any,
    },
    connection: undefined,
  };

  const getCard = mockContext.dataSources.cardAPI.getCard as jest.Mock;

  it("calls getCard from card api", async () => {
    getCard.mockReturnValueOnce(Promise.resolve(mockFirstCardResponse));

    // check the resolver response
    const res = await resolvers.Query!.node!(
      {} as any,
      { id: mockFirstCardQueryId },
      mockContext,
      {} as any
    );

    // make sure the dataSources were called properly
    expect(getCard).toHaveBeenCalledWith(mockFirstCardQueryId);
    expect(res).toStrictEqual(mockFirstCardResponse);
  });
});
