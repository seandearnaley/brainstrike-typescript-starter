import { CardAPI } from "../card";
import { mockContext, Connection } from "../../__tests__/__utils";

import {
  mockCardsResponse,
  mockFirstCardResponse,
  mockFirstCardResponseId,
  mockReturnCard,
  mockCardInput,
  mockSuccessfulAddResponse,
  mockSuccessfulUpdateResponse,
  mockSuccessfulRemoveResponse
} from "../../__tests__/__testData";

describe("Queries", () => {
  let connection: Partial<Connection>;
  let ds: CardAPI;
  let mockCardFind: any;
  let mockCardFindOne: any;
  let mockCardSave: any;
  let mockCardRemove: any;

  beforeAll(() => {
    mockCardFind = jest.fn();
    mockCardFindOne = jest.fn();
    mockCardSave = jest.fn();
    mockCardRemove = jest.fn();

    connection = {
      getRepository: jest.fn().mockImplementation(target => {
        switch (target.name) {
          case "Card": {
            return {
              find: mockCardFind,
              findOne: mockCardFindOne,
              save: mockCardSave,
              remove: mockCardRemove
            };
          }
          default: {
            return {};
          }
        }
      })
    };

    ds = new CardAPI({ connection });

    ds.initialize({
      context: mockContext,
      cache: null
    });
  });

  describe("[CardAPI.getCards]", () => {
    it("gets all cards in cards repo", async () => {
      mockCardFind.mockReturnValue(mockCardsResponse);
      const res = await ds.getCards({ first: 100 });
      expect(res).toEqual(mockCardsResponse);
    });
  });

  describe("[CardAPI.getCard]", () => {
    it("gets a single card in card repo", async () => {
      mockCardFindOne.mockReturnValue(mockFirstCardResponse);
      const res = await ds.getCard(mockFirstCardResponseId);
      expect(res).toEqual(mockFirstCardResponse);
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
      const res = await ds.updateCard(mockFirstCardResponseId, mockCardInput);
      expect(res).toEqual(mockSuccessfulUpdateResponse);
    });
  });

  describe("[CardAPI.removeCard]", () => {
    it("removes a card from the card repo", async () => {
      mockCardRemove.mockReturnValue(mockReturnCard);
      const res = await ds.removeCard(mockFirstCardResponseId);
      expect(res).toEqual(mockSuccessfulRemoveResponse);
    });
  });
});
