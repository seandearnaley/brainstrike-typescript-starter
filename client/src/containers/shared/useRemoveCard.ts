import { ApolloError, FetchResult } from '@apollo/client';

import {
  useRemoveCardMutation,
  RemoveCardMutation,
  GetCategoryWithCardsDocument,
  GetCategoryWithCardsQuery,
} from '../../generated/graphql';

import { cache as inMemoryCache } from '../../index';

import { buildPageInfo } from './__utils';

// NOTE: the rationale for using a custom hook is for the cache update,
// now the removeCard function can be used elsewhere with shared cache logic
export const useRemoveCard = (): [
  (
    id: string | null,
  ) => Promise<
    FetchResult<RemoveCardMutation, Record<string, any>, Record<string, any>>
  >,
  boolean,
  ApolloError | undefined,
] => {
  const [removeCardMutation, { loading, error }] = useRemoveCardMutation();

  const removeCard = (id: string | null) =>
    removeCardMutation({
      variables: {
        id: id ?? '',
      },
      update: (cache, { data }) => {
        const id = data?.removeCard?.card?.id;
        if (!id) return;

        // categories that the card is in
        const categories = data?.removeCard?.card?.categories;

        // for each of those categories, read the cache then remove the cards from the ApolloClient query cache
        categories?.forEach(category => {
          if (!category) return;

          const data = cache.readQuery<GetCategoryWithCardsQuery>({
            query: GetCategoryWithCardsDocument,
            variables: {
              id: category.id,
            },
          });

          if (
            !data?.category?.cards?.edges ||
            !data?.category?.cards?.pageInfo?.totalCount
          )
            return;

          const edges = data.category.cards.edges.filter(
            edge => edge?.node?.id !== id,
          );

          let totalCount = data.category.cards.pageInfo.totalCount;
          const pageInfo = buildPageInfo<any>(
            edges,
            String(--totalCount),
            'Card',
          );

          cache.writeQuery({
            query: GetCategoryWithCardsDocument,
            variables: {
              id: category.id,
            },
            data: {
              category: {
                ...data?.category,
                cards: {
                  pageInfo,
                  edges,
                },
              },
            },
          });
        });

        // evict this item from the in memory cache
        inMemoryCache.evict(`Card:${id}`);
        inMemoryCache.gc();
      },
    });
  return [removeCard, loading, error];
};
