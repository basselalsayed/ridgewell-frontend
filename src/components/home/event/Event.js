import React, { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { EventModal } from './EventModal';
import { RequestsTable } from './RequestsTable';

const Event = ({ event: { id, holidayRequests, style }, title }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);

  const banner = (
    <div onClick={handleShow} style={style}>
      <strong> {title} </strong>
    </div>
  );

  const modalProps = {
    handleShow,
    show,
    title,
  };

  const withTooltip = (
    <OverlayTrigger
      trigger='hover'
      placement={'top'}
      overlay={
        <Popover id={`hol-${id}-popover`}>
          <Popover.Title as='h3'>Pending Requests</Popover.Title>
          <Popover.Content
            children={<RequestsTable requests={holidayRequests} />}
          />
        </Popover>
      }
    >
      {banner}
    </OverlayTrigger>
  );

  return (
    <>
      {holidayRequests ? withTooltip : banner}
      <EventModal {...modalProps} />
    </>
  );
};

export { Event };
