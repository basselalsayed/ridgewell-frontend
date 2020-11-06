import React from 'react';
import { useSelector } from 'react-redux';
import { Request } from './request';
import { CenteredSpinner } from '../Spinner';

const Requests = () => {
  const { requests } = useSelector(state => state.contentReducer);

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
    <CenteredSpinner />
  );
};

export { Requests };
