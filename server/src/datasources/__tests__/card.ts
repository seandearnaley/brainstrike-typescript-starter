import { vi, Mock } from "vitest";
import { CardAPI } from "../card";
import {
  mockContext,
  createTestingConnection,
  DataSource,
} from "../../__tests__/__utils";
import { InMemoryLRUCache } from "@apollo/utils.keyvaluecache";
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
import { Card } from "../../entity/Card";
import { QueryRunner, Repository } from "typeorm";

/* eslint-disable @typescript-eslint/no-explicit-any */

describe("Queries", () => {
  let connection: DataSource;
  let ds: CardAPI;
  let mockCardFind: Mock;
  let mockCardFindOneBy: Mock;
  let mockCardSave: Mock;
  let mockCardRemove: Mock;
  let mockCardQuery: Mock;
  let mockQueryRunner: QueryRunner;
  let mockManager: { save: Mock; remove: Mock };

  beforeAll(async () => {
    console.log("creating test connection");
    connection = (await createTestingConnection()) as unknown as DataSource;
    if (!connection.name) {
      (connection as any).name = "test-connection";
    }
    (connection as any).findMetadata = vi.fn();
    (connection as any).buildMetadatas = vi.fn();
    (connection as any).getDatabaseName = vi.fn();

    mockCardFind = vi.fn();
    mockCardFindOneBy = vi.fn();
    mockCardSave = vi.fn();
    mockCardRemove = vi.fn();
    mockCardQuery = vi.fn();

    // Mock the manager for transaction operations
    mockManager = {
      save: vi.fn(),
      remove: vi.fn(),
    };

    // Mock the query runner for transactions
    mockQueryRunner = {
      connect: vi.fn(),
      startTransaction: vi.fn(),
      commitTransaction: vi.fn(),
      rollbackTransaction: vi.fn(),
      release: vi.fn(),
      manager: mockManager,
    } as unknown as QueryRunner;

    // Mock the connection's createQueryRunner method
    connection.createQueryRunner = vi.fn().mockReturnValue(mockQueryRunner);

    connection.getRepository = vi
      .fn()
      .mockImplementation((target: typeof Card): Repository<Card> | object => {
        if (target.name === "Card") {
          return {
            find: mockCardFind,
            findOneBy: mockCardFindOneBy,
            save: mockCardSave,
            remove: mockCardRemove,
          };
        }
        return {};
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
