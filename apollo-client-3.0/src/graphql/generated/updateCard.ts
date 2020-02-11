/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CardInput } from "./../../generated/globalTypes";

// ====================================================
// GraphQL mutation operation: updateCard
// ====================================================

export interface updateCard_updateCard_card {
  __typename: "Card";
  id: string;
  number: number | null;
  label: string | null;
  description: string | null;
}

export interface updateCard_updateCard {
  __typename: "CardsUpdatedResponse";
  success: boolean;
  message: string;
  card: updateCard_updateCard_card;
}

export interface updateCard {
  updateCard: updateCard_updateCard;
}

export interface updateCardVariables {
  id: string;
  input: CardInput;
}
