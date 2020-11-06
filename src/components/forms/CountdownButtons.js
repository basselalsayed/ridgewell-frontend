import React from 'react';
import { Button } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import {
  startConfirmCountdown,
  startDeleteCountdown,
} from '../../store/actions';
import { dangerBtn, successBtn } from '../index.module.css';

const SuccessButton = ({ errors, title }) => {
  const dispatch = useDispatch();

  return (
    <Button
      onClick={() =>
        !errors.from && !errors.until && dispatch(startConfirmCountdown())
      }
      className={successBtn}
      children={title}
    />
  );
};

const NewDeleteRequest = ({ title }) => {
  const dispatch = useDispatch();

  const { isPlaying } = useSelector(state => state.countdownReducer);

  return (
    !isPlaying && (
      <Button
        onClick={() => dispatch(startDeleteCountdown())}
        className={dangerBtn}
        children={title}
      />
    )
  );
};

export { NewDeleteRequest, SuccessButton };
