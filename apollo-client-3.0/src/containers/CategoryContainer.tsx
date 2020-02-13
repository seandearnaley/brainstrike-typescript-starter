import React, { useMemo, useEffect, useCallback, useState } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { ApolloQueryResult } from '@apollo/client';
import {
  useGetCategoryWithCardsLazyQuery,
  GetCategoryWithCardsQuery,
  DirectionEnum,
} from '../generated/graphql';
import { CardTable } from '../components/CardTable';
import { cx, css } from 'emotion';

interface CategoryContainerProps {
  selectedCategory: string;
  onSelectCard: (id: string) => void;
}

export const CategoryContainer: React.FC<CategoryContainerProps> = ({
  selectedCategory,
  onSelectCard,
}: CategoryContainerProps) => {
  const variables = {
    first: 5,
    orderByColumn: 'number',
    orderByDirection: DirectionEnum.Asc,
    id: selectedCategory,
  };

  const [categoryEditDisabled, setCategoryEditDisabled] = useState(true);

  const [
    getCat,
    { data, loading, error, fetchMore },
  ] = useGetCategoryWithCardsLazyQuery({
    variables,
  });

  const cardData = useMemo(
    () =>
      data?.category?._cards?.edges.map(
        ({ node: { id, number, label, created, updated } }) => ({
          id,
          number,
          label,
          created,
          updated,
        }),
      ) ?? [],
    [data],
  );

  const memoizedGetCat = useCallback(getCat, [getCat]);

  useEffect(() => {
    if (selectedCategory !== '') memoizedGetCat();
  }, [memoizedGetCat, selectedCategory]);

  const getMoreData = (): Promise<ApolloQueryResult<
    GetCategoryWithCardsQuery
  >> =>
    fetchMore({
      variables: {
        ...variables,
        after: data?.category?._cards?.pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;

        const newEdges = fetchMoreResult.category?._cards?.edges;
        const pageInfo = fetchMoreResult.category?._cards?.pageInfo;

        return newEdges?.length && previousResult.category && pageInfo
          ? {
              // Put the new cards at the end of the list and update `pageInfo`
              // so we have the new `endCursor` and `hasNextPage` values
              category: {
                ...previousResult.category,
                _cards: {
                  edges: [
                    ...(previousResult.category?._cards?.edges ?? []),
                    ...newEdges,
                  ],
                  pageInfo,
                },
              },
            }
          : previousResult;
      },
    });

  const handleChange = (evt: ContentEditableEvent) => {
    // this.setState({ html: evt.target.value });
    console.log(evt.target.value);
  };

  if (!data?.category) return <p>Pick Category</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;

  return (
    <div>
      <div>
        <ContentEditable
          html={data.category?.name ?? ''} // innerHTML of the editable div
          disabled={categoryEditDisabled} // use true to disable edition
          onChange={handleChange} // handle innerHTML change
          className={cx({
            [css`
              display: inline-block;
              font-size: 2em;
              margin-block-start: 0.67em;
              margin-block-end: 0.67em;
              margin-inline-start: 0px;
              margin-inline-end: 0px;
              font-weight: bold;
              margin-right: 10px;
            `]: true,
            [css`
              background-color: green;
            `]: !categoryEditDisabled,
          })}
          tagName="span"
        />
        <button onClick={() => setCategoryEditDisabled(false)}>Edit</button>
      </div>
      <div>Selected: {variables.id}</div>
      <CardTable data={cardData} onSelectCard={onSelectCard}></CardTable>
      {data.category?._cards?.pageInfo.hasNextPage && (
        <button onClick={getMoreData}>Load More</button>
      )}
      Showing {data.category?._cards?.edges.length} /{' '}
      {data.category?._cards?.pageInfo.totalCount} Total
    </div>
  );
};
