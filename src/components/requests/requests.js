import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Request } from './request';
import { Spinner } from 'react-bootstrap';
import { getRequests } from '../../actions';

const RequestsBase = ({ requests, getRequests }) => {
  useEffect(() => {
    getRequests();
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
const mapStateToProps = state => ({
  requests: state.contentReducer.requests,
});
const mapDispatchToProps = dispatch => ({
  getRequests: () => dispatch(getRequests()),
});

const Requests = connect(mapStateToProps, mapDispatchToProps)(RequestsBase);

export { Requests };
