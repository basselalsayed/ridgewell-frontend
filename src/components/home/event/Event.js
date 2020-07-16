import React, { useState } from 'react';
import { OverlayTrigger, Popover, Table, Modal, Button } from 'react-bootstrap';
import { capitalize } from '../../../services';
import { format } from 'date-fns';
import { EventModal } from './EventModal';

const RequestsTable = ({ requests }) => (
  <Table striped bordered hover size='sm'>
    <thead>
      <tr>
        <th>#</th>
        <th>Type</th>
        <th>From</th>
        <th>Until</th>
      </tr>
    </thead>
    {requests.map(({ type, from, until }, idx) => (
      <tr key={idx}>
        <td>{idx + 1}</td>

        <td>{type && `${capitalize(type)}`}</td>
        {<td>{from && format(new Date(from), 'd/MM/yy')}</td>}
        {<td>{until && format(new Date(until), 'd/MM/yy')}</td>}
      </tr>
    ))}
  </Table>
);
const Event = ({ event: { id, holidayRequests, style }, title }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);

  const banner = (
    <div onClick={handleShow} style={style}>
      <strong> {title} </strong>
    </div>
  );

  const withTooltip = (
    <OverlayTrigger
      trigger='hover'
      placement={'top'}
      overlay={
        <Popover id={`hol-${id}-popover`}>
          <Popover.Title as='h3'>Pending Requests</Popover.Title>
          <Popover.Content>
            <RequestsTable requests={holidayRequests} />
          </Popover.Content>
        </Popover>
      }
    >
      {banner}
    </OverlayTrigger>
  );

  const modalProps = {
    handleShow,
    show,
    title,
  };

  return (
    <>
      {holidayRequests ? withTooltip : banner}
      <EventModal {...modalProps} />
    </>
  );
};

export { Event };
