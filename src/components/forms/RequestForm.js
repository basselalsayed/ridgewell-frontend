import React, { useMemo } from 'react';
import { Formik } from 'formik';
import { Form, Button, Col, Alert } from 'react-bootstrap';
import * as yup from 'yup';

import { getMin } from '../../helpers';
import axios from 'axios';
import { API_URL } from '../../constants';
import authHeader from '../../services/auth-header';
import { useDispatch } from 'react-redux';
import { getHolidays } from '../../actions';

const RequestForm = ({ annualLeave, id, from, until, update }) => {
  // const min = getMin(annualLeave, from, update);
  const min = useMemo(() => getMin(annualLeave, from, update), [
    from,
    update,
    annualLeave,
  ]);
  // const dispatch = useDispatch();
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
  const ENDPOINT = API_URL + (update ? `requests/upd/${id}` : `holidays/`);

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(data, { setStatus }) => {
        axios
          .post(ENDPOINT, data, { headers: authHeader() })
          .then(res => res && setStatus('Success'))
          .catch(err => setStatus(err.message));

        // dispatch(getHolidays());
      }}
      initialValues={{
        from,
        until,
      }}
    >
      {({ errors, handleChange, handleSubmit, status, touched, values }) => (
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
                isValid={touched.from && !errors.from}
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
                isValid={touched.until && !errors.until}
                isInvalid={errors.until}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>
                {errors.until}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Button type='submit'>Submit form</Button>
          {status && (
            <Alert
              style={{ marginTop: 10 }}
              variant={status === 'Success' ? 'success' : 'danger'}
            >
              {status}
            </Alert>
          )}
        </Form>
      )}
    </Formik>
  );
};
export { RequestForm };
