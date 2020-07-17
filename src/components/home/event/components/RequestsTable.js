import React from 'react';
import { Table } from 'react-bootstrap';
import { capitalize } from '../../../../services';
import { format } from 'date-fns';

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
      {<td>{from && format(new Date(from), 'd/MM/yy')}</td>}
      {<td>{until && format(new Date(until), 'd/MM/yy')}</td>}
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
