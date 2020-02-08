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

export const mockCardsResult = [
  {
    id: "75f77473-b74c-4a20-ae0d-73e04b427cde",
    number: 99999,
    label: "sed possimus tempore",
    description: "Amet autem et.",
    created: "2020-02-01T20:19:27.909Z",
    updated: "2020-02-01T20:19:27.909Z",
    categoryName: "Garden 91201",
    rowNumber: "1"
  },
  {
    id: "78555a90-f68b-454c-beb2-e7021f3d8c63",
    number: 99995,
    label: "necessitatibus id error",
    description: "Odit officia esse hic qui est perspiciatis.",
    created: "2020-02-01T23:03:03.942Z",
    updated: "2020-02-01T23:03:03.942Z",
    categoryName: "Grocery 76963",
    rowNumber: "2"
  },
  {
    id: "caf38b31-e551-433b-b1b0-c65807e97927",
    number: 99974,
    label: "doloribus explicabo explicabo",
    description: "Et in sequi eum enim ratione.",
    created: "2020-02-02T04:59:07.272Z",
    updated: "2020-02-02T04:59:07.272Z",
    categoryName: "Sports 46220",
    rowNumber: "3"
  }
];

export const mockCardsTotalResult = [{ totalCount: "10000" }];

export const mockCardsConnectionResult = {
  edges: [
    {
      cursor: "Q3xjYXJkfDc1Zjc3NDczLWI3NGMtNGEyMC1hZTBkLTczZTA0YjQyN2NkZQ==",
      node: mockCardsResult[0]
    },
    {
      cursor: "Q3xjYXJkfDc4NTU1YTkwLWY2OGItNDU0Yy1iZWIyLWU3MDIxZjNkOGM2Mw==",
      node: mockCardsResult[1]
    },
    {
      cursor: "Q3xjYXJkfGNhZjM4YjMxLWU1NTEtNDMzYi1iMWIwLWM2NTgwN2U5NzkyNw==",
      node: mockCardsResult[2]
    }
  ],
  pageInfo: {
    endCursor: "Q3xjYXJkfGNhZjM4YjMxLWU1NTEtNDMzYi1iMWIwLWM2NTgwN2U5NzkyNw==",
    hasNextPage: true,
    hasPreviousPage: false,
    startCursor: "Q3xjYXJkfDc1Zjc3NDczLWI3NGMtNGEyMC1hZTBkLTczZTA0YjQyN2NkZQ==",
    totalCount: 10000
  }
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
