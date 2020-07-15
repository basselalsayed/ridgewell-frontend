import React from 'react';
import { OverlayTrigger, Popover, Table } from 'react-bootstrap';
import { capitalize } from '../../services';
import { format } from 'date-fns';

const Event = ({ event: { holidayRequests, style }, title }) => (
  <OverlayTrigger
    trigger='hover'
    placement={'top'}
    overlay={
      <Popover id={`popover-positioned-top`}>
        <Popover.Title as='h3'>Requests</Popover.Title>
        <Popover.Content>
          {holidayRequests && (
            <Table striped bordered hover size='sm'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Type</th>
                  <th>From</th>
                  <th>Until</th>
                </tr>
              </thead>
              {holidayRequests.map(({ type, from, until }, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>

                  <td>{type && ` ${capitalize(type)}`}</td>
                  {<td> {from && format(new Date(from), 'd/mm/yy')}</td>}
                  {<td> {until && format(new Date(until), 'd/mm/yy')}</td>}
                </tr>
              ))}
            </Table>
          )}
        </Popover.Content>
      </Popover>
    }
  >
    <span style={style}>
      <strong> {title} </strong>
    </span>
  </OverlayTrigger>
);

export { Event };
