import React, { ReactElement } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';

import {
  useAddCardMutation,
  GetCardsDocument,
  GetCardsQuery,
} from '../../generated/graphql';

interface MyFormValues {
  number?: number | null;
  label?: string | null;
  description?: string | null;
}

export const NewCardForm: React.FC = (): React.ReactElement => {
  const initialValues: MyFormValues = {
    number: 0,
    label: '',
    description: '',
  };

  const [
    addCardMutation,
    {
      data: addMutationData,
      loading: addMutationLoading,
      error: addMutationError,
    },
  ] = useAddCardMutation({
    update(cache, { data }) {
      const cardQuery = cache.readQuery<GetCardsQuery>({
        query: GetCardsDocument,
      });

      cache.writeQuery<GetCardsQuery>({
        query: GetCardsDocument,
        data: {
          cards:
            cardQuery &&
            cardQuery.cards &&
            cardQuery.cards.concat(
              data && data.addCard.card ? [data.addCard.card] : [],
            ),
        },
      });
    },
  });

  if (addMutationData) console.log(addMutationData.addCard.message);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions): void => {
        console.log({ values, actions });

        addCardMutation({
          variables: {
            input: {
              number: values.number,
              description: values.description,
              label: values.label,
            },
          },
        });

        actions.setSubmitting(false);
      }}
    >
      {({ isSubmitting }): React.ReactElement => (
        <Form>
          {addMutationLoading ? <div>Mutation Loading</div> : undefined}

          {addMutationError ? (
            <p>ERROR: {addMutationError.message}</p>
          ) : (
            undefined
          )}
          <div>
            <Field
              name="number"
              type="number"
              component={TextField}
              id="number"
              label="Card Number"
              style={{ margin: 8 }}
              placeholder="Number"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </div>
          <div>
            <Field
              name="label"
              component={TextField}
              id="label"
              label="Label"
              style={{ margin: 8 }}
              placeholder="Label"
              margin="normal"
              disabled={false}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </div>
          <div>
            <Field
              name="description"
              component={TextField}
              id="description"
              label="Description"
              style={{ margin: 8 }}
              placeholder="Description"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </div>
          <div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NewCardForm;
