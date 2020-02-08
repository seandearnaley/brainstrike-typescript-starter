/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: removeCard
// ====================================================

export interface removeCard_removeCard {
  __typename: "CardsUpdatedResponse";
  success: boolean;
  message: string;
}

export interface removeCard {
  removeCard: removeCard_removeCard;
}

export interface removeCardVariables {
  id: string;
}
