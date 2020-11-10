import React from 'react';

import * as yup from 'yup';
import { Button, Card, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { login } from '../store/actions';
import { Formik } from 'formik';
import { parseError } from '../helpers';
import { Status } from './forms';
import { CenteredSpinner } from './Spinner';

const Login = ({ history }) => {
  const dispatch = useDispatch();

  const schema = yup.object({
    login: yup.string().required('Required').trim(),
    password: yup.string().required('Required'),
  });

  return (
    <Formik
      validationSchema={schema}
      onSubmit={async (
        { login: loginCred, password },
        { setStatus, validateForm },
      ) => {
        validateForm();
        dispatch(login({ email: loginCred, username: loginCred, password }))
          .then(() => history.push('/profile'))
          .catch(error => setStatus(parseError(error)));
      }}
      initialValues={{
        login: '',
        password: '',
      }}
    >
      {({
        errors,
        handleChange,
        handleSubmit,
        isSubmitting,
        status,
        touched,
      }) => (
        <div className='col-md-12'>
          <Card className='card-container'>
            <img
              src='//ssl.gstatic.com/accounts/ui/avatar_2x.png'
              alt='profile-img'
              className='profile-img-card'
            />

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId='formLogin'>
                <Form.Control
                  name='login'
                  type='text'
                  autoComplete='username'
                  placeholder='Enter username or email'
                  onChange={handleChange}
                  isValid={touched.login && !errors.login}
                  isInvalid={errors.login}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type='invalid'>
                  {errors.login}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId='formPassword'>
                <Form.Control
                  name='password'
                  autoComplete='current-password'
                  type='password'
                  placeholder='Enter password'
                  onChange={handleChange}
                  isValid={touched.password && !errors.password}
                  isInvalid={errors.password}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type='invalid'>
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Row>
                <Button type='submit' disabled={isSubmitting}>
                  {isSubmitting ? <CenteredSpinner /> : 'Submit'}
                </Button>
              </Form.Row>
              {status && <Status status={status} />}
            </Form>
          </Card>
        </div>
      )}
    </Formik>
  );
};

export { Login };
