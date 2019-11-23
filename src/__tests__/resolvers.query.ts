import resolvers from "../graphql/resolvers";
import { mockRepos } from "./__utils";
import { CardAPI } from "../../src/datasources/card";
import {
  mockFirstCardResponse,
  mockFirstCardResponseId
} from "../datasources/__tests__/card";

const mockContext = {
  dataSources: {
    cardAPI: new CardAPI({ repos: mockRepos })
  }
};

describe("[Query.cards]", () => {
  it("calls getCards from card api", async () => {
    const mock = jest.spyOn(mockContext.dataSources.cardAPI, "getCards");

    mock.mockReturnValueOnce(Promise.resolve([mockFirstCardResponse]));

    // check the resolver response
    const res = await resolvers.Query.cards(null, {}, mockContext, null);

    expect(mock).toHaveBeenCalled();
    expect(res).toStrictEqual([mockFirstCardResponse]);

    // restore getCards
    mock.mockRestore();
  });
});

describe("[Query.card]", () => {
  it("calls getCard from card api", async () => {
    const mock = jest.spyOn(mockContext.dataSources.cardAPI, "getCard");

    mock.mockReturnValueOnce(Promise.resolve(mockFirstCardResponse));

    // check the resolver response
    const res = await resolvers.Query.card(
      null,
      {
        id: mockFirstCardResponseId
      },
      mockContext,
      null
    );

    // make sure the dataSources were called properly
    expect(mock).toHaveBeenCalledWith(mockFirstCardResponseId);
    expect(res).toStrictEqual(mockFirstCardResponse);

    // restore getCards
    mock.mockRestore();
  });
});
