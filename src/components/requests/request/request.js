import React from 'react';
import { Card, Button, Row, Col, Form } from 'react-bootstrap';
import { capitalize } from '../../../services';
import { formatted } from '../../../helpers';
import { dangerBtn, successBtn } from '../../index.module.css';
import { CountdownCancel, NegativeButton, SuccessButton } from '../../forms';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getAll } from '../../../store/actions';
import { CenteredSpinner } from '../../Spinner';

const FormBase = ({ id }) => {
  const { isDelete, isPlaying } = useSelector(state => state.countdownReducer);
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ null: null }}
      onSubmit={async (_, { setStatus }) =>
        await axios
          .put(`requests/${id}/${isDelete ? 'deny' : 'confirm'}`)
          .then(res => {
            res && setStatus(res.data.message);
            dispatch(getAll());
          })
          .catch(err =>
            setStatus(
              `${err.response.statusText}: ${err.response.data.message}`,
            ),
          )
      }
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row}>
            {isSubmitting ? (
              <CenteredSpinner />
            ) : isPlaying ? (
              <CountdownCancel />
            ) : (
              <>
                <Col>
                  <NegativeButton title={'Deny Request'} />
                </Col>
                <Col>
                  <SuccessButton title={'Confirm Request'} />
                </Col>
              </>
            )}
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
      <FormBase id={id} />
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
