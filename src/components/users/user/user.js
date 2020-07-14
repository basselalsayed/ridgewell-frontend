import React from 'react';
import { Card } from 'react-bootstrap';

const User = ({ email, id, password, updatedAt, username }) => (
  <Card>
    <Card.Title>{username}</Card.Title>
    <Card.Body>
      <p> {id} </p>
      <p> {email} </p>
      <p> {password} </p>
      <p> {updatedAt} </p>
    </Card.Body>
  </Card>
);

export { User };
