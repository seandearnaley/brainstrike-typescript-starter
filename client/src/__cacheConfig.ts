import { InMemoryCacheConfig } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';

// generated by Fragment Matcher plugin
import possibleTypes from './generated/fragments';

export const cacheConfig: InMemoryCacheConfig = {
  ...possibleTypes,
  typePolicies: {
    Query: {
      fields: {
        card(existingData, { args, toReference }) {
          try {
            // If no ID is provided, or if the ID is null/undefined, return null
            if (!args || args.id === null || args.id === undefined) {
              console.log('Card resolver: No ID provided, returning null');
              return null;
            }

            // Return existing data if available, otherwise create a reference
            console.log(`Card resolver: Creating reference for ID ${args.id}`);
            return (
              existingData || toReference({ __typename: 'Card', id: args.id })
            );
          } catch (error) {
            console.error('Error in card field policy:', error);
            return null;
          }
        },
        category(existingData, { args, toReference }) {
          try {
            // If no ID is provided, or if the ID is null/undefined, return null
            if (!args || args.id === null || args.id === undefined) {
              console.log('Category resolver: No ID provided, returning null');
              return null;
            }

            // Return existing data if available, otherwise create a reference
            console.log(
              `Category resolver: Creating reference for ID ${args.id}`,
            );
            return (
              existingData ||
              toReference({ __typename: 'Category', id: args.id })
            );
          } catch (error) {
            console.error('Error in category field policy:', error);
            return null;
          }
        },
      },
    },
    Card: {
      fields: {
        categories: {
          keyArgs: ['id'],
          // Merge function to handle updates to the categories field
          merge(existing = [], incoming) {
            return incoming;
          },
        },
      },
    },
    Category: {
      fields: {
        cards: relayStylePagination(['orderByColumn', 'orderByDirection']),
      },
    },
  },
};

export default cacheConfig;
