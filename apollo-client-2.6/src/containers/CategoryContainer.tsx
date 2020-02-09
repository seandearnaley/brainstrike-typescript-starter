import React, { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import * as GetCategoryTypes from '../graphql/generated/getCategories';

import * as GQL from '../graphql/gql';
import { CategorySelector } from '../components/CategorySelector';

export const CategoryContainer: React.FC = () => {
  const { data, loading, error } = useQuery<GetCategoryTypes.getCategories>(
    GQL.GET_CARD_CATEGORIES,
  );

  const categoryData = useMemo(
    () =>
      data?.categories?.map(({ id, name, created, updated }) => ({
        id,
        name,
        created,
        updated,
      })) ?? [],
    [data],
  );

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>ERROR</p>;

  return <CategorySelector data={categoryData}></CategorySelector>;
};
