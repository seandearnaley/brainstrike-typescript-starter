import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import { ApolloContext } from "../types/context";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Time: any;
};

export type Card = Node & {
  __typename?: "Card";
  categories: Array<Category>;
  created: Scalars["DateTime"];
  description?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  label?: Maybe<Scalars["String"]>;
  number?: Maybe<Scalars["Int"]>;
  updated?: Maybe<Scalars["DateTime"]>;
};

export type CardConnection = {
  __typename?: "CardConnection";
  edges: Array<CardEdge>;
  pageInfo: PageInfo;
};

export type CardEdge = {
  __typename?: "CardEdge";
  cursor: Scalars["String"];
  node: Card;
};

export type CardInput = {
  categoryId?: InputMaybe<Scalars["ID"]>;
  description?: InputMaybe<Scalars["String"]>;
  label?: InputMaybe<Scalars["String"]>;
  number?: InputMaybe<Scalars["Int"]>;
};

export type CardsUpdatedResponse = {
  __typename?: "CardsUpdatedResponse";
  card: Card;
  message: Scalars["String"];
  success: Scalars["Boolean"];
};

export type Category = Node & {
  __typename?: "Category";
  cards: CardConnection;
  created: Scalars["DateTime"];
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  updated?: Maybe<Scalars["DateTime"]>;
};

export type CategoryCardsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  orderByColumn?: InputMaybe<Scalars["String"]>;
  orderByDirection?: InputMaybe<DirectionEnum>;
};

export type CategoryInput = {
  name?: InputMaybe<Scalars["String"]>;
};

export type CategoryUpdatedResponse = {
  __typename?: "CategoryUpdatedResponse";
  category: Category;
  message: Scalars["String"];
  success: Scalars["Boolean"];
};

export enum DirectionEnum {
  Asc = "ASC",
  Desc = "DESC",
}

export type Mutation = {
  __typename?: "Mutation";
  addCard: CardsUpdatedResponse;
  addCategory: CategoryUpdatedResponse;
  removeCard: CardsUpdatedResponse;
  removeCategory: CategoryUpdatedResponse;
  updateCard: CardsUpdatedResponse;
  updateCategory: CategoryUpdatedResponse;
};

export type MutationAddCardArgs = {
  input?: InputMaybe<CardInput>;
};

export type MutationAddCategoryArgs = {
  input?: InputMaybe<CategoryInput>;
};

export type MutationRemoveCardArgs = {
  id: Scalars["ID"];
};

export type MutationRemoveCategoryArgs = {
  id: Scalars["ID"];
};

export type MutationUpdateCardArgs = {
  id: Scalars["ID"];
  input?: InputMaybe<CardInput>;
};

export type MutationUpdateCategoryArgs = {
  id: Scalars["ID"];
  input?: InputMaybe<CategoryInput>;
};

export type Node = {
  created: Scalars["DateTime"];
  id: Scalars["ID"];
  updated?: Maybe<Scalars["DateTime"]>;
};

export type PageInfo = {
  __typename?: "PageInfo";
  endCursor?: Maybe<Scalars["String"]>;
  hasNextPage: Scalars["Boolean"];
  hasPreviousPage: Scalars["Boolean"];
  startCursor?: Maybe<Scalars["String"]>;
  totalCount: Scalars["Int"];
};

export type Query = {
  __typename?: "Query";
  card: Card;
  cards: CardConnection;
  categories: Array<Category>;
  category: Category;
  node: Node;
};

export type QueryCardArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryCardsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  categoryId?: InputMaybe<Scalars["ID"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
  orderByColumn?: InputMaybe<Scalars["String"]>;
  orderByDirection?: InputMaybe<DirectionEnum>;
};

export type QueryCategoriesArgs = {
  cardIds?: InputMaybe<Scalars["String"]>;
  orderByColumn?: InputMaybe<Scalars["String"]>;
  orderByDirection?: InputMaybe<DirectionEnum>;
};

export type QueryCategoryArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryNodeArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Card: ResolverTypeWrapper<Card>;
  CardConnection: ResolverTypeWrapper<CardConnection>;
  CardEdge: ResolverTypeWrapper<CardEdge>;
  CardInput: CardInput;
  CardsUpdatedResponse: ResolverTypeWrapper<CardsUpdatedResponse>;
  Category: ResolverTypeWrapper<Category>;
  CategoryInput: CategoryInput;
  CategoryUpdatedResponse: ResolverTypeWrapper<CategoryUpdatedResponse>;
  Date: ResolverTypeWrapper<Scalars["Date"]>;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]>;
  DirectionEnum: DirectionEnum;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Mutation: ResolverTypeWrapper<{}>;
  Node: ResolversTypes["Card"] | ResolversTypes["Category"];
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Time: ResolverTypeWrapper<Scalars["Time"]>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars["Boolean"];
  Card: Card;
  CardConnection: CardConnection;
  CardEdge: CardEdge;
  CardInput: CardInput;
  CardsUpdatedResponse: CardsUpdatedResponse;
  Category: Category;
  CategoryInput: CategoryInput;
  CategoryUpdatedResponse: CategoryUpdatedResponse;
  Date: Scalars["Date"];
  DateTime: Scalars["DateTime"];
  ID: Scalars["ID"];
  Int: Scalars["Int"];
  Mutation: {};
  Node: ResolversParentTypes["Card"] | ResolversParentTypes["Category"];
  PageInfo: PageInfo;
  Query: {};
  String: Scalars["String"];
  Time: Scalars["Time"];
}>;

