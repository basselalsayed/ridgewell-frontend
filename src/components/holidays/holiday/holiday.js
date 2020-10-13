import React from 'react';
import { Card } from 'react-bootstrap';
import { formatted } from '../../../helpers';

const Holiday = ({
  confirmed,
  createdAt,
  from,
  until,
  User: { email, username },
}) => (
  <Card border={confirmed ? 'success' : 'warning'}>
    <Card.Title>
      Owner: {username}, {email}
    </Card.Title>
    <Card.Body>
      <p> From: {formatted(from, 'panel')} </p>
      <p> Until: {formatted(until, 'panel')} </p>
      <p> Request made: {formatted(createdAt, 'panelTime')} </p>
    </Card.Body>
    <Card.Footer>{`Confirmed: ${confirmed}`}</Card.Footer>
  </Card>
);

export { Holiday };
