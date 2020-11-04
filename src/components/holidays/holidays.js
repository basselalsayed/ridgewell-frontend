import React from 'react';
import { useSelector } from 'react-redux';
import { Holiday } from './holiday';
import { Spinner } from 'react-bootstrap';

const Holidays = () => {
  const { holidays } = useSelector(state => state.contentReducer);

  return holidays ? (
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
  ) : (
    <Spinner animation='border' />
  );
};

export { Holidays };
