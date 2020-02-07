import React, { ReactElement } from 'react';

import { CardForm } from '../components/CardForm';
import { useAddCardMutation } from '../generated/graphql';

export const NewCardForm: React.FC = (): React.ReactElement => {
  const [addCardMutation, { data, loading, error }] = useAddCardMutation();

  // {
  //   update(cache, { data }) {
  //     const cardQuery = cache.readQuery<GetCardsQuery>({
  //       query: GetCardsDocument,
  //     });
  //     cache.writeQuery<GetCardsQuery>({
  //       query: GetCardsDocument,
  //       data: {
  //         cards:
  //           cardQuery &&
  //           cardQuery.cards &&
  //           cardQuery.cards.concat(
  //             data && data.addCard.card ? [data.addCard.card] : [],
  //           ),
  //       },
  //     });
  //   },
  // }

  if (data) console.log(data.addCard.message);

  return (
    <div>
      {loading ? <div>loading....</div> : undefined}
      {error ? <p>ERROR: {error.message}</p> : undefined}
      <CardForm
        initialValues={{ number: '', description: '', label: '' }}
        onSubmit={(values, actions): void => {
          console.log({ values, actions });

          addCardMutation({
            variables: {
              input: {
                number: Number(values.number),
                description: values.description,
                label: values.label,
              },
            },
          });

          actions.setSubmitting(false);
        }}
      />
    </div>
  );
};

export default NewCardForm;
