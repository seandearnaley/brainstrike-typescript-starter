/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CardInput } from "./../../generated/globalTypes";

// ====================================================
// GraphQL mutation operation: addCard
// ====================================================

export interface addCard_addCard_card {
  __typename: "Card";
  created: any;
  description: string | null;
  id: string;
  label: string | null;
  number: number | null;
  updated: any | null;
}

export interface addCard_addCard {
  __typename: "CardsUpdatedResponse";
  success: boolean;
  message: string;
  card: addCard_addCard_card;
}

export interface addCard {
  addCard: addCard_addCard;
}

export interface addCardVariables {
  input: CardInput;
}
