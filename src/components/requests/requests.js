import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Request } from './request';
import { Spinner } from 'react-bootstrap';
import { getRequests } from '../../actions';

const Requests = () => {
  const { requests } = useSelector(state => state.contentReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRequests());
  }, []);

  return requests ? (
    <div
      style={{
        maxHeight: window.innerHeight - 150,
        overflow: 'auto',
      }}
    >
      {requests.map(req => (
        <Request key={req.id} {...req} />
      ))}
    </div>
  ) : (
    <Spinner animation='border' />
  );
};

export { Requests };
