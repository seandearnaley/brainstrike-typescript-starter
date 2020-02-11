/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { DirectionEnum } from "./../../../generated/globalTypes";

// ====================================================
// GraphQL query operation: getCategory
// ====================================================

export interface getCategory_category_Card {
  __typename: "Card";
  id: string;
  created: any;
  updated: any | null;
}

export interface getCategory_category_Category__cards_pageInfo {
  __typename: "PageInfo";
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
  totalCount: number | null;
}

export interface getCategory_category_Category__cards_edges_node {
  __typename: "Card";
  id: string;
  label: string | null;
  number: number | null;
  created: any;
  updated: any | null;
}

export interface getCategory_category_Category__cards_edges {
  __typename: "CardEdge";
  cursor: string;
  node: getCategory_category_Category__cards_edges_node;
}

export interface getCategory_category_Category__cards {
  __typename: "CardConnection";
  pageInfo: getCategory_category_Category__cards_pageInfo;
  edges: getCategory_category_Category__cards_edges[];
}

export interface getCategory_category_Category {
  __typename: "Category";
  id: string;
  created: any;
  updated: any | null;
  name: string | null;
  parentId: string | null;
  _cards: getCategory_category_Category__cards | null;
}

export type getCategory_category = getCategory_category_Card | getCategory_category_Category;

export interface getCategory {
  category: getCategory_category | null;
}

export interface getCategoryVariables {
  id: string;
  first?: number | null;
  last?: number | null;
  after?: string | null;
  before?: string | null;
  orderByColumn?: string | null;
  orderByDirection?: DirectionEnum | null;
}
