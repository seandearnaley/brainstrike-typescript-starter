import { createTestClient } from "apollo-server-testing";

import {
  constructTestServer,
  createTestingConnection,
  Connection
} from "./__utils";

import * as TDATA from "./__testData";
import * as GQL from "./__queries";

describe("Queries", () => {
  let connection: Connection;

  beforeAll(async () => {
    console.log("creating test connection");
    connection = await createTestingConnection();
  });

  afterAll(() => connection.close());

  it("fetches list of cards", async () => {
    // create an instance of ApolloServer that mocks out context, while reusing
    // existing dataSources, resolvers, and typeDefs.
    const { apolloServer, cardAPI } = await constructTestServer(connection, {
      context: () => ({})
    });

    // mock the datasources' underlying fetch methods
    cardAPI.getCards = jest.fn(async () =>
      Promise.resolve(TDATA.mockCardsConnectionResult)
    );

    // use our test server as input to the createTestClient fn
    // This will give us an interface, similar to apolloClient.query
    // to run queries against our instance of ApolloServer
    const { query } = createTestClient(apolloServer);
    const res = await query({
      query: GQL.GET_CARD_DATA,
      variables: {
        first: 3
      }
    });
    expect(res).toMatchSnapshot();
  });

  it("fetches single card", async () => {
    const { apolloServer, cardAPI } = await constructTestServer(connection, {
      context: () => ({})
    });

    cardAPI.getCard = jest.fn(async () =>
      Promise.resolve(TDATA.mockFirstCardResponseEncoded)
    );

    const { query } = createTestClient(apolloServer);
    const res = await query({
      query: GQL.GET_CARD,
      variables: { id: TDATA.mockFirstCardQueryId }
    });

    expect(res).toMatchSnapshot();
  });
});

describe("Mutations", () => {
  let connection: Connection;

  beforeAll(async () => {
    console.log("creating test connection");
    connection = await createTestingConnection();
  });

  afterAll(() => connection.close());

  it("create card", async () => {
    const { apolloServer, cardAPI } = await constructTestServer(connection, {
      context: () => ({})
    });

    cardAPI.addCard = jest.fn(async () =>
      Promise.resolve(TDATA.mockSuccessfulAddResponse)
    );

    const { mutate } = createTestClient(apolloServer);
    const res = await mutate({
      mutation: GQL.ADD_CARD,
      variables: { input: TDATA.mockCardInput }
    });
    expect(res).toMatchSnapshot();
  });

  it("update card", async () => {
    const { apolloServer, cardAPI } = await constructTestServer(connection, {
      context: () => ({})
    });

    cardAPI.updateCard = jest.fn(async () =>
      Promise.resolve(TDATA.mockSuccessfulUpdateResponse)
    );

    const { mutate } = createTestClient(apolloServer);
    const res = await mutate({
      mutation: GQL.UPDATE_CARD,
      variables: {
        id: TDATA.mockFirstCardQueryId,
        input: TDATA.mockCardInput
      }
    });
    expect(res).toMatchSnapshot();
  });

  it("remove card", async () => {
    const { apolloServer, cardAPI } = await constructTestServer(connection, {
      context: () => ({})
    });

    cardAPI.removeCard = jest.fn(async () =>
      Promise.resolve(TDATA.mockSuccessfulRemoveResponse)
    );

    const { mutate } = createTestClient(apolloServer);
    const res = await mutate({
      mutation: GQL.REMOVE_CARD,
      variables: { id: TDATA.mockFirstCardQueryId }
    });
    expect(res).toMatchSnapshot();
  });
});
