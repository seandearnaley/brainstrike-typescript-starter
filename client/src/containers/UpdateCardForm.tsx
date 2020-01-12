import React, { ReactElement } from 'react';

import { CardForm } from '../components/CardForm';
import { useUpdateCardMutation, Card as CardType } from '../generated/graphql';

interface UpdateCardProps {
  card: CardType;
}

export const UpdateCardForm: React.FC<UpdateCardProps> = (
  props: UpdateCardProps,
): React.ReactElement => {
  const { id, number, label, description } = props.card;
  const [
    updateCardMutation,
    { data, loading, error },
  ] = useUpdateCardMutation();

  if (data) console.log(data.updateCard.message);

  return (
    <div>
      {loading ? <div>loading....</div> : undefined}
      {error ? <p>ERROR: {error.message}</p> : undefined}
      <CardForm
        initialValues={{ number, description, label }}
        onSubmit={(values, actions): void => {
          console.log({ values, actions });

          updateCardMutation({
            variables: {
              id,
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

export default UpdateCardForm;
