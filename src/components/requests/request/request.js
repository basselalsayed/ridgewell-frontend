import React from 'react';
import { Card, Button, Row, Col, Form } from 'react-bootstrap';
import { capitalize } from '../../../services';
import { formatted } from '../../../helpers';
import { dangerBtn, successBtn } from '../../index.module.css';
import { NegativeButton, SuccessButton } from '../../forms';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getRequests } from '../../../store/actions';

const FormBase = ({ id }) => {
  const { isDelete, isPlaying } = useSelector(state => state.countdownReducer);
  const dispatch = useDispatch();

  return (
    <Formik
      onSubmit={async (_, { setStatus }) => {
        try {
          const response = isDelete
            ? await axios.post(`requests/${id}/deny`)
            : await axios.post(`requests/${id}/confirm`);

          response && setStatus('Success');
          dispatch(getRequests());
        } catch (err) {
          setStatus(`${err.response.statusText}: ${err.response.data.message}`);
        }
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row}>
            <Col>
              <NegativeButton title={'Deny Request'} />
            </Col>
            <Col>
              <SuccessButton title={'Confirm Request'} />
            </Col>
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
};

const Request = ({
  createdAt,
  id,
  from,
  resolved,
  type,
  until,
  User: { email, username },
}) => (
  <Card border={resolved ? 'success' : 'warning'}>
    <Card.Title>
      Owner: {username}, {email}
    </Card.Title>
    <Card.Body>
      <p> Type: {capitalize(type)} </p>
      {from && <p> From: {formatted(from, 'panel')} </p>}
      {until && <p> Until: {formatted(until, 'panel')} </p>}
      <p> Request made: {formatted(createdAt, 'panelTime')} </p>
      <p>Resolved: {resolved ? 'True' : 'False'}</p>
    </Card.Body>

    <Card.Footer>
      <FormBase />
    </Card.Footer>
    <Card.Footer>
      <Row>
        <Col>
          <Button className={dangerBtn}>Refuse</Button>
        </Col>
        <Col>
          <Button className={successBtn}>Confirm</Button>
        </Col>
      </Row>
    </Card.Footer>
  </Card>
);

export { Request };
