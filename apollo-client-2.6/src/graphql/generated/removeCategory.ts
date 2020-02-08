/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: removeCategory
// ====================================================

export interface removeCategory_removeCategory_category {
  __typename: "Category";
  id: string;
  name: string | null;
}

export interface removeCategory_removeCategory {
  __typename: "CategoryUpdatedResponse";
  success: boolean;
  message: string;
  category: removeCategory_removeCategory_category | null;
}

export interface removeCategory {
  removeCategory: removeCategory_removeCategory;
}

export interface removeCategoryVariables {
  id: string;
}
