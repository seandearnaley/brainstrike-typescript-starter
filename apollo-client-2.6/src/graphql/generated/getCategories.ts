/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCategories
// ====================================================

export interface getCategories_categories_children {
  __typename: "Category";
  id: string;
  name: string | null;
}

export interface getCategories_categories {
  __typename: "Category";
  id: string;
  name: string | null;
  parentId: string | null;
  created: any | null;
  updated: any | null;
  children: (getCategories_categories_children | null)[] | null;
}

export interface getCategories {
  categories: getCategories_categories[] | null;
}
