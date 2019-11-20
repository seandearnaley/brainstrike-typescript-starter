import { CardAPI } from "../card";
import { ApolloContext } from "../../types/context";
import { Card } from "../../entity/Card";

type Mockify<T> = {
  [P in keyof T]: T[P] extends Function ? jest.Mock<{}> : T[P];
};

const mockFirstCardResponseId = "e303f7e5-15ce-4a5f-9179-a75ffb4f8191";

const mockCardInput = {
  number: 1,
  label: "Test Card 1",
  description: "testing"
};

const mockFirstCardResponse = {
  id: mockFirstCardResponseId,
  ...mockCardInput
};

const mockCardsResponse = [
  mockFirstCardResponse,
  {
    id: "c74121e7-8471-4fa4-8320-dcfe685eaf24",
    number: 2,
    label: "Test Card 2",
    description: "more testing"
  },
  {
    id: "1f266640-25fe-4015-bbfc-f551ed0aa38e",
    number: 3,
    label: "Test Card 3",
    description: "even more testing"
  }
];

const mockReturnCard: Mockify<Card> = {
  ...mockFirstCardResponse,
  created: new Date(),
  updated: null
};

const defaultReturn = {
  success: true,
  card: mockReturnCard
};

const mockSuccessfulAddResponse = {
  ...defaultReturn,
  message: "Card Added"
};

const mockSuccessfulRemoveResponse = {
  ...defaultReturn,
  message: "Card Removed"
};

const mockSuccessfulUpdateResponse = {
  ...defaultReturn,
  message: "Card Updated"
};

const mockRepos = {
  cards: {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    remove: jest.fn()
  }
};

const mockContext: Mockify<ApolloContext> = {
  dataSources: null,
  connection: null
};

const ds = new CardAPI({ repos: mockRepos });

ds.initialize({
  context: mockContext,
  cache: null
});

describe("[CardAPI.getCards]", () => {
  it("gets all cards in cards repo", async () => {
    mockRepos.cards.find.mockReturnValueOnce(mockCardsResponse);
    const res = await ds.getCards();
    expect(res).toEqual(mockCardsResponse);
  });
});

describe("[CardAPI.getCard]", () => {
  it("gets a single card in card repo", async () => {
    mockRepos.cards.findOne.mockReturnValueOnce(mockFirstCardResponse);
    const res = await ds.getCard(mockFirstCardResponseId);
    expect(res).toEqual(mockFirstCardResponse);
  });
});

describe("[CardAPI.addCard]", () => {
  it("adds a card to the card repo", async () => {
    mockRepos.cards.save.mockReturnValueOnce(mockReturnCard);
    const res = await ds.addCard(mockCardInput);
    expect(res).toEqual(mockSuccessfulAddResponse);
  });
});

describe("[CardAPI.updateCard]", () => {
  it("updates a card in the card repo", async () => {
    mockRepos.cards.findOne.mockReturnValueOnce(mockReturnCard);
    mockRepos.cards.save.mockReturnValueOnce(mockReturnCard);
    const res = await ds.updateCard(mockFirstCardResponseId, mockCardInput);
    expect(res).toEqual(mockSuccessfulUpdateResponse);
  });
});

describe("[CardAPI.removeCard]", () => {
  it("removes a card from the card repo", async () => {
    mockRepos.cards.remove.mockReturnValueOnce(mockReturnCard);
    const res = await ds.removeCard(mockFirstCardResponseId);
    expect(res).toEqual(mockSuccessfulRemoveResponse);
  });
});
