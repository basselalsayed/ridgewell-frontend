import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { formatted } from '../helpers';

const Notifications = ({ notifications }) => {
  const headerRow = (
    <thead>
      <tr>
        <th>#</th>
        <th>Message</th>
        <th>Time</th>
        <th>Read/Unread</th>
      </tr>
    </thead>
  );

  const notificationRows = notifications.map(
    ({ id, message, createdAt, read }, idx) => (
      <tr key={id}>
        <td>{idx + 1}</td>
        <td>{message}</td>
        {<td>{formatted(createdAt, 'panelTime')}</td>}
        {
          <td style={{ textAlign: 'center' }}>
            <Button>{read ? 'Unread' : 'Read'}</Button>
          </td>
        }
      </tr>
    ),
  );

  return (
    <div
      style={{
        marginTop: '1rem',
        maxHeight: window.innerHeight - 150,
        overflow: 'auto',
      }}
    >
      <Table striped bordered hover size='sm'>
        {headerRow}
        {notificationRows}
      </Table>
    </div>
  );
};

export { Notifications };
