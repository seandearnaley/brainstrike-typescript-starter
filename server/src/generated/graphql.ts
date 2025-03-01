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
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: Date; output: Date };
  DateTime: { input: Date; output: Date };
  Time: { input: string; output: string };
};

export type Card = Node & {
  __typename?: "Card";
  categories: Array<Category>;
  created: Scalars["DateTime"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  label?: Maybe<Scalars["String"]["output"]>;
  number?: Maybe<Scalars["Int"]["output"]>;
  updated?: Maybe<Scalars["DateTime"]["output"]>;
};

export type CardConnection = {
  __typename?: "CardConnection";
  edges: Array<CardEdge>;
  pageInfo: PageInfo;
};

export type CardEdge = {
  __typename?: "CardEdge";
  cursor: Scalars["String"]["output"];
  node: Card;
};

export type CardInput = {
  categoryId?: InputMaybe<Scalars["ID"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  label?: InputMaybe<Scalars["String"]["input"]>;
  number?: InputMaybe<Scalars["Int"]["input"]>;
};

export type CardsUpdatedResponse = {
  __typename?: "CardsUpdatedResponse";
  card: Card;
  message: Scalars["String"]["output"];
  success: Scalars["Boolean"]["output"];
};

export type Category = Node & {
  __typename?: "Category";
  cards: CardConnection;
  children: Array<Category>;
  created: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  parent?: Maybe<Category>;
  updated?: Maybe<Scalars["DateTime"]["output"]>;
};

export type CategoryCardsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  orderByColumn?: InputMaybe<Scalars["String"]["input"]>;
  orderByDirection?: InputMaybe<DirectionEnum>;
};

export type CategoryInput = {
  name: Scalars["String"]["input"];
  parentId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type CategoryUpdatedResponse = {
  __typename?: "CategoryUpdatedResponse";
  category: Category;
  message: Scalars["String"]["output"];
  success: Scalars["Boolean"]["output"];
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
  id: Scalars["ID"]["input"];
};

export type MutationRemoveCategoryArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationUpdateCardArgs = {
  id: Scalars["ID"]["input"];
  input?: InputMaybe<CardInput>;
};

export type MutationUpdateCategoryArgs = {
  id: Scalars["ID"]["input"];
  input?: InputMaybe<CategoryInput>;
};

export type Node = {
  created: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  updated?: Maybe<Scalars["DateTime"]["output"]>;
};

export type PageInfo = {
  __typename?: "PageInfo";
  endCursor?: Maybe<Scalars["String"]["output"]>;
  hasNextPage: Scalars["Boolean"]["output"];
  hasPreviousPage: Scalars["Boolean"]["output"];
  startCursor?: Maybe<Scalars["String"]["output"]>;
  totalCount: Scalars["Int"]["output"];
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
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryCardsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  categoryId?: InputMaybe<Scalars["ID"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  orderByColumn?: InputMaybe<Scalars["String"]["input"]>;
  orderByDirection?: InputMaybe<DirectionEnum>;
};

export type QueryCategoriesArgs = {
  cardIds?: InputMaybe<Scalars["String"]["input"]>;
  orderByColumn?: InputMaybe<Scalars["String"]["input"]>;
  orderByDirection?: InputMaybe<DirectionEnum>;
};

export type QueryCategoryArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryNodeArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
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
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> =
  ResolversObject<{
    Node: Card | Category;
  }>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  Card: ResolverTypeWrapper<Card>;
  CardConnection: ResolverTypeWrapper<CardConnection>;
  CardEdge: ResolverTypeWrapper<CardEdge>;
  CardInput: CardInput;
  CardsUpdatedResponse: ResolverTypeWrapper<CardsUpdatedResponse>;
  Category: ResolverTypeWrapper<Category>;
  CategoryInput: CategoryInput;
  CategoryUpdatedResponse: ResolverTypeWrapper<CategoryUpdatedResponse>;
  Date: ResolverTypeWrapper<Scalars["Date"]["output"]>;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]["output"]>;
  DirectionEnum: DirectionEnum;
  ID: ResolverTypeWrapper<Scalars["ID"]["output"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]["output"]>;
  Mutation: ResolverTypeWrapper<{}>;
  Node: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>["Node"]>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  Time: ResolverTypeWrapper<Scalars["Time"]["output"]>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars["Boolean"]["output"];
  Card: Card;
  CardConnection: CardConnection;
  CardEdge: CardEdge;
  CardInput: CardInput;
  CardsUpdatedResponse: CardsUpdatedResponse;
  Category: Category;
  CategoryInput: CategoryInput;
  CategoryUpdatedResponse: CategoryUpdatedResponse;
  Date: Scalars["Date"]["output"];
  DateTime: Scalars["DateTime"]["output"];
  ID: Scalars["ID"]["output"];
  Int: Scalars["Int"]["output"];
  Mutation: {};
  Node: ResolversInterfaceTypes<ResolversParentTypes>["Node"];
  PageInfo: PageInfo;
  Query: {};
  String: Scalars["String"]["output"];
  Time: Scalars["Time"]["output"];
}>;

export type CardResolvers<
  ContextType = ApolloContext,
  ParentType extends
    ResolversParentTypes["Card"] = ResolversParentTypes["Card"],
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
  ParentType extends
    ResolversParentTypes["CardConnection"] = ResolversParentTypes["CardConnection"],
> = ResolversObject<{
  edges?: Resolver<Array<ResolversTypes["CardEdge"]>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CardEdgeResolvers<
  ContextType = ApolloContext,
  ParentType extends
    ResolversParentTypes["CardEdge"] = ResolversParentTypes["CardEdge"],
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node?: Resolver<ResolversTypes["Card"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CardsUpdatedResponseResolvers<
  ContextType = ApolloContext,
  ParentType extends
    ResolversParentTypes["CardsUpdatedResponse"] = ResolversParentTypes["CardsUpdatedResponse"],
> = ResolversObject<{
  card?: Resolver<ResolversTypes["Card"], ParentType, ContextType>;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoryResolvers<
  ContextType = ApolloContext,
  ParentType extends
    ResolversParentTypes["Category"] = ResolversParentTypes["Category"],
> = ResolversObject<{
  cards?: Resolver<
    ResolversTypes["CardConnection"],
    ParentType,
    ContextType,
    Partial<CategoryCardsArgs>
  >;
  children?: Resolver<
    Array<ResolversTypes["Category"]>,
    ParentType,
    ContextType
  >;
  created?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes["Category"]>, ParentType, ContextType>;
  updated?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoryUpdatedResponseResolvers<
  ContextType = ApolloContext,
  ParentType extends
    ResolversParentTypes["CategoryUpdatedResponse"] = ResolversParentTypes["CategoryUpdatedResponse"],
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
  ParentType extends
    ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
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
  ParentType extends
    ResolversParentTypes["Node"] = ResolversParentTypes["Node"],
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
  ParentType extends
    ResolversParentTypes["PageInfo"] = ResolversParentTypes["PageInfo"],
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
  ParentType extends
    ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
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
