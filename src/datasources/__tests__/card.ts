import { CardAPI } from "../card";
import { ApolloContext } from "../../types/context";
import { Card } from "../../entity/Card";
import { Repository } from "typeorm";
// import { createConnection, Connection } from "typeorm";

type Mockify<T> = {
  [P in keyof T]: T[P] extends Function ? jest.Mock<{}> : T[P];
};

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

// eslint-disable-next-line
// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<Card>> = jest.fn(
  () => ({
    find: jest.fn(entity => entity),
    findOne: jest.fn(entity => entity),
    remove: jest.fn(entity => entity),
    save: jest.fn(entity => entity)
  })
);

const mockCardsResponse = [
  {
    id: "e303f7e5-15ce-4a5f-9179-a75ffb4f8191",
    number: 1,
    label: "test",
    description: "testing"
  },
  {
    id: "c74121e7-8471-4fa4-8320-dcfe685eaf24",
    number: 2,
    label: "adgdag",
    description: "adgdagdagdag"
  },
  {
    id: "1f266640-25fe-4015-bbfc-f551ed0aa38e",
    number: 5,
    label: "adgdag",
    description: "adgdagdagdag"
  }
];

// const createDBConnection = async (): Promise<Connection> =>
//   createConnection({
//     type: "sqlite",
//     database: ":memory:",
//     dropSchema: true,
//     entities: ["src/entity/**/*.ts"],
//     synchronize: true,
//     logging: false
//   });

// describe("Index (e2e)", () => {
//   let connection: Connection;

//   beforeAll(async () => {
//     connection = await createConnection();
//   });

//   afterAll(async () => {
//     // TODO: clean db or something like that
//   });

//   test("should run", async () => {
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);

//     const loadedUser = await connection.manager.findOne(User);

//     expect(loadedUser).toBeDefined();
//   });
// });

const mocks = {
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

describe("[CardAPI.getCards]", () => {
  it("gets all cards in store", async () => {
    const ds = new CardAPI();
    ds.initialize({
      context: mockContext,
      cache: null
    });

    //ds.repos.cards = new MockRepo();

    mocks.cards.find.mockReturnValueOnce(mockCardsResponse);
    const res = await ds.getCards();

    expect(res).toEqual(mockCardsResponse);

    // const res = await ds.addCard({
    //   number: 1,
    //   label: "hello",
    //   description: "yo"
    // });
    // mockContext.connection.getRepository.find.mockReturnValueOnce([{ id: 1 }]);
    // const res = await ds.findOrCreateUser({ email: "a@a.a" });
    // mockStore.users.findOrCreate.mockReturnValueOnce([{ id: 1 }]);
    // // check the result of the fn
    // const res = await ds.findOrCreateUser({ email: "a@a.a" });
    // expect(res).toEqual({ id: 1 });
    // // make sure store is called properly
    // expect(mockStore.users.findOrCreate).toBeCalledWith({
    //   where: { email: "a@a.a" }
    // });
  });
});
