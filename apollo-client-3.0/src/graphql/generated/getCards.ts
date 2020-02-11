/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { DirectionEnum } from "./../../../generated/globalTypes";

// ====================================================
// GraphQL query operation: getCards
// ====================================================

export interface getCards_cards_pageInfo {
  __typename: "PageInfo";
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
  totalCount: number | null;
}

export interface getCards_cards_edges_node {
  __typename: "Card";
  id: string;
  created: any;
  updated: any | null;
  label: string | null;
  number: number | null;
}

export interface getCards_cards_edges {
  __typename: "CardEdge";
  cursor: string;
  node: getCards_cards_edges_node;
}

export interface getCards_cards {
  __typename: "CardConnection";
  pageInfo: getCards_cards_pageInfo;
  edges: getCards_cards_edges[];
}

export interface getCards {
  cards: getCards_cards;
}

export interface getCardsVariables {
  first?: number | null;
  last?: number | null;
  after?: string | null;
  before?: string | null;
  orderByColumn?: string | null;
  orderByDirection?: DirectionEnum | null;
  categoryId?: string | null;
}
