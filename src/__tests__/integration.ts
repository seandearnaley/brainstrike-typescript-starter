import { createTestClient } from "apollo-server-testing";
import gql from "graphql-tag";
import { constructTestServer, mockRepos } from "./__utils";
import { mockFirstCardResponse } from "../datasources/__tests__/card";

const GET_CARDS = gql`
  query getCards {
    cards {
      id
      number
      label
      description
    }
  }
`;

describe("Queries", () => {
  it("fetches list of cards", async () => {
    // create an instance of ApolloServer that mocks out context, while reusing
    // existing dataSources, resolvers, and typeDefs.
    // This function returns the server instance as well as our dataSource
    // instances, so we can overwrite the underlying fetchers
    const { server } = constructTestServer({
      context: () => ({})
    });

    // mock the datasources' underlying fetch methods, whether that's a REST
    // lookup in the RESTDataSource or the store query in the Sequelize datasource
    mockRepos.cards.find.mockReturnValueOnce([mockFirstCardResponse]);

    // use our test server as input to the createTestClient fn
    // This will give us an interface, similar to apolloClient.query
    // to run queries against our instance of ApolloServer
    const { query } = createTestClient(server);
    const res = await query({
      query: GET_CARDS
    });
    expect(res).toMatchSnapshot();
  });

  it("fetches single card", async () => {});
});

// TODO:
describe("Mutations", () => {
  it("create card", async () => {});

  it("update card", async () => {});
});
