import React from 'react';
import { Holiday } from './holiday';

const Holidays = ({ holidays }) => (
  <div
    style={{
      maxHeight: window.innerHeight - 150,
      overflow: 'auto',
    }}
  >
    {holidays.map(hol => (
      <Holiday key={hol.id} {...hol} />
    ))}
  </div>
);

export { Holidays };
