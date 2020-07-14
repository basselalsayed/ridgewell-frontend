import React from 'react';
import { Card } from 'react-bootstrap';

const User = ({ email, updatedAt, username }) => (
  <Card>
    <Card.Title>{username}</Card.Title>
    <Card.Body>
      <p> Email: {email} </p>
      <p> Updated: {updatedAt} </p>
    </Card.Body>
  </Card>
);

export { User };
