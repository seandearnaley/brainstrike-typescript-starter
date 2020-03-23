import resolvers from "../graphql/resolvers";

import {
  mockCardsConnectionResult,
  mockFirstCardResponse,
  mockFirstCardQueryId,
} from "./__testData";

describe("[Query.cards]", () => {
  const mockContext = {
    dataSources: {
      cardAPI: { getCards: jest.fn() },
    },
  };

  const { getCards } = mockContext.dataSources.cardAPI;

  it("calls getCards from card api", async () => {
    getCards.mockReturnValueOnce(Promise.resolve(mockCardsConnectionResult));

    // check the resolver response
    const res = await resolvers.Query.cards(null, {}, mockContext, null);
    expect(res).toStrictEqual(mockCardsConnectionResult);
  });
});

describe("[Query.node card]", () => {
  const mockContext = {
    dataSources: {
      cardAPI: { getCard: jest.fn() },
    },
  };

  const { getCard } = mockContext.dataSources.cardAPI;

  it("calls getCard from card api", async () => {
    getCard.mockReturnValueOnce(Promise.resolve(mockFirstCardResponse));

    // check the resolver response
    const res = await resolvers.Query.node(
      null,
      {
        id: mockFirstCardQueryId,
      },
      mockContext,
      null
    );

    // make sure the dataSources were called properly
    expect(getCard).toHaveBeenCalledWith(mockFirstCardQueryId);
    expect(res).toStrictEqual(mockFirstCardResponse);
  });
});
