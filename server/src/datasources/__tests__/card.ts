import { CardAPI } from "../card";
import {
  mockContext,
  createTestingConnection,
  DataSource,
} from "../../__tests__/__utils";
import { InMemoryLRUCache } from "@apollo/utils.keyvaluecache";

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
  let connection: DataSource;
  let ds: CardAPI;
  let mockCardFind: any;
  let mockCardFindOneBy: any;
  let mockCardSave: any;
  let mockCardRemove: any;
  let mockCardQuery: any;
  let mockQueryRunner: any;
  let mockManager: any;

  beforeAll(async () => {
    console.log("creating test connection");
    connection = (await createTestingConnection()) as unknown as DataSource;
    if (!connection.name) {
      (connection as any).name = "test-connection";
    }
    (connection as any).findMetadata = jest.fn();
    (connection as any).buildMetadatas = jest.fn();
    (connection as any).getDatabaseName = jest.fn();

    mockCardFind = jest.fn();
    mockCardFindOneBy = jest.fn();
    mockCardSave = jest.fn();
    mockCardRemove = jest.fn();
    mockCardQuery = jest.fn();

    // Mock the manager for transaction operations
    mockManager = {
      save: jest.fn(),
      remove: jest.fn(),
    };

    // Mock the query runner for transactions
    mockQueryRunner = {
      connect: jest.fn(),
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
      manager: mockManager,
    };

    // Mock the connection's createQueryRunner method
    connection.createQueryRunner = jest.fn().mockReturnValue(mockQueryRunner);

    connection.getRepository = jest.fn().mockImplementation((target) => {
      switch (target.name) {
        case "Card": {
          return {
            find: mockCardFind,
            findOneBy: mockCardFindOneBy,
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
      cache: new InMemoryLRUCache(),
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
      mockCardFindOneBy.mockReturnValue(mockFirstCardResponse);
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
      mockCardFindOneBy.mockReturnValue(mockReturnCard);
      mockCardSave.mockReturnValue(mockReturnCard);
      const res = await ds.updateCard(mockFirstCardQueryId, mockCardInput);
      expect(res).toEqual(mockSuccessfulUpdateResponse);
    });
  });

  describe("[CardAPI.removeCard]", () => {
    it("removes a card from the card repo", async () => {
      // Mock findOneBy to return a card with the expected structure
      mockCardFindOneBy.mockReturnValue({ ...mockReturnCard, categories: [] });

      // Mock the transaction operations
      mockManager.save.mockResolvedValue({ ...mockReturnCard, categories: [] });
      mockManager.remove.mockResolvedValue(mockReturnCard);

      const res = await ds.removeCard(mockFirstCardQueryId);

      // Verify transaction was used correctly
      expect(connection.createQueryRunner).toHaveBeenCalled();
      expect(mockQueryRunner.connect).toHaveBeenCalled();
      expect(mockQueryRunner.startTransaction).toHaveBeenCalled();
      expect(mockManager.save).toHaveBeenCalled();
      expect(mockManager.remove).toHaveBeenCalled();
      expect(mockQueryRunner.commitTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.release).toHaveBeenCalled();

      expect(res).toEqual(mockSuccessfulRemoveResponse);
    });
  });
});
