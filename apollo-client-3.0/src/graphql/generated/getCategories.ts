/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCategories
// ====================================================

export interface getCategories_categories {
  __typename: "Category";
  id: string;
  created: any;
  updated: any | null;
  name: string | null;
  parentId: string | null;
}

export interface getCategories {
  categories: getCategories_categories[] | null;
}
