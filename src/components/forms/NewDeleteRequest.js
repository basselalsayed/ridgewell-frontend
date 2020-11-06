import React from 'react';
import { Button } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { startDeleteCountdown } from '../../store/actions';
import { dangerBtn } from '../index.module.css';

const NewDeleteRequest = () => {
  const dispatch = useDispatch();

  const { isPlaying } = useSelector(state => state.countdownReducer);

  return (
    !isPlaying && (
      <Button
        onClick={() => dispatch(startDeleteCountdown())}
        className={dangerBtn}
      >
        Delete Holiday
      </Button>
    )
  );
};

export { NewDeleteRequest };
