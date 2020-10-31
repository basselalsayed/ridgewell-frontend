import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Holiday } from './holiday';
import { Spinner } from 'react-bootstrap';
import { getHolidays } from '../../store/actions';

const Holidays = () => {
  const { holidays } = useSelector(state => state.contentReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHolidays());
  }, []);

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
