import React from 'react';
import { TextField } from 'formik-material-ui';
import { Formik, Form, Field, FormikConfig } from 'formik';
import * as Yup from 'yup';

const CardFormSchema = Yup.object().shape({
  description: Yup.string().max(500, 'Too Long!'),
  label: Yup.string(),
  number: Yup.number().required('Required'),
});

interface CardFormValues {
  description?: string | null;
  label?: string | null;
  number?: number | string | null;
}

type CardFormProps = Pick<
  FormikConfig<CardFormValues>,
  'initialValues' | 'onSubmit'
>;

export const CardForm: React.FC<CardFormProps> = (
  props: CardFormProps,
): React.ReactElement => {
  const { initialValues, onSubmit } = props;
  const { number, label, description } = initialValues;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CardFormSchema}
      onSubmit={onSubmit}
    >
      {(): React.ReactElement => (
        <Form>
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
              value={number}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <Field
              name="label"
              component={TextField}
              id="label"
              label="Label"
              style={{ margin: 8 }}
              placeholder="Label"
              margin="normal"
              value={label}
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
              value={description}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              fullWidth
              multiline={true}
              rows={3}
              rowsMax={4}
            />
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};
