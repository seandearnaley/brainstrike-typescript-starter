import React, { ReactElement } from 'react';
// import * as Yup from 'yup';
import { withFormik, FormikProps, FormikErrors, Form, Field } from 'formik';
import { AddCardMutationFn } from '../../generated/graphql';

// Shape of form values
interface FormValues {
  number: number;
  label: string;
  description: string;
}

interface OtherProps {
  message: string;
}

const InnerForm = (
  props: OtherProps & FormikProps<FormValues>,
): ReactElement => {
  const { touched, errors, isSubmitting, message } = props;
  return (
    <Form>
      <h1>{message}</h1>
      <Field type="number" name="number" />
      {touched.number && errors.number && <div>{errors.number}</div>}
      <Field type="string" name="label" />
      {touched.label && errors.label && <div>{errors.label}</div>}
      <Field type="string" name="description" />
      {touched.description && errors.description && (
        <div>{errors.description}</div>
      )}
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  );
};

// The type of props MyForm receives
interface MyFormProps {
  initialNumber?: number;
  initialLabel?: string;
  initialDescription?: string;
  message: string; // if this passed all the way through you might do this or make a union type
  addHandler: AddCardMutationFn;
}

type Values = {
  number: number;
  label: string;
  description: string;
};

// Wrap our form with the withFormik HoC
const MyForm = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: props => {
    return {
      number: props.initialNumber || 0,
      label: props.initialLabel || '',
      description: props.initialDescription || '',
    };
  },

  // Add a custom validation function (this can be async too!)
  validate: (values: FormValues) => {
    const errors: FormikErrors<Values> = {};

    console.log('validate values=', values);
    return errors;
  },

  handleSubmit: (values, { props }) => {
    // do submitting things
    props.addHandler({
      variables: {
        input: {
          number: values.number,
          description: values.description,
          label: values.label,
        },
      },
    });

    return true;
  },
})(InnerForm);

interface NewCardFormProps {
  addHandler: AddCardMutationFn;
}

// Use <MyForm /> wherevs
const NewCardForm: React.FC<NewCardFormProps> = (
  props: NewCardFormProps,
): ReactElement => (
  <div>
    <MyForm message="Add New Card" addHandler={props.addHandler} />
  </div>
);

export default NewCardForm;
