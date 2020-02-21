import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig
} from "graphql";
import { ApolloContext } from "../types/context";
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Date: any;
  Time: any;
};

export type Card = Node & {
  __typename?: "Card";
  id: Scalars["ID"];
  number?: Maybe<Scalars["Int"]>;
  label?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  created: Scalars["DateTime"];
  updated?: Maybe<Scalars["DateTime"]>;
  categories: Array<Category>;
};

export type CardConnection = {
  __typename?: "CardConnection";
  pageInfo: PageInfo;
  edges: Array<CardEdge>;
};

export type CardEdge = {
  __typename?: "CardEdge";
  cursor: Scalars["String"];
  node: Card;
};

export type CardInput = {
  number?: Maybe<Scalars["Int"]>;
  label?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  categoryId?: Maybe<Scalars["ID"]>;
};

export type CardsUpdatedResponse = {
  __typename?: "CardsUpdatedResponse";
  success: Scalars["Boolean"];
  message: Scalars["String"];
  card: Card;
};

export type Category = Node & {
  __typename?: "Category";
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  updated?: Maybe<Scalars["DateTime"]>;
  created: Scalars["DateTime"];
  cards: CardConnection;
};

export type CategoryCardsArgs = {
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  orderByColumn?: Maybe<Scalars["String"]>;
  orderByDirection?: Maybe<DirectionEnum>;
};

export type CategoryInput = {
  name?: Maybe<Scalars["String"]>;
};

export type CategoryUpdatedResponse = {
  __typename?: "CategoryUpdatedResponse";
  success: Scalars["Boolean"];
  message: Scalars["String"];
  category: Category;
};

export enum DirectionEnum {
  Asc = "ASC",
  Desc = "DESC"
}

export type Mutation = {
  __typename?: "Mutation";
  addCard: CardsUpdatedResponse;
  updateCard: CardsUpdatedResponse;
  removeCard: CardsUpdatedResponse;
  addCategory: CategoryUpdatedResponse;
  updateCategory: CategoryUpdatedResponse;
  removeCategory: CategoryUpdatedResponse;
};

export type MutationAddCardArgs = {
  input?: Maybe<CardInput>;
};

export type MutationUpdateCardArgs = {
  id: Scalars["ID"];
  input?: Maybe<CardInput>;
};

export type MutationRemoveCardArgs = {
  id: Scalars["ID"];
};

export type MutationAddCategoryArgs = {
  input?: Maybe<CategoryInput>;
};

export type MutationUpdateCategoryArgs = {
  id: Scalars["ID"];
  input?: Maybe<CategoryInput>;
};

export type MutationRemoveCategoryArgs = {
  id: Scalars["ID"];
};

export type Node = {
  id: Scalars["ID"];
  created: Scalars["DateTime"];
  updated?: Maybe<Scalars["DateTime"]>;
};

export type PageInfo = {
  __typename?: "PageInfo";
  hasNextPage: Scalars["Boolean"];
  hasPreviousPage: Scalars["Boolean"];
  startCursor?: Maybe<Scalars["String"]>;
  endCursor?: Maybe<Scalars["String"]>;
  totalCount: Scalars["Int"];
};

export type Query = {
  __typename?: "Query";
  cards: CardConnection;
  card: Card;
  categories: Array<Category>;
  category: Category;
  node: Node;
};

export type QueryCardsArgs = {
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  orderByColumn?: Maybe<Scalars["String"]>;
  orderByDirection?: Maybe<DirectionEnum>;
  categoryId?: Maybe<Scalars["ID"]>;
};

export type QueryCardArgs = {
  id?: Maybe<Scalars["ID"]>;
};

export type QueryCategoriesArgs = {
  cardIds?: Maybe<Scalars["String"]>;
  orderByColumn?: Maybe<Scalars["String"]>;
  orderByDirection?: Maybe<DirectionEnum>;
};

export type QueryCategoryArgs = {
  id?: Maybe<Scalars["ID"]>;
};

export type QueryNodeArgs = {
  id?: Maybe<Scalars["ID"]>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type Resolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

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
) => Maybe<TTypes>;

