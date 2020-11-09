import React, { useState } from 'react';

import { Button, Spinner, Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { formatted } from '../helpers';
import { getNotifications, updateNotification } from '../store/actions';

const NotificationReadButton = ({ id, read }) => {
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    setSubmitting(true);

    dispatch(updateNotification(id, read)).then(() => {
      dispatch(getNotifications());
      setSubmitting(false);
    });
  };

  return submitting ? (
    <Spinner
      style={{
        color: 'green',
        position: 'inherit',
        left: '50%',
        top: '50%',
        marginTop: '0.5rem',
      }}
      animation='border'
    />
  ) : (
    <Button onClick={handleSubmit}>{read ? 'Unread' : 'Read'}</Button>
  );
};
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

  const notificationRows =
    notifications &&
    notifications.map(({ id, message, createdAt, read }, idx) => (
      <tr key={id}>
        <td>{idx + 1}</td>
        <td>{message}</td>
        {<td>{formatted(createdAt, 'panelTime')}</td>}
        {
          <td style={{ textAlign: 'center' }}>
            <NotificationReadButton id={id} read={read} />
          </td>
        }
      </tr>
    ));

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
        <tbody>{notificationRows}</tbody>
      </Table>
    </div>
  );
};

export { Notifications };
