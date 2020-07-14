import React from 'react';
import { Card } from 'react-bootstrap';

const Holiday = ({
  confirmed,
  createdAt,
  from,
  until,
  user: { email, username },
}) => (
  <Card>
    <Card.Title>
      Owner: {username}, {email}
    </Card.Title>
    <Card.Body>
      <p> From: {from} </p>
      <p> Until: {until} </p>
      <p> Request made: {createdAt} </p>
    </Card.Body>
    <Card.Footer>{`Confirmed: ${confirmed}`}</Card.Footer>
  </Card>
);

export default Holiday;
