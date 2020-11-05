import React, { useMemo } from 'react';
import { Formik } from 'formik';
import { Form, Button, Col, Alert } from 'react-bootstrap';
import * as yup from 'yup';

import { getMin, getMax } from '../../helpers';
import axios from 'axios';

import { successBtn } from '../index.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getHolidays } from '../../store/actions';
import { dangerBtn } from '../index.module.css';

import { startCountdown } from '../../store/actions/countdown';
import { CountdownCancel } from './CountdownCancel';

const RequestForm = ({ annualLeave, id, from, until, update }) => {
  const min = useMemo(() => getMin(annualLeave, from, update), [
    from,
    update,
    annualLeave,
  ]);

  const { isPlaying } = useSelector(state => state.countdownReducer);
  const dispatch = useDispatch();

  const schema = yup.object({
    from: yup
      .date()
      .required('Required')
      .min(
        min,
        annualLeave
          ? 'Annual Leave must be booked two months in advance'
          : 'Date cannot be in the past',
      ),
    until: yup
      .date()
      .required('Required')
      .when('from', (st, schema) =>
        yup.date().min(st, 'Date cannot be behind start'),
      ),
  });
  const ENDPOINT = update ? 'requests' : 'holidays';
  const updateData = { type: 'update', holidayId: id };

  const newDeleteRequest = setStatus => (
    <Button
      onClick={async () => {
        await axios
          .post('requests', { holidayId: id, type: 'delete' })
          .then(({ data: { message } }) => setStatus(message))
          .catch(err => {
            setStatus(
              `${err.response.statusText}: ${err.response.data.message}`,
            );
          });

        dispatch(getHolidays());
      }}
      className={dangerBtn}
    >
      Delete Holiday
    </Button>
  );

  return (
    <Formik
      validationSchema={schema}
      onSubmit={async (data, { setStatus }) =>
        await axios
          .post(ENDPOINT, update ? { ...data, ...updateData } : data)
          .then(res => {
            res && setStatus('Success');
            dispatch(getHolidays());
          })
          .catch(err =>
            setStatus(
              `${err.response.statusText}: ${err.response.data.message}`,
            ),
          )
      }
      initialValues={{
        from,
        until,
      }}
    >
      {({
        errors,
        handleChange,
        handleSubmit,
        setStatus,
        status,
        touched,
        values,
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
                max={getMax(annualLeave, values.from, update)}
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

          <Form.Row>
            {isPlaying ? (
              <CountdownCancel />
            ) : (
              <Button
                onClick={() => dispatch(startCountdown())}
                className={successBtn}
              >
                Submit
              </Button>
            )}
          </Form.Row>
          {id && <Form.Row>{newDeleteRequest(setStatus)}</Form.Row>}
          {status && (
            <Form.Row>
              <Alert
                style={{ marginTop: 10, width: '100%', textAlign: 'center' }}
                variant={status === 'Success' ? 'success' : 'danger'}
              >
                {status}
              </Alert>
            </Form.Row>
          )}
        </Form>
      )}
    </Formik>
  );
};
export { RequestForm };