export type isTypeOfResolverFn<T = {}> = (
  obj: T,
  info: GraphQLResolveInfo
) => boolean;

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
  Query: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  DirectionEnum: DirectionEnum;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  CardConnection: ResolverTypeWrapper<CardConnection>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  CardEdge: ResolverTypeWrapper<CardEdge>;
  Card: ResolverTypeWrapper<Card>;
  Node: ResolverTypeWrapper<Node>;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]>;
  Category: ResolverTypeWrapper<Category>;
  Mutation: ResolverTypeWrapper<{}>;
  CardInput: CardInput;
  CardsUpdatedResponse: ResolverTypeWrapper<CardsUpdatedResponse>;
  CategoryInput: CategoryInput;
  CategoryUpdatedResponse: ResolverTypeWrapper<CategoryUpdatedResponse>;
  Date: ResolverTypeWrapper<Scalars["Date"]>;
  Time: ResolverTypeWrapper<Scalars["Time"]>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  Int: Scalars["Int"];
  String: Scalars["String"];
  DirectionEnum: DirectionEnum;
  ID: Scalars["ID"];
  CardConnection: CardConnection;
  PageInfo: PageInfo;
  Boolean: Scalars["Boolean"];
  CardEdge: CardEdge;
  Card: Card;
  Node: Node;
  DateTime: Scalars["DateTime"];
  Category: Category;
  Mutation: {};
  CardInput: CardInput;
  CardsUpdatedResponse: CardsUpdatedResponse;
  CategoryInput: CategoryInput;
  CategoryUpdatedResponse: CategoryUpdatedResponse;
  Date: Scalars["Date"];
  Time: Scalars["Time"];
}>;

export type CardResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes["Card"] = ResolversParentTypes["Card"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  number?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  created?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  updated?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  categories?: Resolver<
    Array<ResolversTypes["Category"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CardConnectionResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes["CardConnection"] = ResolversParentTypes["CardConnection"]
> = ResolversObject<{
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  edges?: Resolver<Array<ResolversTypes["CardEdge"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CardEdgeResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes["CardEdge"] = ResolversParentTypes["CardEdge"]
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node?: Resolver<ResolversTypes["Card"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CardsUpdatedResponseResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes["CardsUpdatedResponse"] = ResolversParentTypes["CardsUpdatedResponse"]
> = ResolversObject<{
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  card?: Resolver<ResolversTypes["Card"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CategoryResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes["Category"] = ResolversParentTypes["Category"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  updated?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  created?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  cards?: Resolver<
    ResolversTypes["CardConnection"],
    ParentType,
    ContextType,
    CategoryCardsArgs
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type CategoryUpdatedResponseResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes["CategoryUpdatedResponse"] = ResolversParentTypes["CategoryUpdatedResponse"]
> = ResolversObject<{
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  category?: Resolver<ResolversTypes["Category"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
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
    MutationAddCardArgs
  >;
  updateCard?: Resolver<
    ResolversTypes["CardsUpdatedResponse"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCardArgs, "id">
  >;
  removeCard?: Resolver<
    ResolversTypes["CardsUpdatedResponse"],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveCardArgs, "id">
  >;
  addCategory?: Resolver<
    ResolversTypes["CategoryUpdatedResponse"],
    ParentType,
    ContextType,
    MutationAddCategoryArgs
  >;
  updateCategory?: Resolver<
    ResolversTypes["CategoryUpdatedResponse"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCategoryArgs, "id">
  >;
  removeCategory?: Resolver<
    ResolversTypes["CategoryUpdatedResponse"],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveCategoryArgs, "id">
  >;
}>;

export type NodeResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes["Node"] = ResolversParentTypes["Node"]
> = ResolversObject<{
  __resolveType?: TypeResolveFn<"Card" | "Category", ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  created?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
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
  endCursor?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  totalCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
}>;

export type QueryResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = ResolversObject<{
  cards?: Resolver<
    ResolversTypes["CardConnection"],
    ParentType,
    ContextType,
    QueryCardsArgs
  >;
  card?: Resolver<
    ResolversTypes["Card"],
    ParentType,
    ContextType,
    QueryCardArgs
  >;
  categories?: Resolver<
    Array<ResolversTypes["Category"]>,
    ParentType,
    ContextType,
    QueryCategoriesArgs
  >;
  category?: Resolver<
    ResolversTypes["Category"],
    ParentType,
    ContextType,
    QueryCategoryArgs
  >;
  node?: Resolver<
    ResolversTypes["Node"],
    ParentType,
    ContextType,
    QueryNodeArgs
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
  Node?: NodeResolvers;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Time?: GraphQLScalarType;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = ApolloContext> = Resolvers<ContextType>;
