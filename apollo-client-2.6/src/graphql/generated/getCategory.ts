/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCategory
// ====================================================

export interface getCategory_category_children {
  __typename: "Category";
  id: string;
}

export interface getCategory_category {
  __typename: "Category";
  id: string;
  name: string | null;
  children: (getCategory_category_children | null)[] | null;
}

export interface getCategory {
  category: getCategory_category | null;
}

export interface getCategoryVariables {
  id: string;
}
