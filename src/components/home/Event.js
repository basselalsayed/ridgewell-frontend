import React, { useState } from 'react';
import { OverlayTrigger, Popover, Table, Modal, Button } from 'react-bootstrap';
import { capitalize } from '../../services';
import { format } from 'date-fns';

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

        <td>{type && ` ${capitalize(type)}`}</td>
        {<td> {from && format(new Date(from), 'd/mm/yy')}</td>}
        {<td> {until && format(new Date(until), 'd/mm/yy')}</td>}
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

  const modal = (
    <Modal show={show} onHide={handleShow}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleShow}>
          Close
        </Button>
        <Button variant='primary' onClick={handleShow}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <>
      {holidayRequests ? withTooltip : banner}
      {modal}
    </>
  );
};

export { Event };
