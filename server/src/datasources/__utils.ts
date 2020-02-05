import { SelectQueryBuilder } from "typeorm";

export interface FindInterface<Entity> {
  before?: string;
  after?: string;
  first?: number;
  /**
   * Order, in which entities should be ordered.
   */
  sortOptions?: {
    [P in keyof Entity]?: "ASC" | "DESC" | 1 | -1;
  };
}

export class CursorPaginationArgs {
  after?: string;
  before?: string;
  limit?: number = 10;
}

export interface MayHaveId {
  id?: string; // you can use any type, number is just an example
}

export class CursorPagination<TEntity extends MayHaveId> {
  protected resultsQuery: SelectQueryBuilder<TEntity>;
  protected countQuery: SelectQueryBuilder<TEntity>;
  protected args: CursorPaginationArgs;
  protected tableName: string;
  protected cursorColumn: string;
  protected results: TEntity[];

  constructor(
    query: SelectQueryBuilder<TEntity>,
    args: CursorPaginationArgs,
    tableName?: string,
    cursorColumn?: string
  ) {
    this.tableName = query.escape(tableName);
    this.cursorColumn = query.escape(cursorColumn);
    this.args = args;

    let selectiveCondition: [string, Record<string, any>?] = [
      `${this.cursorColumn} >= '00000000-0000-0000-0000-000000000000'`
    ];

    if (args.after) {
      selectiveCondition = [
        `${this.tableName}.${this.cursorColumn} > :cursor`,
        { cursor: args.after }
      ];
    } else if (args.before) {
      selectiveCondition = [
        `${this.tableName}.${this.cursorColumn} < :cursor`,
        { cursor: args.before }
      ];
    }

    this.countQuery = query.clone();
    this.resultsQuery = this.applyWhereConditionToQuery(
      query,
      selectiveCondition
    )
      .orderBy(`${this.tableName}.${this.cursorColumn}`, "ASC")
      .limit(args.limit);
  }

  public async buildResponse(): Promise<any> {
    const results = await this.getResults();
    const edges = this.createEdges(results);

    const startCursor = edges[0].cursor;
    const endCursor = edges[edges.length - 1].cursor;
    const count = await this.getCount(startCursor, endCursor);
    return {
      edges: edges,
      pageInfo: {
        startCursor,
        endCursor,
        ...count
      }
    };
  }

  public async getResults(): Promise<TEntity[]> {
    if (!this.results) {
      this.results = await this.resultsQuery.getMany();
    }

    return this.results;
  }

  protected async getCount(
    startCursor: string,
    endCursor: string
  ): Promise<any> {
    const totalCountQuery = this.stipLimitationsFromQuery(this.countQuery);

    const beforeCountQuery = totalCountQuery
      .clone()
      .select(
        `COUNT(DISTINCT(${this.tableName}.${this.cursorColumn})) as \"count\"`
      );
    const afterCountQuery = beforeCountQuery.clone();

    const beforeCountResult = await this.applyWhereConditionToQuery(
      beforeCountQuery,
      [
        `${this.tableName}.${this.cursorColumn} < :cursor`,
        { cursor: startCursor }
      ]
    ).getRawOne();

    const afterCountResult = await this.applyWhereConditionToQuery(
      afterCountQuery,
      [
        `${this.tableName}.${this.cursorColumn} > :cursor`,
        { cursor: endCursor }
      ]
    ).getRawOne();

    return {
      totalCount: await totalCountQuery.getCount(),
      // moreAfter: afterCountResult["count"],
      // moreBefore: beforeCountResult["count"],
      hasNextPage: Number(afterCountResult["count"]) > 0,
      hasPreviousPage: Number(beforeCountResult["count"]) > 0
    };
  }

  protected createEdges(results: TEntity[]): any {
    return results.map((result: TEntity) => ({
      node: result,
      cursor: result.id // TODO: get rid of this hard-code
    }));
  }

  protected applyWhereConditionToQuery(
    query: SelectQueryBuilder<TEntity>,
    condition: [string, Record<string, any>?]
  ): any {
    if (query.expressionMap.wheres && query.expressionMap.wheres.length) {
      query = query.andWhere(...condition);
    } else {
      query = query.where(...condition);
    }

    return query;
  }

  protected stipLimitationsFromQuery(query: SelectQueryBuilder<TEntity>): any {
    query.expressionMap.groupBys = [];
    query.expressionMap.offset = undefined;
    query.expressionMap.limit = undefined;
    query.expressionMap.skip = undefined;
    query.expressionMap.take = undefined;

    return query;
  }
}
