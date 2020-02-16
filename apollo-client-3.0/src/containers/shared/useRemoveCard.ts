import { ApolloError, FetchResult } from '@apollo/client';

import {
  useRemoveCardMutation,
  RemoveCardMutation,
  //GetCardWithCategoriesDocument,
} from '../../generated/graphql';

import { cache as inMemoryCache } from '../../index';

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

        inMemoryCache.evict(`Card:${id}`);
        inMemoryCache.gc();

        // const { card } =
        //   cache.readQuery({
        //     query: GetCardWithCategoriesDocument,
        //     variables: {
        //       id,
        //     },
        //   }) || {};

        // console.log('card cache=', card);

        // cache.writeQuery({
        //   query: GetCardWithCategoriesDocument,
        //   variables: {
        //     id,
        //   },
        //   data: {
        //     card: null,
        //   },
        // });
      },
    });
  return [removeCard, loading, error];
};
