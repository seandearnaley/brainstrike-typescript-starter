import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "fragment CardParts on Card {\n  id\n  created\n  updated\n  label\n  number\n}": typeof types.CardPartsFragmentDoc,
    "fragment CategoryParts on Category {\n  id\n  name\n  created\n  updated\n}": typeof types.CategoryPartsFragmentDoc,
    "query GetCardWithCategories($id: ID) {\n  card(id: $id) {\n    ...CardParts\n    description\n    categories @connection(key: \"Categories\") {\n      ...CategoryParts\n    }\n  }\n}": typeof types.GetCardWithCategoriesDocument,
    "query GetCards($first: Int, $last: Int, $after: String, $before: String, $orderByColumn: String, $orderByDirection: DirectionEnum, $categoryId: ID) {\n  cards(\n    first: $first\n    last: $last\n    after: $after\n    before: $before\n    orderByColumn: $orderByColumn\n    orderByDirection: $orderByDirection\n    categoryId: $categoryId\n  ) @connection(key: \"CardConnection\") {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n      totalCount\n    }\n    edges {\n      cursor\n      node {\n        ...CardParts\n      }\n    }\n  }\n}": typeof types.GetCardsDocument,
    "query GetCategories {\n  categories {\n    ...CategoryParts\n  }\n}": typeof types.GetCategoriesDocument,
    "query GetCategoryNode($id: ID!, $first: Int, $last: Int, $after: String, $before: String, $orderByColumn: String, $orderByDirection: DirectionEnum) {\n  category: node(id: $id) {\n    __typename\n    ... on Node {\n      id\n      created\n      updated\n    }\n    ... on Category {\n      ...CategoryParts\n      cards(\n        first: $first\n        last: $last\n        after: $after\n        before: $before\n        orderByColumn: $orderByColumn\n        orderByDirection: $orderByDirection\n      ) {\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n          totalCount\n        }\n        edges {\n          cursor\n          node {\n            ...CardParts\n          }\n        }\n      }\n    }\n  }\n}": typeof types.GetCategoryNodeDocument,
    "query GetCategoryWithCards($id: ID, $first: Int, $last: Int, $after: String, $before: String, $orderByColumn: String, $orderByDirection: DirectionEnum) {\n  category(id: $id) {\n    ...CategoryParts\n    cards(\n      first: $first\n      last: $last\n      after: $after\n      before: $before\n      orderByColumn: $orderByColumn\n      orderByDirection: $orderByDirection\n    ) @connection(key: \"cards\") {\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n        totalCount\n      }\n      edges {\n        cursor\n        node {\n          ...CardParts\n        }\n      }\n    }\n  }\n}": typeof types.GetCategoryWithCardsDocument,
    "mutation removeCard($id: ID!) {\n  removeCard(id: $id) {\n    success\n    message\n    card {\n      ...CardParts\n      categories {\n        id\n      }\n    }\n  }\n}": typeof types.RemoveCardDocument,
    "mutation removeCategory($id: ID!) {\n  removeCategory(id: $id) {\n    success\n    message\n    category {\n      ...CategoryParts\n    }\n  }\n}": typeof types.RemoveCategoryDocument,
    "mutation updateCategoryName($id: ID!, $input: CategoryInput) {\n  updateCategory(id: $id, input: $input) {\n    success\n    message\n    category {\n      ...CategoryParts\n    }\n  }\n}": typeof types.UpdateCategoryNameDocument,
};
const documents: Documents = {
    "fragment CardParts on Card {\n  id\n  created\n  updated\n  label\n  number\n}": types.CardPartsFragmentDoc,
    "fragment CategoryParts on Category {\n  id\n  name\n  created\n  updated\n}": types.CategoryPartsFragmentDoc,
    "query GetCardWithCategories($id: ID) {\n  card(id: $id) {\n    ...CardParts\n    description\n    categories @connection(key: \"Categories\") {\n      ...CategoryParts\n    }\n  }\n}": types.GetCardWithCategoriesDocument,
    "query GetCards($first: Int, $last: Int, $after: String, $before: String, $orderByColumn: String, $orderByDirection: DirectionEnum, $categoryId: ID) {\n  cards(\n    first: $first\n    last: $last\n    after: $after\n    before: $before\n    orderByColumn: $orderByColumn\n    orderByDirection: $orderByDirection\n    categoryId: $categoryId\n  ) @connection(key: \"CardConnection\") {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n      totalCount\n    }\n    edges {\n      cursor\n      node {\n        ...CardParts\n      }\n    }\n  }\n}": types.GetCardsDocument,
    "query GetCategories {\n  categories {\n    ...CategoryParts\n  }\n}": types.GetCategoriesDocument,
    "query GetCategoryNode($id: ID!, $first: Int, $last: Int, $after: String, $before: String, $orderByColumn: String, $orderByDirection: DirectionEnum) {\n  category: node(id: $id) {\n    __typename\n    ... on Node {\n      id\n      created\n      updated\n    }\n    ... on Category {\n      ...CategoryParts\n      cards(\n        first: $first\n        last: $last\n        after: $after\n        before: $before\n        orderByColumn: $orderByColumn\n        orderByDirection: $orderByDirection\n      ) {\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n          totalCount\n        }\n        edges {\n          cursor\n          node {\n            ...CardParts\n          }\n        }\n      }\n    }\n  }\n}": types.GetCategoryNodeDocument,
    "query GetCategoryWithCards($id: ID, $first: Int, $last: Int, $after: String, $before: String, $orderByColumn: String, $orderByDirection: DirectionEnum) {\n  category(id: $id) {\n    ...CategoryParts\n    cards(\n      first: $first\n      last: $last\n      after: $after\n      before: $before\n      orderByColumn: $orderByColumn\n      orderByDirection: $orderByDirection\n    ) @connection(key: \"cards\") {\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n        totalCount\n      }\n      edges {\n        cursor\n        node {\n          ...CardParts\n        }\n      }\n    }\n  }\n}": types.GetCategoryWithCardsDocument,
    "mutation removeCard($id: ID!) {\n  removeCard(id: $id) {\n    success\n    message\n    card {\n      ...CardParts\n      categories {\n        id\n      }\n    }\n  }\n}": types.RemoveCardDocument,
    "mutation removeCategory($id: ID!) {\n  removeCategory(id: $id) {\n    success\n    message\n    category {\n      ...CategoryParts\n    }\n  }\n}": types.RemoveCategoryDocument,
    "mutation updateCategoryName($id: ID!, $input: CategoryInput) {\n  updateCategory(id: $id, input: $input) {\n    success\n    message\n    category {\n      ...CategoryParts\n    }\n  }\n}": types.UpdateCategoryNameDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment CardParts on Card {\n  id\n  created\n  updated\n  label\n  number\n}"): (typeof documents)["fragment CardParts on Card {\n  id\n  created\n  updated\n  label\n  number\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment CategoryParts on Category {\n  id\n  name\n  created\n  updated\n}"): (typeof documents)["fragment CategoryParts on Category {\n  id\n  name\n  created\n  updated\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetCardWithCategories($id: ID) {\n  card(id: $id) {\n    ...CardParts\n    description\n    categories @connection(key: \"Categories\") {\n      ...CategoryParts\n    }\n  }\n}"): (typeof documents)["query GetCardWithCategories($id: ID) {\n  card(id: $id) {\n    ...CardParts\n    description\n    categories @connection(key: \"Categories\") {\n      ...CategoryParts\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetCards($first: Int, $last: Int, $after: String, $before: String, $orderByColumn: String, $orderByDirection: DirectionEnum, $categoryId: ID) {\n  cards(\n    first: $first\n    last: $last\n    after: $after\n    before: $before\n    orderByColumn: $orderByColumn\n    orderByDirection: $orderByDirection\n    categoryId: $categoryId\n  ) @connection(key: \"CardConnection\") {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n      totalCount\n    }\n    edges {\n      cursor\n      node {\n        ...CardParts\n      }\n    }\n  }\n}"): (typeof documents)["query GetCards($first: Int, $last: Int, $after: String, $before: String, $orderByColumn: String, $orderByDirection: DirectionEnum, $categoryId: ID) {\n  cards(\n    first: $first\n    last: $last\n    after: $after\n    before: $before\n    orderByColumn: $orderByColumn\n    orderByDirection: $orderByDirection\n    categoryId: $categoryId\n  ) @connection(key: \"CardConnection\") {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n      totalCount\n    }\n    edges {\n      cursor\n      node {\n        ...CardParts\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetCategories {\n  categories {\n    ...CategoryParts\n  }\n}"): (typeof documents)["query GetCategories {\n  categories {\n    ...CategoryParts\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetCategoryNode($id: ID!, $first: Int, $last: Int, $after: String, $before: String, $orderByColumn: String, $orderByDirection: DirectionEnum) {\n  category: node(id: $id) {\n    __typename\n    ... on Node {\n      id\n      created\n      updated\n    }\n    ... on Category {\n      ...CategoryParts\n      cards(\n        first: $first\n        last: $last\n        after: $after\n        before: $before\n        orderByColumn: $orderByColumn\n        orderByDirection: $orderByDirection\n      ) {\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n          totalCount\n        }\n        edges {\n          cursor\n          node {\n            ...CardParts\n          }\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query GetCategoryNode($id: ID!, $first: Int, $last: Int, $after: String, $before: String, $orderByColumn: String, $orderByDirection: DirectionEnum) {\n  category: node(id: $id) {\n    __typename\n    ... on Node {\n      id\n      created\n      updated\n    }\n    ... on Category {\n      ...CategoryParts\n      cards(\n        first: $first\n        last: $last\n        after: $after\n        before: $before\n        orderByColumn: $orderByColumn\n        orderByDirection: $orderByDirection\n      ) {\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n          totalCount\n        }\n        edges {\n          cursor\n          node {\n            ...CardParts\n          }\n        }\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetCategoryWithCards($id: ID, $first: Int, $last: Int, $after: String, $before: String, $orderByColumn: String, $orderByDirection: DirectionEnum) {\n  category(id: $id) {\n    ...CategoryParts\n    cards(\n      first: $first\n      last: $last\n      after: $after\n      before: $before\n      orderByColumn: $orderByColumn\n      orderByDirection: $orderByDirection\n    ) @connection(key: \"cards\") {\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n        totalCount\n      }\n      edges {\n        cursor\n        node {\n          ...CardParts\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query GetCategoryWithCards($id: ID, $first: Int, $last: Int, $after: String, $before: String, $orderByColumn: String, $orderByDirection: DirectionEnum) {\n  category(id: $id) {\n    ...CategoryParts\n    cards(\n      first: $first\n      last: $last\n      after: $after\n      before: $before\n      orderByColumn: $orderByColumn\n      orderByDirection: $orderByDirection\n    ) @connection(key: \"cards\") {\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n        totalCount\n      }\n      edges {\n        cursor\n        node {\n          ...CardParts\n        }\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation removeCard($id: ID!) {\n  removeCard(id: $id) {\n    success\n    message\n    card {\n      ...CardParts\n      categories {\n        id\n      }\n    }\n  }\n}"): (typeof documents)["mutation removeCard($id: ID!) {\n  removeCard(id: $id) {\n    success\n    message\n    card {\n      ...CardParts\n      categories {\n        id\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation removeCategory($id: ID!) {\n  removeCategory(id: $id) {\n    success\n    message\n    category {\n      ...CategoryParts\n    }\n  }\n}"): (typeof documents)["mutation removeCategory($id: ID!) {\n  removeCategory(id: $id) {\n    success\n    message\n    category {\n      ...CategoryParts\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation updateCategoryName($id: ID!, $input: CategoryInput) {\n  updateCategory(id: $id, input: $input) {\n    success\n    message\n    category {\n      ...CategoryParts\n    }\n  }\n}"): (typeof documents)["mutation updateCategoryName($id: ID!, $input: CategoryInput) {\n  updateCategory(id: $id, input: $input) {\n    success\n    message\n    category {\n      ...CategoryParts\n    }\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;