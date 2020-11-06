import React from 'react';
import { Button } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { startDeleteCountdown } from '../../store/actions';
import { dangerBtn } from '../index.module.css';
import { CountdownCancel } from './CountdownCancel';

const NewDeleteRequest = ({ holidayId }) => {
  const dispatch = useDispatch();

  const { isDelete, isPlaying } = useSelector(state => state.countdownReducer);

  return isPlaying && isDelete ? (
    <CountdownCancel holidayId={holidayId} />
  ) : !isPlaying ? (
    <Button
      onClick={async () => dispatch(startDeleteCountdown())}
      className={dangerBtn}
    >
      Delete Holiday
    </Button>
  ) : null;
};

export { NewDeleteRequest };
