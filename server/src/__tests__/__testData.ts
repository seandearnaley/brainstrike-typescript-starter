export const mockFirstCardQueryId =
  "ZTMwM2Y3ZTUtMTVjZS00YTVmLTkxNzktYTc1ZmZiNGY4MTkxOkNhcmQ";

export const mockCardInput = {
  number: 1,
  label: "Test Card 1",
  description: "testing",
  categoryId: "",
};

export const mockFirstCardResponse = {
  __typename: "Card",
  id: "e303f7e5-15ce-4a5f-9179-a75ffb4f8191",
  number: 1,
  label: "Test Card 1",
  description: "testing",
  created: "2020-02-01T20:19:27.909Z",
  updated: "2020-02-01T20:19:27.909Z",
  categories: [],
};

export const mockFirstCardResponseEncoded = {
  ...mockFirstCardResponse,
  id: "ZTMwM2Y3ZTUtMTVjZS00YTVmLTkxNzktYTc1ZmZiNGY4MTkxOkNhcmQ=",
};

export const mockE2EFirstId =
  "NzVmNzc0NzMtYjc0Yy00YTIwLWFlMGQtNzNlMDRiNDI3Y2RlOkNhcmQ=";

export const mockCardsResult = [
  {
    id: "75f77473-b74c-4a20-ae0d-73e04b427cde",
    number: 99999,
    label: "sed possimus tempore",
    description: "Amet autem et.",
    created: "2020-02-01T20:19:27.909Z",
    updated: "2020-02-01T20:19:27.909Z",
    categories: [],
    rowNumber: 1,
  },
  {
    id: "78555a90-f68b-454c-beb2-e7021f3d8c63",
    number: 99995,
    label: "necessitatibus id error",
    description: "Odit officia esse hic qui est perspiciatis.",
    created: "2020-02-01T23:03:03.942Z",
    updated: "2020-02-01T23:03:03.942Z",
    categories: [],
    rowNumber: 2,
  },
  {
    id: "caf38b31-e551-433b-b1b0-c65807e97927",
    number: 99974,
    label: "doloribus explicabo explicabo",
    description: "Et in sequi eum enim ratione.",
    created: "2020-02-02T04:59:07.272Z",
    updated: "2020-02-02T04:59:07.272Z",
    categories: [],
    rowNumber: 3,
  },
];

export const mockCardsTotalResult = [{ totalCount: "10000" }];

export const mockCardsConnectionResult = {
  edges: [
    {
      cursor: "Q3xDYXJkfDc1Zjc3NDczLWI3NGMtNGEyMC1hZTBkLTczZTA0YjQyN2NkZXwx",
      node: {
        ...mockCardsResult[0],
        id: "NzVmNzc0NzMtYjc0Yy00YTIwLWFlMGQtNzNlMDRiNDI3Y2RlOkNhcmQ=",
      },
    },
    {
      cursor: "Q3xDYXJkfDc4NTU1YTkwLWY2OGItNDU0Yy1iZWIyLWU3MDIxZjNkOGM2M3wy",
      node: {
        ...mockCardsResult[1],
        id: "Nzg1NTVhOTAtZjY4Yi00NTRjLWJlYjItZTcwMjFmM2Q4YzYzOkNhcmQ=",
      },
    },
    {
      cursor: "Q3xDYXJkfGNhZjM4YjMxLWU1NTEtNDMzYi1iMWIwLWM2NTgwN2U5NzkyN3wz",
      node: {
        ...mockCardsResult[2],
        id: "Y2FmMzhiMzEtZTU1MS00MzNiLWIxYjAtYzY1ODA3ZTk3OTI3OkNhcmQ=",
      },
    },
  ],
  pageInfo: {
    endCursor: "Q3xDYXJkfGNhZjM4YjMxLWU1NTEtNDMzYi1iMWIwLWM2NTgwN2U5NzkyN3wz",
    hasNextPage: true,
    hasPreviousPage: false,
    startCursor: "Q3xDYXJkfDc1Zjc3NDczLWI3NGMtNGEyMC1hZTBkLTczZTA0YjQyN2NkZXwx",
    totalCount: 10000,
  },
};

export const mockReturnCard = {
  ...mockFirstCardResponse,
};

export const defaultReturn = {
  success: true,
  card: {
    ...mockReturnCard,
    id: "ZTMwM2Y3ZTUtMTVjZS00YTVmLTkxNzktYTc1ZmZiNGY4MTkxOkNhcmQ=",
  },
};

export const mockSuccessfulAddResponse = {
  ...defaultReturn,
  message: "Card Added",
};

export const mockSuccessfulRemoveResponse = {
  ...defaultReturn,
  message: "Card Removed",
};

export const mockSuccessfulUpdateResponse = {
  ...defaultReturn,
  message: "Card Updated",
};

export const testCard = {
  id: "card1",
  number: 1,
  label: "Card Label",
  description: "Card Description",
  created: new Date(0),
  updated: new Date(0),
  categories: [],
};

export const dummyString = "";

export const dummyDate: Date = new Date(0);
