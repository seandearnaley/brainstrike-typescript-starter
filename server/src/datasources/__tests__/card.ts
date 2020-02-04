import { CardAPI } from "../card";
import { mockRepos, mockContext } from "../../__tests__/__utils";

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

const ds = new CardAPI({ repos: mockRepos });

ds.initialize({
  context: mockContext,
  cache: null
});

describe("[CardAPI.getCards]", () => {
  it("gets all cards in cards repo", async () => {
    mockRepos.cards.find.mockReturnValueOnce(mockCardsResponse);
    const res = await ds.getCards({ first: 100 });
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
