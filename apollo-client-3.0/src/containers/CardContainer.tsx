import React, { useEffect, useCallback } from 'react';
import { useGetCardWithCategoriesLazyQuery } from '../generated/graphql';

interface CardContainerProps {
  selectedCard: string;
}

export const CardContainer: React.FC<CardContainerProps> = ({
  selectedCard,
}: CardContainerProps) => {
  const variables = {
    id: selectedCard,
  };

  const [getCard, { data, loading, error }] = useGetCardWithCategoriesLazyQuery(
    {
      variables,
    },
  );

  // const categoryData = useMemo(
  //   () =>
  //     data?.card?._categories.map(({ id, name, created, updated }) => ({
  //       id,
  //       name,
  //       created,
  //       updated,
  //     })) ?? [],
  //   [data],
  // );

  const memoizedGetCard = useCallback(getCard, [getCard]);

  useEffect(() => {
    if (selectedCard !== '') memoizedGetCard();
  }, [memoizedGetCard, selectedCard]);

  if (!data?.card) return <p>Pick Card</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;

  return (
    <div>
      <h1>{data.card?.number}</h1>
      <div>Selected: {variables.id}</div>
      <div>Label: {data.card?.label}</div>
      <div>Description: {data.card?.description}</div>
    </div>
  );
};
