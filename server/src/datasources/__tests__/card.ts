import { CardAPI } from "../card";
import {
  mockContext,
  createTestingConnection,
  Connection,
} from "../../__tests__/__utils";

/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  mockFirstCardResponse,
  mockFirstCardResponseEncoded,
  mockFirstCardQueryId,
  mockCardsResult,
  mockReturnCard,
  mockCardInput,
  mockSuccessfulAddResponse,
  mockSuccessfulUpdateResponse,
  mockSuccessfulRemoveResponse,
  mockCardsConnectionResult,
  mockCardsTotalResult,
} from "../../__tests__/__testData";

describe("Queries", () => {
  let connection: Partial<Connection>;
  let ds: CardAPI;
  let mockCardFind: any;
  let mockCardFindOne: any;
  let mockCardSave: any;
  let mockCardRemove: any;
  let mockCardQuery: any;

  beforeAll(async () => {
    console.log("creating test connection");
    connection = await createTestingConnection();

    mockCardFind = jest.fn();
    mockCardFindOne = jest.fn();
    mockCardSave = jest.fn();
    mockCardRemove = jest.fn();
    mockCardQuery = jest.fn();

    connection.getRepository = jest.fn().mockImplementation((target) => {
      switch (target.name) {
        case "Card": {
          return {
            find: mockCardFind,
            findOne: mockCardFindOne,
            save: mockCardSave,
            remove: mockCardRemove,
          };
        }
        default: {
          return {};
        }
      }
    });

    connection.query = mockCardQuery;

    ds = new CardAPI({ connection });

    ds.initialize({
      context: mockContext,
      cache: null,
    });
  });

  afterAll(() => connection.close());

  describe("[CardAPI.getCards]", () => {
    it("gets all cards in cards repo", async () => {
      mockCardQuery
        .mockReturnValueOnce(mockCardsResult)
        .mockReturnValueOnce(mockCardsTotalResult);
      const res = await ds.getCards({ first: 3 });
      expect(res).toEqual(mockCardsConnectionResult);
    });
  });

  describe("[CardAPI.getCard]", () => {
    it("gets a single card in card repo", async () => {
      mockCardFindOne.mockReturnValue(mockFirstCardResponse);
      const res = await ds.getCard(mockFirstCardQueryId);
      expect(res).toEqual(mockFirstCardResponseEncoded);
    });
  });

  describe("[CardAPI.addCard]", () => {
    it("adds a card to the card repo", async () => {
      mockCardSave.mockReturnValue(mockReturnCard);
      const res = await ds.addCard(mockCardInput);
      expect(res).toEqual(mockSuccessfulAddResponse);
    });
  });

  describe("[CardAPI.updateCard]", () => {
    it("updates a card in the card repo", async () => {
      mockCardFindOne.mockReturnValue(mockReturnCard);
      mockCardSave.mockReturnValue(mockReturnCard);
      const res = await ds.updateCard(mockFirstCardQueryId, mockCardInput);
      expect(res).toEqual(mockSuccessfulUpdateResponse);
    });
  });

  describe("[CardAPI.removeCard]", () => {
    it("removes a card from the card repo", async () => {
      mockCardRemove.mockReturnValue(mockReturnCard);
      const res = await ds.removeCard(mockFirstCardQueryId);
      expect(res).toEqual(mockSuccessfulRemoveResponse);
    });
  });
});
