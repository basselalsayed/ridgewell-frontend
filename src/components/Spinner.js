import React from 'react';
import { Spinner } from 'react-bootstrap';
const CenteredSpinner = () => (
  <Spinner
    style={{
      position: 'relative',
      left: '50%',
      top: '50%',
      marginLeft: '-1rem',
      marginTop: '-1rem',
    }}
    animation='border'
  />
);

export { CenteredSpinner };
