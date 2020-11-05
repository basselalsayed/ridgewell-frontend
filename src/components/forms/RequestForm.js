import React from 'react';
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
import { plusTwoMonths, plusTwoDays } from '../../helpers';
import { today } from '../../constants';
import { CenteredSpinner } from '../Spinner';

const RequestForm = ({ id, from, until, update }) => {
  const { isPlaying } = useSelector(state => state.countdownReducer);
  const dispatch = useDispatch();

  const schema = yup.object({
    annualLeave: yup.boolean(),
    from: yup
      .date()
      .required('Required')
      .when('annualLeave', (annualLeave, schema) =>
        !update && annualLeave
          ? schema.min(
              plusTwoMonths(today),
              'Annual Leave must start two months in advance',
            )
          : schema.min(today, 'Date cannot be in the past'),
      ),
    until: yup
      .date()
      .required('Required')
      .when('from', (from, schema) =>
        schema.min(from, 'Date cannot be behind start'),
      )
      .when(['annualLeave', 'from'], (annualLeave, from, schema) =>
        !annualLeave
          ? schema.max(plusTwoDays(from), 'Maximum sick leave is two days')
          : schema,
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
      validateOnMount={true}
      initialValues={{
        from,
        until,
        annualLeave: true,
      }}
    >
      {({
        errors,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        setStatus,
        status,
        submitCount,
        touched,
        values,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Row>
            {!update && (
              <Form.Group as={Col} controlId='validationFormik03'>
                <Form.Switch
                  id='annualLeave-switch'
                  label='Annual Leave'
                  name='annualLeave'
                  checked={values.annualLeave}
                  onChange={() => {
                    setFieldValue('annualLeave', !values.annualLeave);
                    // !values.annualLeave && setFieldValue('from', min);
                  }}
                />
              </Form.Group>
            )}
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId='validationFormik01'>
              <Form.Label>From</Form.Label>
              <Form.Control
                type='date'
                name='from'
                min={getMin(values.annualLeave, update)}
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
                max={getMax(values.annualLeave, values.from, update)}
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
            {isSubmitting ? (
              <CenteredSpinner />
            ) : isPlaying ? (
              <CountdownCancel />
            ) : submitCount < 1 ? (
              <Button
                onClick={() =>
                  !errors.from && !errors.until && dispatch(startCountdown())
                }
                className={successBtn}
              >
                Submit
              </Button>
            ) : null}
          </Form.Row>
          {submitCount < 1 && id && !isPlaying && (
            <Form.Row>{newDeleteRequest(setStatus)}</Form.Row>
          )}
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
