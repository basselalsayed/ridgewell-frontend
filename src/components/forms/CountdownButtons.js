import React from 'react';
import { Button } from 'react-bootstrap';

import { useDispatch } from 'react-redux';
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
        errors
          ? !errors.from && !errors.until && dispatch(startConfirmCountdown())
          : dispatch(startConfirmCountdown())
      }
      className={successBtn}
      children={title}
    />
  );
};

const NegativeButton = ({ title }) => {
  const dispatch = useDispatch();

  return (
    <Button
      onClick={() => dispatch(startDeleteCountdown())}
      className={dangerBtn}
      children={title}
    />
  );
};

export { NegativeButton, SuccessButton };
