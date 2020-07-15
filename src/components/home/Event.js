import React from 'react';

const Event = ({ event: { holidayRequests }, title }) => (
  <>
    <span onClick={() => alert(title)} style={{ color: 'white' }}>
      <strong> {title} </strong>
    </span>

    {holidayRequests &&
      holidayRequests.map(({ type, from, until, resolved }) => (
        <span style={{ backgroundColor: 'white', color: 'red' }}>
          <strong>
            {type}
            {from}
            {until}
            {`${resolved}`}
          </strong>
        </span>
      ))}
  </>
);

export { Event };
