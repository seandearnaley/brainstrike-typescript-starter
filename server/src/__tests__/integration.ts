import {
  constructTestServer,
  createTestingConnection,
  DataSource,
  convertStringDatesToDateObjects,
} from "./__utils";

import * as TDATA from "./__testData";
import * as GQL from "./__queries";
import { CardAPI } from "../datasources/card";
import { print } from "graphql";

// Create type aliases for the non-exported types from CardAPI
type CardObject = Parameters<CardAPI["getCard"]>[0] extends string
  ? Awaited<ReturnType<CardAPI["getCard"]>>
  : never;

type CardConnectionObject = Awaited<ReturnType<CardAPI["getCards"]>>;

type CardsUpdatedResponseObject = Awaited<ReturnType<CardAPI["addCard"]>>;

describe("Queries", () => {
  let connection: DataSource;

  beforeAll(async () => {
    console.log("creating test connection");
    connection = await createTestingConnection();
  });

  afterAll(() => connection.close());

  it("fetches list of cards", async () => {
    // create an instance of ApolloServer that mocks out context, while reusing
    // existing dataSources, resolvers, and typeDefs.
    const { apolloServer, cardAPI } = await constructTestServer(connection, {
      context: () => ({
        dataSources: {
          cardAPI,
          categoryAPI: {} as any,
        },
      }),
    });

    // mock the datasources' underlying fetch methods
    cardAPI.getCards = jest.fn(async () =>
      Promise.resolve(
        convertStringDatesToDateObjects(
          TDATA.mockCardsConnectionResult,
        ) as unknown as CardConnectionObject,
      ),
    );

    // Start the server - use try/catch to handle if already started
    try {
      await apolloServer.start();
    } catch (error) {
      // If the error is about the server already being started, we can ignore it
      if (!(error instanceof Error) || !error.message.includes("start()")) {
        throw error;
      }
    }

    // Execute the operation directly on the server
    const res = await apolloServer.executeOperation(
      {
        query: print(GQL.GET_CARD_DATA),
        variables: { first: 20 },
      },
      {
        contextValue: {
          dataSources: {
            cardAPI,
            categoryAPI: {} as any,
          },
        },
      },
    );

    expect(res).toMatchSnapshot();
  });

  it("fetches single card", async () => {
    // create an instance of ApolloServer that mocks out context, while reusing
    // existing dataSources, resolvers, and typeDefs.
    const { apolloServer, cardAPI } = await constructTestServer(connection, {
      context: () => ({
        dataSources: {
          cardAPI,
          categoryAPI: {} as any,
        },
      }),
    });

    // mock the datasources' underlying fetch methods
    cardAPI.getCard = jest.fn(async () =>
      Promise.resolve(
        convertStringDatesToDateObjects(
          TDATA.mockFirstCardResponseEncoded,
        ) as unknown as CardObject,
      ),
    );

    // Start the server - use try/catch to handle if already started
    try {
      await apolloServer.start();
    } catch (error) {
      // If the error is about the server already being started, we can ignore it
      if (!(error instanceof Error) || !error.message.includes("start()")) {
        throw error;
      }
    }

    // Execute the operation directly on the server
    const res = await apolloServer.executeOperation(
      {
        query: print(GQL.GET_CARD),
        variables: { id: TDATA.mockFirstCardQueryId },
      },
      {
        contextValue: {
          dataSources: {
            cardAPI,
            categoryAPI: {} as any,
          },
        },
      },
    );

    expect(res).toMatchSnapshot();
  });
});

describe("Mutations", () => {
  let connection: DataSource;

  beforeAll(async () => {
    console.log("creating test connection");
    connection = await createTestingConnection();
  });

  afterAll(() => connection.close());

  it("create card", async () => {
    // create an instance of ApolloServer that mocks out context, while reusing
    // existing dataSources, resolvers, and typeDefs.
    const { apolloServer, cardAPI } = await constructTestServer(connection, {
      context: () => ({
        dataSources: {
          cardAPI,
          categoryAPI: {} as any,
        },
      }),
    });

    // mock the datasources' underlying fetch methods
    cardAPI.addCard = jest.fn(async () =>
      Promise.resolve(
        convertStringDatesToDateObjects(
          TDATA.mockSuccessfulAddResponse,
        ) as unknown as CardsUpdatedResponseObject,
      ),
    );

    // Start the server - use try/catch to handle if already started
    try {
      await apolloServer.start();
    } catch (error) {
      // If the error is about the server already being started, we can ignore it
      if (!(error instanceof Error) || !error.message.includes("start()")) {
        throw error;
      }
    }

    // Execute the operation directly on the server
    const res = await apolloServer.executeOperation(
      {
        query: print(GQL.ADD_CARD),
        variables: { input: TDATA.mockCardInput },
      },
      {
        contextValue: {
          dataSources: {
            cardAPI,
            categoryAPI: {} as any,
          },
        },
      },
    );

    expect(res).toMatchSnapshot();
  });

  it("update card", async () => {
    // create an instance of ApolloServer that mocks out context, while reusing
    // existing dataSources, resolvers, and typeDefs.
    const { apolloServer, cardAPI } = await constructTestServer(connection, {
      context: () => ({
        dataSources: {
          cardAPI,
          categoryAPI: {} as any,
        },
      }),
    });

    // mock the datasources' underlying fetch methods
    cardAPI.updateCard = jest.fn(async () =>
      Promise.resolve(
        convertStringDatesToDateObjects(
          TDATA.mockSuccessfulUpdateResponse,
        ) as unknown as CardsUpdatedResponseObject,
      ),
    );

    // Start the server - use try/catch to handle if already started
    try {
      await apolloServer.start();
    } catch (error) {
      // If the error is about the server already being started, we can ignore it
      if (!(error instanceof Error) || !error.message.includes("start()")) {
        throw error;
      }
    }

    // Execute the operation directly on the server
    const res = await apolloServer.executeOperation(
      {
        query: print(GQL.UPDATE_CARD),
        variables: {
          id: TDATA.mockFirstCardQueryId,
          input: TDATA.mockCardInput,
        },
      },
      {
        contextValue: {
          dataSources: {
            cardAPI,
            categoryAPI: {} as any,
          },
        },
      },
    );

    expect(res).toMatchSnapshot();
  });

  it("remove card", async () => {
    // create an instance of ApolloServer that mocks out context, while reusing
    // existing dataSources, resolvers, and typeDefs.
    const { apolloServer, cardAPI } = await constructTestServer(connection, {
      context: () => ({
        dataSources: {
          cardAPI,
          categoryAPI: {} as any,
        },
      }),
    });

    // mock the datasources' underlying fetch methods
    cardAPI.removeCard = jest.fn(async () =>
      Promise.resolve(
        convertStringDatesToDateObjects(
          TDATA.mockSuccessfulRemoveResponse,
        ) as unknown as CardsUpdatedResponseObject,
      ),
    );

    // Start the server - use try/catch to handle if already started
    try {
      await apolloServer.start();
    } catch (error) {
      // If the error is about the server already being started, we can ignore it
      if (!(error instanceof Error) || !error.message.includes("start()")) {
        throw error;
      }
    }

    // Execute the operation directly on the server
    const res = await apolloServer.executeOperation(
      {
        query: print(GQL.REMOVE_CARD),
        variables: { id: TDATA.mockFirstCardQueryId },
      },
      {
        contextValue: {
          dataSources: {
            cardAPI,
            categoryAPI: {} as any,
          },
        },
      },
    );

    expect(res).toMatchSnapshot();
  });
});
