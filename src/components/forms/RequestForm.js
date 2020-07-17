import React from 'react';
import { Formik } from 'formik';
import { Form, Button, Col } from 'react-bootstrap';
import * as yup from 'yup';
import { format, addMonths } from 'date-fns';

let today = new Date();
today.setHours(0, 0, 0, 0);

const formats = { form: 'yyyy-MM-dd' };
const formatted = (date, type) => format(new Date(date), formats[type]);
const plusTwoMonths = date => addMonths(new Date(date), 2);

const getMin = (update, date) =>
  update ? formatted(today, 'form') : formatted(plusTwoMonths(date), 'form');

const RequestForm = ({ from, until, update }) => {
  const min = getMin(update, from);

  const schema = yup.object({
    from: yup
      .date()
      .required('Required')
      .min(min, 'Date cannot be in the past'),
    until: yup
      .date()
      .required('Required')
      .when('from', (st, schema) =>
        yup.date().min(st, 'Date cannot be behind start'),
      ),
  });

  return (
    <Formik
      validationSchema={schema}
      onSubmit={console.log}
      initialValues={{
        from,
        until,
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId='validationFormik01'>
              <Form.Label>From</Form.Label>
              <Form.Control
                type='date'
                name='from'
                min={min}
                value={values.from}
                onChange={handleChange}
                isInvalid={errors.from}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

              <Form.Control.Feedback type='invalid'>
                {errors.from}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId='validationFormik02'>
              <Form.Label>Until</Form.Label>
              <Form.Control
                type='date'
                name='until'
                min={values.from}
                value={values.until}
                onChange={handleChange}
                isInvalid={errors.until}
              />

              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>
                {errors.until}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Button type='submit'>Submit form</Button>
        </Form>
      )}
    </Formik>
  );
};
export { RequestForm };
