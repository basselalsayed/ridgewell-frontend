import React from 'react';
import { Card } from 'react-bootstrap';

const Request = ({
  createdAt,
  from,
  resolved,
  type,
  until,
  user: { email, username },
}) => (
  <Card border={resolved ? 'success' : 'warning'}>
    <Card.Title>
      Owner: {username}, {email}
    </Card.Title>
    <Card.Body>
      <p> Type: {type} </p>
      {from && <p> From: {from} </p>}
      {until && <p> Until: {until} </p>}
      <p> Request made: {createdAt} </p>
    </Card.Body>
    <Card.Footer>{`Resolved: ${resolved}`}</Card.Footer>
  </Card>
);

export { Request };
