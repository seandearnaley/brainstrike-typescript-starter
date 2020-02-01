import { Card } from "../entity/Card";
import { Mockify } from "./__utils";
import { Category } from "../entity";

export const mockFirstCardResponseId = "e303f7e5-15ce-4a5f-9179-a75ffb4f8191";

export const mockCardInput = {
  number: 1,
  label: "Test Card 1",
  description: "testing",
  categoryId: null as string
};

export const mockFirstCardResponse = {
  id: mockFirstCardResponseId,
  ...mockCardInput,
  created: new Date(),
  updated: new Date(),
  categories: [] as Category[]
};

export const mockCardsResponse = [
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

export const mockReturnCard: Mockify<Card> = {
  ...mockFirstCardResponse,
  created: new Date(),
  updated: null
};

export const defaultReturn = {
  success: true,
  card: mockReturnCard
};

export const mockSuccessfulAddResponse = {
  ...defaultReturn,
  message: "Card Added"
};

export const mockSuccessfulRemoveResponse = {
  ...defaultReturn,
  message: "Card Removed"
};

export const mockSuccessfulUpdateResponse = {
  ...defaultReturn,
  message: "Card Updated"
};
