/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CategoryInput } from "./../../generated/globalTypes";

// ====================================================
// GraphQL mutation operation: addCategory
// ====================================================

export interface addCategory_addCategory_category {
  __typename: "Category";
  id: string;
  name: string | null;
}

export interface addCategory_addCategory {
  __typename: "CategoryUpdatedResponse";
  success: boolean;
  message: string;
  category: addCategory_addCategory_category | null;
}

export interface addCategory {
  addCategory: addCategory_addCategory;
}

export interface addCategoryVariables {
  input: CategoryInput;
}
