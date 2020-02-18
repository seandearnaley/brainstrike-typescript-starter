import { ApolloError, FetchResult, Reference } from '@apollo/client';

import {
  useRemoveCardMutation,
  RemoveCardMutation,
} from '../../generated/graphql';

import { cache as inMemoryCache } from '../../index';

import { buildPageInfo } from './__utils';

const removeCardFromCache = (categoryId: string, cardId: string) => {
  inMemoryCache.modify(`Category:${categoryId}`, {
    cards(cards: Reference, { readField }) {
      const edges = readField<any[]>('edges', cards).filter(
        edge => edge?.node?.__ref !== `Card:${cardId}`,
      );

      let totalCount = readField<any>('pageInfo', cards).totalCount;
      const pageInfo = buildPageInfo<any>(edges, String(--totalCount), 'Card'); // rebuild pageinfo

      return {
        edges,
        pageInfo,
      };
    },
  });
};

// NOTE: the rationale for using a custom hook is for the cache update,
// now the removeCard function can be used elsewhere with shared cache logic
export const useRemoveCard = (): [
  (
    id: string,
  ) => Promise<
    FetchResult<RemoveCardMutation, Record<string, any>, Record<string, any>>
  >,
  boolean,
  ApolloError | undefined,
] => {
  const [removeCardMutation, { loading, error }] = useRemoveCardMutation();

  const removeCard = (id: string) =>
    removeCardMutation({
      variables: {
        id,
      },
      update: (_, { data }) => {
        // these cards can be in many categories, data should include a list of category ids
        // for each of cards categories, remove the cards from the category cache and recalculate pageInfo
        data?.removeCard?.card?.categories?.forEach(category => {
          if (!category) return; // category could be null
          removeCardFromCache(category.id, id);
        });

        // evict this item from the in memory cache
        inMemoryCache.evict(`Card:${id}`);
        inMemoryCache.gc(); // garbage collection
      },
    });

  return [removeCard, loading, error];
};
