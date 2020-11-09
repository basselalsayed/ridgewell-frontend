import React from 'react';
import { Toast } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { hideAlert } from '../store/actions/response';

const Alert = () => {
  const dispatch = useDispatch();
  const { error, show, success } = useSelector(state => state.responseReducer);

  return (
    (success || error) && (
      <Toast
        style={{
          minWidth: '200px',
          position: 'absolute',
          top: 56,
          right: 0,
          borderColor: success ? 'green' : 'orange',
        }}
        show={show}
        onClose={() => dispatch(hideAlert())}
      >
        <Toast.Header>
          {/* <strong className='mr-auto'>Admin</strong> */}
          {<strong>{error ? 'Error' : 'Success'}</strong>}
        </Toast.Header>
        <Toast.Body>{error || success}</Toast.Body>
      </Toast>
    )
  );
};

export { Alert };
