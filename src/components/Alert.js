import React from 'react';
import { Toast } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { hideAlert } from '../store/actions/response';

const Alert = () => {
  const dispatch = useDispatch();
  const { error, show, message } = useSelector(state => state.responseReducer);

  return (
    (message || error) && (
      <Toast
        style={{
          minWidth: '200px',
          position: 'absolute',
          top: 0,
          right: 0,
        }}
        show={show}
        onClose={() => dispatch(hideAlert())}
      >
        <Toast.Header>
          <img src='holder.js/20x20?text=%20' className='rounded mr-2' alt='' />
          {/* <strong className='mr-auto'>Admin</strong> */}
          {error && <small>Error</small>}
        </Toast.Header>
        <Toast.Body>{error || message}</Toast.Body>
      </Toast>
    )
  );
};

export { Alert };
