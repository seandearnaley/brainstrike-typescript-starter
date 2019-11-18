import { Mutation } from "../resolvers";

const mockContext = {
  dataSources: {
    userAPI: {
      bookTrips: jest.fn(),
      cancelTrip: jest.fn(),
      findOrCreateUser: jest.fn()
    },
    launchAPI: {
      getLaunchesByIds: jest.fn(),
      getLaunchById: jest.fn()
    }
  },
  user: { id: 1, email: "a@a.a" }
};

describe("[Mutation.bookTrips]", () => {
  const { bookTrips } = mockContext.dataSources.userAPI;
  const { getLaunchesByIds } = mockContext.dataSources.launchAPI;

  it("returns true if booking succeeds", async () => {
    bookTrips.mockReturnValueOnce([{ launchId: 999 }]);
    getLaunchesByIds.mockReturnValueOnce([{ id: 999, cursor: "foo" }]);

    // check the resolver response
    const res = await Mutation.bookTrips(
      null,
      { launchIds: [123] },
      mockContext
    );
    expect(res).toEqual({
      launches: [{ cursor: "foo", id: 999 }],
      message: "trips booked successfully",
      success: true
    });

    // check if the dataSource was called with correct args
    expect(bookTrips).toBeCalledWith({ launchIds: [123] });
  });

  it("returns false if booking fails", async () => {
    bookTrips.mockReturnValueOnce([]);

    // check the resolver response
    const res = await Mutation.bookTrips(
      null,
      { launchIds: [123] },
      mockContext
    );

    expect(res.message).toBeDefined();
    expect(res.success).toBeFalsy();
  });
});

describe("[Mutation.cancelTrip]", () => {
  const { cancelTrip } = mockContext.dataSources.userAPI;
  const { getLaunchById } = mockContext.dataSources.launchAPI;

  it("returns true if cancelling succeeds", async () => {
    cancelTrip.mockReturnValueOnce(true);
    getLaunchById.mockReturnValueOnce({ id: 999, cursor: "foo" });

    // check the resolver response
    const res = await Mutation.cancelTrip(null, { launchId: 123 }, mockContext);
    expect(res).toEqual({
      success: true,
      message: "trip cancelled",
      launches: [{ id: 999, cursor: "foo" }]
    });

    // check if the dataSource was called with correct args
    expect(cancelTrip).toBeCalledWith({ launchId: 123 });
  });

  it("returns false if cancelling fails", async () => {
    cancelTrip.mockReturnValueOnce(false);

    // check the resolver response
    const res = await Mutation.cancelTrip(null, { launchId: 123 }, mockContext);
    expect(res.message).toBeDefined();
    expect(res.success).toBeFalsy();
  });
});
