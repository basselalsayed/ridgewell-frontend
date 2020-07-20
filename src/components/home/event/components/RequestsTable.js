import React from 'react';
import { Table } from 'react-bootstrap';
import { capitalize } from '../../../../services';

import { formatted } from '../../../../helpers';

const RequestsTable = ({ requests }) => {
  const headerRow = (
    <thead>
      <tr>
        <th>#</th>
        <th>Type</th>
        <th>From</th>
        <th>Until</th>
      </tr>
    </thead>
  );

  const requestRows = requests.map(({ id, type, from, until }, idx) => (
    <tr key={id}>
      <td>{idx + 1}</td>
      <td>{type && `${capitalize(type)}`}</td>
      {<td>{from && formatted(from, 'popover')}</td>}
      {<td>{until && formatted(until, 'popover')}</td>}
    </tr>
  ));

  return (
    <Table striped bordered hover size='sm'>
      {headerRow}
      {requestRows}
    </Table>
  );
};

export { RequestsTable };
