import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { capitalize } from '../../../services';
import { formatted } from '../../../helpers';

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
      <p> Type: {capitalize(type)} </p>
      {from && <p> From: {formatted(from, 'panel')} </p>}
      {until && <p> Until: {formatted(until, 'panel')} </p>}
      <p> Request made: {formatted(createdAt, 'panelTime')} </p>
      <p>Resolved: {resolved ? 'True' : 'False'}</p>
    </Card.Body>

    <Card.Footer>
      <Row>
        <Col>
          <Button style={{ width: '100%' }}>Refuse</Button>
        </Col>
        <Col>
          <Button style={{ width: '100%' }}>Confirm</Button>
        </Col>
      </Row>
    </Card.Footer>
  </Card>
);

export { Request };
