import React from 'react';
import { TextField } from 'formik-mui';
import { Formik, Form, Field, FormikConfig } from 'formik';
import * as Yup from 'yup';
import { css } from '@emotion/css';

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
    <div className={css`
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      padding: 24px;
      margin-top: 16px;
    `}>
      <h2 className={css`
        margin-top: 0;
        margin-bottom: 16px;
        color: #3f51b5;
        font-weight: 500;
        font-size: 1.5rem;
      `}>Edit Card</h2>
      
      <Formik
        initialValues={initialValues}
        validationSchema={CardFormSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }): React.ReactElement => (
          <Form>
            <div className={css`
              display: grid;
              grid-template-columns: 1fr 2fr;
              gap: 16px;
              margin-bottom: 16px;
            `}>
              <Field
                name="number"
                type="number"
                component={TextField}
                id="number"
                label="Card Number"
                placeholder="Number"
                margin="normal"
                value={number}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                fullWidth
              />
              <Field
                name="label"
                component={TextField}
                id="label"
                label="Label"
                placeholder="Label"
                margin="normal"
                value={label}
                disabled={false}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                fullWidth
              />
            </div>
            
            <div className={css`margin-bottom: 24px;`}>
              <Field
                name="description"
                component={TextField}
                id="description"
                label="Description"
                placeholder="Description"
                margin="normal"
                value={description}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                fullWidth
                multiline={true}
                rows={4}
                className={css`font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;`}
              />
            </div>
            
            <div className={css`
              display: flex;
              justify-content: flex-end;
            `}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={css`
                  background-color: #3f51b5;
                  color: white;
                  border: none;
                  border-radius: 4px;
                  padding: 8px 16px;
                  font-size: 0.875rem;
                  font-weight: 500;
                  cursor: pointer;
                  transition: background-color 0.2s;
                  
                  &:hover {
                    background-color: #303f9f;
                  }
                  
                  &:disabled {
                    background-color: #bdbdbd;
                    cursor: not-allowed;
                  }
                `}
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};