export type CardResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes["Card"] = ResolversParentTypes["Card"]
> = ResolversObject<{
  categories?: Resolver<
    Array<ResolversTypes["Category"]>,
    ParentType,
    ContextType
  >;
  created?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  number?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  updated?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CardConnectionResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes["CardConnection"] = ResolversParentTypes["CardConnection"]
> = ResolversObject<{
  edges?: Resolver<Array<ResolversTypes["CardEdge"]>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CardEdgeResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes["CardEdge"] = ResolversParentTypes["CardEdge"]
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node?: Resolver<ResolversTypes["Card"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CardsUpdatedResponseResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes["CardsUpdatedResponse"] = ResolversParentTypes["CardsUpdatedResponse"]
> = ResolversObject<{
  card?: Resolver<ResolversTypes["Card"], ParentType, ContextType>;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoryResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes["Category"] = ResolversParentTypes["Category"]
> = ResolversObject<{
  cards?: Resolver<
    ResolversTypes["CardConnection"],
    ParentType,
    ContextType,
    Partial<CategoryCardsArgs>
  >;
  created?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  updated?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoryUpdatedResponseResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes["CategoryUpdatedResponse"] = ResolversParentTypes["CategoryUpdatedResponse"]
> = ResolversObject<{
  category?: Resolver<ResolversTypes["Category"], ParentType, ContextType>;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export type MutationResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = ResolversObject<{
  addCard?: Resolver<
    ResolversTypes["CardsUpdatedResponse"],
    ParentType,
    ContextType,
    Partial<MutationAddCardArgs>
  >;
  addCategory?: Resolver<
    ResolversTypes["CategoryUpdatedResponse"],
    ParentType,
    ContextType,
    Partial<MutationAddCategoryArgs>
  >;
  removeCard?: Resolver<
    ResolversTypes["CardsUpdatedResponse"],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveCardArgs, "id">
  >;
  removeCategory?: Resolver<
    ResolversTypes["CategoryUpdatedResponse"],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveCategoryArgs, "id">
  >;
  updateCard?: Resolver<
    ResolversTypes["CardsUpdatedResponse"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCardArgs, "id">
  >;
  updateCategory?: Resolver<
    ResolversTypes["CategoryUpdatedResponse"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCategoryArgs, "id">
  >;
}>;

export type NodeResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes["Node"] = ResolversParentTypes["Node"]
> = ResolversObject<{
  __resolveType?: TypeResolveFn<"Card" | "Category", ParentType, ContextType>;
  created?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  updated?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
}>;

export type PageInfoResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes["PageInfo"] = ResolversParentTypes["PageInfo"]
> = ResolversObject<{
  endCursor?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  hasNextPage?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  hasPreviousPage?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  startCursor?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  totalCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = ResolversObject<{
  card?: Resolver<
    ResolversTypes["Card"],
    ParentType,
    ContextType,
    Partial<QueryCardArgs>
  >;
  cards?: Resolver<
    ResolversTypes["CardConnection"],
    ParentType,
    ContextType,
    Partial<QueryCardsArgs>
  >;
  categories?: Resolver<
    Array<ResolversTypes["Category"]>,
    ParentType,
    ContextType,
    Partial<QueryCategoriesArgs>
  >;
  category?: Resolver<
    ResolversTypes["Category"],
    ParentType,
    ContextType,
    Partial<QueryCategoryArgs>
  >;
  node?: Resolver<
    ResolversTypes["Node"],
    ParentType,
    ContextType,
    Partial<QueryNodeArgs>
  >;
}>;

export interface TimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Time"], any> {
  name: "Time";
}

export type Resolvers<ContextType = ApolloContext> = ResolversObject<{
  Card?: CardResolvers<ContextType>;
  CardConnection?: CardConnectionResolvers<ContextType>;
  CardEdge?: CardEdgeResolvers<ContextType>;
  CardsUpdatedResponse?: CardsUpdatedResponseResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  CategoryUpdatedResponse?: CategoryUpdatedResponseResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Time?: GraphQLScalarType;
}>;
