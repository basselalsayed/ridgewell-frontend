import React, { useState, useRef } from 'react';

import { isEmail } from 'validator';

import { Button, Card, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { signUp } from '../store/actions';
import { useForm } from 'react-hook-form';

const required = value => {
  if (!value) {
    return (
      <div className='alert alert-danger' role='alert'>
        This field is required!
      </div>
    );
  }
};

const validEmail = value => {
  if (!isEmail(value)) {
    return (
      <div className='alert alert-danger' role='alert'>
        This is not a valid email.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className='alert alert-danger' role='alert'>
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className='alert alert-danger' role='alert'>
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = props => {
  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    console.log('data', data);

    props.signUp(data);
  };

  return (
    <div className='col-md-12'>
      <Card className='card-container'>
        <img
          src='//ssl.gstatic.com/accounts/ui/avatar_2x.png'
          alt='profile-img'
          className='profile-img-card'
        />

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId='formUsername'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter username'
              ref={register({ required: true, maxLength: 25 })}
            />
          </Form.Group>
          <Form.Group controlId='formEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              ref={register({ required: true })}
            />
          </Form.Group>

          <Form.Group controlId='formPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              ref={register({ required: true, minLength: 6 })}
            />
          </Form.Group>

          <input variant='primary' type='submit' />
        </Form>
      </Card>
    </div>
  );
};

const mapStateToProps = state => ({
  serverResponse: state.serverResponse,
});

const mapDispatchToProps = dispatch => ({
  signUp: userInfo => dispatch(signUp(userInfo)),
});

export default connect(null, mapDispatchToProps)(Register);
