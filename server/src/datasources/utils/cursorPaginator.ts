import { Connection, SelectQueryBuilder } from "typeorm";

// TODO: fix anys
/* eslint-disable @typescript-eslint/no-explicit-any */

// const xp = await this.repos.cards.query(`,
// SELECT t1.*
// FROM (
//   SELECT *, ROW_NUMBER () OVER (ORDER BY id) FROM card
// ) as t1
// WHERE row_number < (
//   SELECT t2.row_number
//   FROM (
//     SELECT id, ROW_NUMBER () OVER (ORDER BY id) FROM card
//   ) as t2
//   WHERE id = '006b9343-9ed4-4a99-abf2-4f81fef4cdd2'
// ) AND row_number >= (
//   SELECT t3.row_number-5
//   FROM (
//     SELECT id, ROW_NUMBER () OVER (ORDER BY id) FROM card
//   ) as t3
//   WHERE id = '006b9343-9ed4-4a99-abf2-4f81fef4cdd2'
// )
// `);

export class CursorPaginatorArgs<Entity> {
  before?: Date;
  after?: Date;
  first?: number;
  last?: number;
  orderBy?: string;
}

/**
 * this will take a query and return relay style edges/nodes/pageInfo object,
 * NOTE: it's supposed to have a dynamic cursor column but having trouble implementing a generic dynamic index signature
 */
export class CursorPaginator<TEntity extends { id?: string; created?: Date }> {
  protected args: CursorPaginatorArgs<TEntity>;
  protected tableName: string;
  protected cursorColumn: string;
  protected results: TEntity[];

  constructor(
    connection: Partial<Connection>,
    args: CursorPaginatorArgs<TEntity>,
    tableName?: string,
    cursorColumn?: string
  ) {
    this.tableName = connection.driver.escape(tableName); // escapes invalid chars from tableName
    this.cursorColumn = connection.driver.escape(cursorColumn); // escapes invalid chars from cursorColumn
    this.args = args;
    // this.countQuery = query.clone();

    // NOTE: https://github.com/typeorm/typeorm/issues/4015

    // this.resultsQuery = query
    //   .select("t1.id")
    //   .addSelect(rowNumberOverString)
    //   .from((subQuery: any): any => {
    //     return subQuery
    //       .select("cards.*")
    //       .addSelect(rowNumberOverString)
    //       .from("card", "t2");
    //   }, "t1");
  }

  // protected applyWhereConditionToQuery(
  //   query: SelectQueryBuilder<TEntity>,
  //   condition: [string, Record<string, any>?]
  // ): any {
  //   if (query.expressionMap.wheres && query.expressionMap.wheres.length) {
  //     query = query.andWhere(...condition);
  //   } else {
  //     query = query.where(...condition);
  //   }

  //   return query;
  // }

  // public async getResults(): Promise<TEntity[]> {
  //   if (!this.results) {
  //     this.results = await this.resultsQuery.getMany();
  //   }

  //   return this.results;
  // }

  // public async execute(): Promise<any> {
  //   const results = await this.getResults();

  //   return results;
  // }
}

// TODO: fix anys
/* eslint-disable @typescript-eslint/no-explicit-any */

export class CursorPaginationArgs<Entity> {
  before?: Date;
  after?: Date;
  first?: number;
  last?: number;
  orderBy?: string;
}

/**
 * this will take a query and return relay style edges/nodes/pageInfo object, it's supposed to have a dynamic
 * cursor column but having trouble implementing a generic dynamic index signature
 */
export class CursorPagination<TEntity extends { id?: string; created?: Date }> {
  protected resultsQuery: SelectQueryBuilder<TEntity>;
  protected countQuery: SelectQueryBuilder<TEntity>;
  protected args: CursorPaginationArgs<TEntity>;
  protected tableName: string;
  protected cursorColumn: string;
  protected results: TEntity[];

  constructor(
    query: SelectQueryBuilder<TEntity>,
    args: CursorPaginationArgs<TEntity>,
    tableName?: string,
    cursorColumn?: string
  ) {
    this.tableName = query.escape(tableName);
    this.cursorColumn = query.escape(cursorColumn);
    this.args = args;

    let selectiveCondition: [string, Record<string, any>?] = [
      `` // TODO: must be a better way
    ];

    //ROW_NUMBER () OVER (ORDER BY id)
    // ${this.cursorColumn} >= 0
    //'00000000-0000-0000-0000-000000000000'

    //'00000000-0000-0000-0000-000000000000'

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
      // .orderBy({ ...args.sortOptions })
      .orderBy(`${this.tableName}.${this.cursorColumn}`, "ASC")
      .limit(args.first);
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
      hasNextPage: Number(afterCountResult["count"]) > 0,
      hasPreviousPage: Number(beforeCountResult["count"]) > 0
    };
  }

  protected createEdges(results: TEntity[]): any {
    return results.map((result: TEntity) => ({
      node: result,
      cursor: result.created.toISOString() // TODO: get rid of this hard-code
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
