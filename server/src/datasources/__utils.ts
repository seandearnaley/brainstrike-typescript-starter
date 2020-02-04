export interface FindInterface<Entity> {
  after?: string;
  /**
   * Limit (paginated) - max number of entities should be taken.
   */
  first?: number;
  /**
   * Order, in which entities should be ordered.
   */
  sortOptions?: {
    [P in keyof Entity]?: "ASC" | "DESC" | 1 | -1;
  };
}
