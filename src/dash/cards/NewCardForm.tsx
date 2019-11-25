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

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
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

// function isValidEmail(email: string): boolean {
//   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// }

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
    // if (!values.email) {
    //   errors.email = 'Required';
    // } else if (!isValidEmail(values.email)) {
    //   errors.email = 'Invalid email address';
    // }

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
