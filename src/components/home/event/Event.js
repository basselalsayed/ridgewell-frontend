import React, { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { EventModal, RequestsTable } from './components';

const Event = ({
  event: { end, holidayRequests, id, start, style },
  title,
}) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);

  const modalProps = {
    end,
    handleShow,
    show,
    start,
    title,
    update: true,
  };

  const banner = (
    <div onClick={handleShow} style={style}>
      <strong> {title} </strong>
    </div>
  );

  const withTooltip = (
    <OverlayTrigger
      trigger={['hover', 'focus']}
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
