import React from 'react';
import { Card, Button, Row, Col, Form } from 'react-bootstrap';
import { capitalize } from '../../../services';
import { formatted } from '../../../helpers';
import { dangerBtn, successBtn } from '../../index.module.css';
import { NegativeButton, SuccessButton } from '../../forms';

const FormBase = ({ errors, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group as={Row}>
      <Col>
        <NegativeButton title={'Deny Request'} />
      </Col>
      <Col>
        <SuccessButton title={'Confirm Request'} errors={errors} />
      </Col>
    </Form.Group>
  </Form>
);

const Request = ({
  createdAt,
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
